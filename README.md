## APP ROUTES

| Method | Route                                                | Description                                                         |
|--------|------------------------------------------------------|---------------------------------------------------------------------|
| GET    | /                                                    | Menampilkan halaman home `Landing page`                             |
| GET    | /register                                            | Menampilkan form register                                           |
| POST   | /register                                            | Membuat user baru                                                   |
| GET    | /login                                               | Menampilkan form untuk login                                        |
| POST   | /login                                               | Melakukan login                                                     |
| GET    | /homepage/:userId/patient                            | Menampilkan seluruh pasien setelah berhasil login                   |
| GET    | /homepage/:userId/statistic                          | Menampilkan statistic rumah sakit                                   |
| GET    | /homepage/:userId/medical-record                     | Menampilkan seluruh medical record pasien                           |
| GET    | /homepage/:userId/patient/add                        | Menampilkan form untuk menambahkan pasien baru                      |
| POST   | /homepage/:userId/patient/add                        | Menambahkan pasien baru                                             |
| GET    | /homepage/:userId/patient/:patientId                 | Menampilkan detail pasien berdasarkan id pasein                     |
| GET    | /homepage/:userId/patient/:patientId/delete          | Menghapus pasien berdasarkan id pasient                             |
| GET    | /homepage/:userId/patient/:patientId/edit            | Menampilkan form untuk mengedit data pasien berdasarkan id nya      |
| POST   | /homepage/:userId/patient/:patientId/edit            | Mengupdate data pasien berdasarkan id pasien                        |
| GET    | /homepage/:userId/patient/:patientId/medical-record  | Mengubah medical record dari pasien berdasarkan id nya              |
| GET    | /logout                                              | Melakukan logout dan akan di redirect ke halaman login              |