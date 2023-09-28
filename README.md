## APP ROUTES

| Method | Route                                                | Description                                                         |
|--------|------------------------------------------------------|---------------------------------------------------------------------|
| GET    | /                                                    | Menampilkan halaman home `Landing page`                             |
| GET    | /register                                            | Menampilkan form register                                           |
| POST   | /register                                            | Membuat user baru                                                   |
| GET    | /login                                               | Menampilkan form untuk login                                        |
| POST   | /login                                               | Melakukan login                                                     |
| GET    | /hospital/:userId/patient                            | Menampilkan seluruh pasien setelah berhasil login                   |
| GET    | /hospital/:userId/statistic                          | Menampilkan statistic rumah sakit                                   |
| GET    | /hospital/:userId/medical-record                     | Menampilkan seluruh medical record pasien                           |
| GET    | /hospital/:userId/patient/add                        | Menampilkan form untuk menambahkan pasien baru                      |
| POST   | /hospital/:userId/patient/add                        | Menambahkan pasien baru                                             |
| GET    | /hospital/:userId/patient/:patientId                 | Menampilkan detail pasien berdasarkan id pasein                     |
| GET    | /hospital/:userId/patient/:patientId/delete          | Menghapus pasien berdasarkan id pasient                             |
| GET    | /hospital/:userId/patient/:patientId/edit            | Menampilkan form untuk mengedit data pasien berdasarkan id nya      |
| POST   | /hospital/:userId/patient/:patientId/edit            | Mengupdate data pasien berdasarkan id pasien                        |
| GET    | /hospital/:userId/patient/:patientId/medical-record  | Mengubah medical record dari pasien berdasarkan id nya              |
| GET    | /logout                                              | Melakukan logout dan akan di redirect ke halaman login              |