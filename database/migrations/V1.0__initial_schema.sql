CREATE TABLE public.genre (
	id serial NOT NULL,
	"name" varchar NOT NULL
    CONSTRAINT genre_pk PRIMARY KEY (id)
);

CREATE TABLE public.artist (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT artist_pk PRIMARY KEY (id)
);

CREATE TABLE public.file_type (
	id serial NOT NULL,
	"type" varchar NOT NULL,
	CONSTRAINT file_type_pk PRIMARY KEY (id)
);

CREATE TABLE public."user" (
	id serial NOT NULL,
	first_name varchar NOT NULL,
	last_name varchar NOT NULL,
	email varchar UNIQUE NOT NULL,
	"password" varchar NOT NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
);

CREATE TABLE public.course (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	description varchar NULL,
	added_by int NOT NULL,
	CONSTRAINT course_pk PRIMARY KEY (id),
	CONSTRAINT course_added_by_user_id_fk FOREIGN KEY (added_by) REFERENCES public."user"(id)
);

CREATE TABLE public.song (
	id serial NOT NULL,
	"name" varchar NOT NULL,
	artist_id integer NOT NULL,
	genre_id integer NOT NULL,
	difficulty integer NOT NULL,
	added_by integer NOT NULL,
	CONSTRAINT song_pk PRIMARY KEY (id),
	CONSTRAINT song_artist_id_artist_id_fk FOREIGN KEY (artist_id) REFERENCES public.artist(id),
	CONSTRAINT song_genre_id_genre_id_fk FOREIGN KEY (genre_id) REFERENCES public.genre(id),
	CONSTRAINT song_added_by_user_id_fk FOREIGN KEY (added_by) REFERENCES public."user"(id)
);

CREATE TABLE public."comment" (
	id serial NOT NULL,
	song_id integer NOT NULL,
	added_by integer NOT NULL,
	"text" varchar NOT NULL,
	CONSTRAINT comment_pk PRIMARY KEY (id),
	CONSTRAINT comment_song_id_song_id_fk FOREIGN KEY (song_id) REFERENCES public.song(id),
	CONSTRAINT comment_added_by_user_id_fk FOREIGN KEY (added_by) REFERENCES public."user"(id)
);

CREATE TABLE public.rating (
	id serial NOT NULL,
	course_id integer NOT NULL,
	added_by integer NOT NULL,
	stars float4 NOT NULL,
	"text" varchar NULL,
	CONSTRAINT rating_pk PRIMARY KEY (id),
	CONSTRAINT rating_course_id_course_id_fk FOREIGN KEY (course_id) REFERENCES public.course(id),
	CONSTRAINT rating_added_by_user_id_fk FOREIGN KEY (added_by) REFERENCES public."user"(id)
);

CREATE TABLE public.course_user (
	id serial NOT NULL,
	course_id integer NOT NULL,
	user_id integer NOT NULL,
	enrollment_date date NOT NULL,
	CONSTRAINT course_user_pk PRIMARY KEY (id),
	CONSTRAINT course_user_course_id_course_id_fk FOREIGN KEY (course_id) REFERENCES public.course(id),
	CONSTRAINT course_user_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
    UNIQUE (course_id, user_id)
);

CREATE TABLE public.course_song (
	id serial NOT NULL,
	course_id integer NOT NULL,
	song_id integer NOT NULL,
	"order" integer NOT NULL,
	added_by integer NOT NULL,
	is_approved boolean NOT NULL DEFAULT true,
	CONSTRAINT course_song_pk PRIMARY KEY (id),
	CONSTRAINT course_song_course_id_course_id_fk FOREIGN KEY (course_id) REFERENCES public.course(id),
	CONSTRAINT course_song_song_id_song_id_fk FOREIGN KEY (song_id) REFERENCES public.song(id),
	CONSTRAINT course_song_added_by_user_id_fk FOREIGN KEY (added_by) REFERENCES public."user"(id),
    UNIQUE (course_id, song_id)
);

CREATE TABLE public.song_file (
	id serial NOT NULL,
	song_id integer NOT NULL,
	file_type_id integer NOT NULL,
	value text NOT NULL,
	CONSTRAINT song_file_pk PRIMARY KEY (id),
	CONSTRAINT song_file_song_id_song_id_fk FOREIGN KEY (song_id) REFERENCES public.song(id),
	CONSTRAINT song_file_file_type_id_file_type_id_fk FOREIGN KEY (file_type_id) REFERENCES public.file_type(id)
);

CREATE TABLE public.user_course_song (
	id serial NOT NULL,
	user_id integer NOT NULL,
	course_song_id integer NOT NULL,
	datetime_completed timestamp NOT NULL,
	CONSTRAINT user_course_song_pk PRIMARY KEY (id),
	CONSTRAINT user_course_song_user_id_user_id_fk FOREIGN KEY (user_id) REFERENCES public."user"(id),
	CONSTRAINT user_course_song_course_song_id_course_song_id_fk FOREIGN KEY (course_song_id) REFERENCES public.course_song(id),
    UNIQUE (user_id, course_song_id)
);
