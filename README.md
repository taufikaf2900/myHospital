# MY HOSPITAL APP

### APP OVERVIEW
This is simple web application that can be used for manage patient's data such as create, update, read, delete, etc. This application implements register, login, and role system to differentiate each user's access to application features

### HOW TO RUN THE APP
1. npm install
2. npx sequelize db:create
3. npx sequelize db:migrate
4. npx sequelize db:seed:all
5. node --watch app.js
6. Enjoy the app


### APP ROUTES

| Method | Route                                           | Description                                                              |
|--------|-------------------------------------------------|--------------------------------------------------------------------------|
| GET    | /                                               | Display `home page` or `Landing page`                                    |
| GET    | /register                                       | Display `register page`                                                  |
| POST   | /register                                       | Create new user                                                          |
| GET    | /login                                          | Display `login page`                                                     |
| POST   | /login                                          | Do Login                                                                 |
| GET    | /hospital/patient                               | Display all patient                                                      |
| GET    | /hospital/statistic                             | Display hospital statistic                                               |
| GET    | /hospital/patient/add                           | Display page for create or add new patient                               |
| POST   | /hospital/patient/add                           | Create or add new patient                                                |
| GET    | /hospital/patient/:patientId                    | Dispay details of a particular patient                                   |
| GET    | /hospital/patient/:patientId/delete             | Delete particular patient                                                |
| GET    | /hospital/patient/:patientId/edit               | Display page for editing particular patient                              |
| POST   | /hospital/patient/:patientId/edit               | Update particular patient                                                |
| POST   | /hospital/patient/:patientId/addDesease         | Adding new desease to particular patient                                 |
| GET    | /hospital/patient/:patientId/medicalRecord      | Display medical records of particular patient                            |
| GET    | /hospital/patient/:patientId/medicalRecord/add  | Display page for create or add new medical record or particular patient  |
| POST   | /hospital/patient/:patientId/medicalRecord/add  | Create or add new medical record for particular patien                   |
| GET    | /logout                                         | Do Logout                                                                |