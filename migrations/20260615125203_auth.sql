-- +goose Up
create table user (
  id            text not null primary key,
  name          text not null,
  email         text not null unique,
  emailVerified integer not null default 0,  -- SQLite stores booleans as integers
  image         text,
  createdAt     integer not null,             -- Unix timestamp (ms)
  updatedAt     integer not null
);

create table session (
  id          text    not null primary key,
  expiresAt   integer not null,
  token       text    not null unique,
  createdAt   integer not null,
  updatedAt   integer not null,
  ipAddress   text,
  userAgent   text,
  userId      text    not null references user(id)
);

create table account (
  id                    text not null primary key,
  accountId             text not null,
  providerId            text not null,
  userId                text not null references user(id),
  accessToken           text,
  refreshToken          text,
  idToken               text,
  accessTokenExpiresAt  integer,
  refreshTokenExpiresAt integer,
  scope                 text,
  password              text,
  createdAt             integer not null,
  updatedAt             integer not null
);

-- Used by Better Auth for OTPs, magic links, email verification tokens, etc.
create table verification (
  id         text    not null primary key,
  identifier text    not null,
  value      text    not null,
  expiresAt  integer not null,
  createdAt  integer,
  updatedAt  integer
);

-- +goose Down
drop table verification;
drop table account;
drop table session;
drop table user;
