# MY HOSPITAL APP

### APP OVERVIEW

### HOW TO RUN THE APP

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