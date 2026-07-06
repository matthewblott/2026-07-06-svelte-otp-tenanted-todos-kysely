import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { auth } from '$lib/server/auth';

export const actions: Actions = {
  sendOtp: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');

    if (!email || typeof email !== 'string' || !email.trim()) {
      return fail(400, { error: 'Email is required', email: email ? email : '', step: 'email' });
    }

    const trimmedEmail = email.trim();

    try {
      await auth.api.sendVerificationOTP({
        body: {
          email: trimmedEmail,
          type: 'sign-in',
        },
        headers: event.request.headers,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to send code.';
      return fail(400, { error: message, email: trimmedEmail, step: 'email' });
    }

    return { step: 'otp', email: trimmedEmail };
  },

  verifyOtp: async (event) => {
    const formData = await event.request.formData();
    const email = formData.get('email');
    const otp = String(formData.get('otp'));

    if (!email || typeof email !== 'string' || !email.trim()) {
      return fail(400, { error: 'Email is required', email: email ? email : '', otp: otp ? otp.toString() : '', step: 'otp' });
    }

    if (!otp) {
      return fail(400, { error: 'Code is required', email: email as string, otp: '', step: 'otp' });
    }
    const otpStr = typeof otp === 'string' ? otp.toString() : String(otp);
    if (!otpStr.trim()) {
      return fail(400, { error: 'Code is required', email: email as string, otp: otpStr, step: 'otp' });
    }

    try {
      await auth.api.signInEmailOTP({
        body: {
          email: email.trim(),
          otp: otp.trim(),
        },
        headers: event.request.headers,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid or expired code.';
      return fail(400, { error: message, email: email as string, otp: otp.toString(), step: 'otp' });
    }

    redirect(303, '/');
  },
};
