-- +goose Up
create table user (
  id            integer primary key,
  name          text not null unique
    check (length(name) between 1 and 50),
  email         text not null unique,
  emailVerified text not null default 0,  -- SQLite stores booleans as integers
  image         text,
  isAnonymous  integer not null default 0,
  createdAt text not null default current_timestamp,
  updatedAt text not null default current_timestamp,
  check (
    length(email) between 6 and 254 and

    -- no spaces
    email not like '% %' and

    -- exactly one @
    (length(email) - length(replace(email, '@', ''))) = 1 and

    -- @ not first or last char
    instr(email, '@') > 1 and
    instr(email, '@') < length(email) and

    -- split parts exist (redundant but safe guard)
    length(substr(email, 1, instr(email, '@') - 1)) > 0 and
    length(substr(email, instr(email, '@') + 1)) > 0 and

    -- local part rules
    substr(email, 1, instr(email, '@') - 1) not like '.%' and
    substr(email, 1, instr(email, '@') - 1) not like '%.' and
    instr(substr(email, 1, instr(email, '@') - 1), '..') = 0 and

    -- domain must contain a dot
    instr(substr(email, instr(email, '@') + 1), '.') > 0 and

    -- domain rules
    substr(email, instr(email, '@') + 1) not like '.%' and
    substr(email, instr(email, '@') + 1) not like '%.' and
    instr(substr(email, instr(email, '@') + 1), '..') = 0 and

    -- allowed characters (local part)
    substr(email, 1, instr(email, '@') - 1) glob '[A-Za-z0-9._%+-]*' and

    -- allowed characters (domain part)
    substr(email, instr(email, '@') + 1) glob '[A-Za-z0-9.-]*' and

    -- domain hyphen rules
    substr(email, instr(email, '@') + 1, 1) != '-' and
    substr(email, instr(email, '@') + 1, length(substr(email, instr(email, '@') + 1))) not like '%-'
  )
) strict;

create table session (
  id          text primary key,
  expiresAt   text not null,
  token       text not null unique,
  createdAt   text not null,
  updatedAt   text not null,
  ipAddress   text,
  userAgent   text,
  userId      integer not null references user(id)
) strict;

create table account (
  id                    text primary key,
  accountId             text not null,
  providerId            text not null,
  userId                integer not null references user(id),
  accessToken           text,
  refreshToken          text,
  idToken               text,
  accessTokenExpiresAt  text,
  refreshTokenExpiresAt text,
  scope                 text,
  password              text,
  createdAt             text not null default current_timestamp,
  updatedAt             text not null default current_timestamp
) strict;

-- Used by Better Auth for OTPs, magic links, email verification tokens, etc.
create table verification (
  id         text    primary key,
  identifier text    not null,
  value      text    not null,
  expiresAt  text    not null,
  createdAt  text not null default current_timestamp,
  updatedAt  text not null default current_timestamp
) strict;

-- +goose Down
drop table verification;
drop table account;
drop table session;
drop table user;
