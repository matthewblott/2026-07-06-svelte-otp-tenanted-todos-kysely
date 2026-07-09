-- +goose Up

insert into todos (
  name,
  description
)
values
(
  'First todo example',
  'This is the first todo example'
);

insert into todos (
  name,
  description
)
values
(
  'Second todo example',
  'This is the second todo example'
);

-- +goose Down

delete from todos;
