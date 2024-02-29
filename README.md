# Lab Project MySecret

Project created during the Full-Stack Journey from 1° Semana DDEV

## Requirements
### API Features
- [X] The user should create an account with email and password.
- [ ] The user should update their profile, only their name and picture.
- [ ] The user should authenticate in the account.
- [X] The user should create a question.
- [X] The user should list questions created.
- [ ] The user should remove create a question.
- [ ] The user should answer a question anonymously.
- [ ] Optionally, the user can answer a question with your information.
- [ ] The user should list answers created for a question.

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