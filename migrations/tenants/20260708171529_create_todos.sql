-- +goose Up

create table todos (
  id integer primary key autoincrement,
  name text not null,
  description text,
  completed integer not null default 0,
  created_at text not null default current_timestamp,
  updated_at text not null default current_timestamp
) strict;

-- +goose Down

drop table todos;
