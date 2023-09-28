const express = require('express');
const routes = require('./routes/index_taufik');
const { automaticGenerateStatistic } = require('./middlewares/generateStatistic');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(automaticGenerateStatistic); // generate automatic statistic
app.use(routes);

app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});