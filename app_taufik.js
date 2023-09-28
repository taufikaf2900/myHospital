const express = require('express');
const routes = require('./routes/index_taufik');
const HospitalController = require('./controllers/hospital_taufik');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, sameSite: true }
}))
app.use(routes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
  HospitalController.automaticGenerateStatistic();
});