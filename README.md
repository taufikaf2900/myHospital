## APP ROUTES

| Method | Route                                                | Description                                                         |
|--------|------------------------------------------------------|---------------------------------------------------------------------|
| GET    | /                                                    | Menampilkan halaman home `Landing page`                             |
| GET    | /register                                            | Menampilkan form register                                           |
| POST   | /register                                            | Membuat user baru                                                   |
| GET    | /login                                               | Menampilkan form untuk login                                        |
| POST   | /login                                               | Melakukan login                                                     |
| GET    | /hospital/patient                                    | Menampilkan seluruh pasien setelah berhasil login                   |
| GET    | /hospital/statistic                                  | Menampilkan statistic rumah sakit                                   |
| GET    | /hospital/patient/add                                | Menampilkan form untuk menambahkan pasien baru                      |
| POST   | /hospital/patient/add                                | Menambahkan pasien baru                                             |
| GET    | /hospital/patient/:patientId                         | Menampilkan detail pasien berdasarkan id pasein                     |
| GET    | /hospital/patient/:patientId/delete                  | Menghapus pasien berdasarkan id pasient                             |
| GET    | /hospital/patient/:patientId/edit                    | Menampilkan form untuk mengedit data pasien berdasarkan id nya      |
| POST   | /hospital/patient/:patientId/edit                    | Mengupdate data pasien berdasarkan id pasien                        |
| POST   | /hospital/patient/:patientId/addDesease              | Menambah penyakit pasien                                            |
| GET    | /hospital/patient/:patientId/medical-record          | Menampilkan medical record pasien berdasarkan id nya                |
| GET    | /hospital/patient/:patientId/medical-record/add      | Mengubah medical record dari pasien berdasarkan id nya              |
| POST   | /hospital/patient/:patientId/medical-record/add      | Mengubah medical record dari pasien berdasarkan id nya              |
| GET    | /logout                                              | Melakukan logout dan akan di redirect ke halaman login              |