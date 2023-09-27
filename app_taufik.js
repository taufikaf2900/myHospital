const express = require('express');
const routes = require('./routes/index_taufik');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});