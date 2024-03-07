const express = require("express");
const cors = require('cors');
const app = express();

app.use(cors());

module.exports = {
  express,
  app,
  startServer: (port = process.env.PORT || 3500) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  },
};
