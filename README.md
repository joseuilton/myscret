# Lab Project MySecret

Project created during the Full-Stack Journey from 1° Semana DDEV

## Requirements
### API Features
- [X] The user should create an account with email, password, username and avatar image.
    - [X] The user not should create an account with invalid email
    - [X] The user email should be unique
    - [X] The username should be unique
    - [X] The user password should be encrypted using SHA1
- [X] The user should authenticate in the account.
- [X] The user should list answers for your questions.
- [ ] The user should list your answers for user's questions
- [X] The user should create a question.
- [X] The user should list questions created.
- [X] The user should remove create a question.
- [X] The user should answer a question anonymously.
- [X] Optionally, the user can answer a question with your information.
- [X] The user should list answers created for a question.

### Business Rules


### Database
- A User can be author of multiple Questions
- A User can be author of multiple Answers
- A Question has a single User as its author.
- A Question can have multiple answers.
- An Answer has a single User as its author.
- An Answer belongs to a single Question.

Entities
```text
Users
- userId [uuid, PK]
- name [varchar(255), not null]
- email [varchar(255), not null]
- createdAt [timestamp, default now()]
- updatedAt [timestamp, null]

Questions
- questionId [uuid, PK]
- userId [uuid, FK]
- question [varchar(255), not null]
- createdAt [timestamp, default now()]
- updatedAt [timestamp, null]

Answers
- answerId [uuid, PK]
- questionId [uuid, FK]
- userId [uuid, FK, null]
- answer [varchar(255), not null]
- createdAt [timestamp, default now()]
- updatedAt [timestamp, null]
```

Entity relationships:
```text
User (ID, ...)
|--< Questions (UserID [FK], ...)
    |--< Answers (UserID [FK], QuestionID [FK], ...)
```