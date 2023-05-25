# The Musician's Path
## Overview
App with courses for practicing the learning of instruments with actual songs.

## Problem definition
When learning anything, the most important thing is practice. As for being a musician, there are already many courses and platforms to learn the theory. But when it comes to reinforce that learning with practice, the courses often don't include real songs, and if they do, sometimes the user doesn't like the songs included. With The Musician's Path, you can pick a course with a list of songs you like, or create one of your preference.

Example: "The Beatles' begginers course"
"Course with songs from beginner to advance to practice with Beatles songs"
1. Norwegian Wood - Difficulty: 3/10
2. I want to hold your hand - Difficulty: 5/10
3. Hey Jude - Difficulty: 8/10

## Who is this application for?
This application is for musicians of any level that already have some theoretical fundaments, but want to level up their skills by practicing with real songs.

## MOSCOW
### Must have
- User can create an account and login
- User can enroll to existant course
- User can create/edit/delete songs
- User can create/edit/delete a course
- User can add/remove songs from their own course
### Should have
- User can add rating to course
- User can add/edit/delete comment to song
### Could have
- Ability to upload files besides plain text tab for a song
- Ability to add a YouTube link for a song
- Ability to download added files and open YouTube link
- Course owner can accept or reject other users' song request to course
### Will not have
- If file is a video, show a video player
- If file is a PDF, show preview
- If file is YouTube link, show it embedded instead of opening apart.

## Domain model diagram
```mermaid
erDiagram
    USER ||--o{ COURSE : "enrolls to"
    USER ||--o{ SONG : "creates"
    COURSE ||--|{ SONG : contains
    SONG ||--o{ COMMENT : "has"
    USER ||--o{ COMMENT : creates
    USER ||--o{ COURSE : creates
    COURSE ||--o{ RATING : has
    USER ||--o{ RATING : submits
```
## Entity relation diagram
```mermaid
erDiagram
    user ||--|{ course_user : "is"
    user {
        int id pk
        varchar firstname
        varchar lastname
        varchar email
        varchar password
    }
    course_user  }|--|| course : "belongs to"
    course_user {
        int id pk
        int user_id fk
        int course_id fk
        datetime enrollment_date
    }
    course ||--|{ course_song : contains
    user ||--|{ song : creates
    course {
        int id pk
        varchar name
        varchar description
        int added_by fk
    }
    user }|--|| user_course_song : is
    user_course_song }|--|| course_song : is
    user_course_song {
        int id pk
        int user_id fk
        int course_song_id fk
        datetime date_completed
    }
    course_song }|--|| song : is
    course_song {
        int id pk
        varchar course_id fk
        varchar song_id fk
        int order
        int added_by fk
        tinyint is_approved
    }
    song ||--|{ comment : "has"
    song {
        int id pk
        varchar name
        int artist_id fk
        int genre_id fk
        difficulty int
        int added_by fk
    }
    song }|--|| genre : "has"
    genre {
        int id pk
        varchar name
    }
    comment {
        int id pk
        int song_id fk
        int user_id fk
        varchar text
    }
    song }|--|| artist : "has"
    artist {
        int id pk
        varchar name
    }
    song }|--|| song_file : "has"
    song_file {
        int id pk
        int song_id fk
        int file_type_id fk
        varchar value
    }
    song_file }|--|| file_type : "has"
    file_type {
        int id pk
        varchar type
    }
    user ||--|{ comment : creates
    user ||--|{ course : creates
    course ||--|{ rating : has
    rating {
        int id pk
        int course_id fk
        int user_id fk
        int stars
    }
    user ||--|{ rating : submits
```
