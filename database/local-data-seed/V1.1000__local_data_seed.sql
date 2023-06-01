insert into file_type(type) values ('Plain text tab'), ('YouTube link'), ('File key');

insert into genre(name) values ('Rock'), ('Pop'), ('Hip Hop'), ('Jazz'), ('R&B');

insert into artist(name) values ('The Beatles'), ('Taylor Swift'), ('Kendrick Lamar'), ('Miles Davis'), ('Frank Ocean');

insert into "user"(first_name, last_name, email, password) values ('John', 'Doe', 'johndoe@email.com', 'password');

insert into song(name, artist_id, genre_id, difficulty, added_by)
values ('I Want To Hold Your Hand', 1, 1, 3, 1),
('Penny Lane', 1, 1, 5, 1),
('Strawberry Fields Forever', 1, 1, 7, 1),
('I Knew You Were Trouble', 2, 2, 4, 1),
('Pink + White', 5, 5, 5, 1);

insert into song_file(song_id, file_type_id, value)
values (1, 1, 'C D G B'),
(2, 1, 'Am G D'),
(3, 1, 'C#m G E B'),
(4, 1, 'Bm A'),
(5, 1, 'Fm Bm A C');

insert into course(name, description, added_by)
values ('The Beatles: Begginers Course', 'Only easy songs to play by The Beatles', 1),
('80s Classics', '80s songs from beginner to advanced', 1);

insert into course_song(course_id, song_id, "order", added_by)
values (1, 1, 1, 1), (1, 2, 2, 1), (1, 3, 3, 1);
