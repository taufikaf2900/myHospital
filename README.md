## APP ROUTES

// GET / => menampilkan halaman home
// GET /register => menampilkan form register
// POST /register => membuat akun baru dan menyimpan datanya ke db
// GET /login => menampilkan halaman / form login
// POST /login => melakukan login (pengecekan data dan merubah statusLogin menjadi true) => kalau berhasil redirect ke GET /homepage/:userId
// GET /homepage/:userId/daily-medical-record => menampilkan daftar daily record semua pasien
// GET /homepage/:userId/patient/add => menampilkan form add new patient
// POST /homepage/:userId/patient/add => Create new patient
// GET /homepage/:userId/patient/:patientId => menampilkan detail patient
// GET /homepage/:userId/patient/:patientId/delete => menghapus patient kalau berhasil balik ke GET /homepage/:userId
// GET /homepage/:userId/patient/:patientId/edit => menampilkan form edit patient
// POST /homepage/:userId/patient/:patientId/edit => Update patient
// GET /homepage/:userId/patient/:patientId/daily-medical-record => menampilkan daily medical record dari patient tertentu
// GET /homepage/:userId/statistic => menampilkan statistic rumah sakit
// GET /homepage/:userId/logout => melakukan logout (merubah statusLogin menjadi false) lalu redirect ke GET /login