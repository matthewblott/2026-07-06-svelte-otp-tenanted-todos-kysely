-- +goose Up
create table user (
  id            integer primary key,
  name          text not null,
  email         text not null unique,
  emailVerified text not null default 0,  -- SQLite stores booleans as integers
  image         text,
  createdAt     text not null,
  updatedAt     text not null
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
  createdAt             text not null,
  updatedAt             text not null
) strict;

-- Used by Better Auth for OTPs, magic links, email verification tokens, etc.
create table verification (
  id         text    primary key,
  identifier text    not null,
  value      text    not null,
  expiresAt  text    not null,
  createdAt  text,
  updatedAt  text
) strict;

-- +goose Down
drop table verification;
drop table account;
drop table session;
drop table user;
