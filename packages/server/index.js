const express = require('express');

const app = express();

app.use('/admin', (req, res) => {
  console.log('App');
  return res.send(200);
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
