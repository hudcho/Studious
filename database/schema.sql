create table users (
	id serial primary key,
	username TEXT unique not null,
	password_hash TEXT not null 
);

create table friends (
	user_id INT references users(id),
	friend_id INT references users(id),
	primary key (user_id, friend_id)
);

create table circles (
	id serial primary key,
	name TEXT unique not null,
	created_by TEXT references users(id)
);

create table circle_members (
	circle_id INT references circles(id),
	user_id INT references users(id),
	primary key (circle_id, user_id)
);

create table messages(
	id serial primary key,
	content TEXT not null,
	sender_id INT references users(id),
	recipient_id INT references users(id),
	circle_id INT references circles(id),
	sent_at TIMESTAMP default NOW(),
	check ( 
		(circle_id is not null and recipient_id is null) or
		(circle_id is null and recipient_id is not null)
	)
);

