const express = require("express");
const app = express();

module.exports = {
  express,
  app,
  startServer: (port = process.env.PORT || 3500) => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    });
  },
};
