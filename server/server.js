require("dotenv").config();
const express = require("express");
const app = express();
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

module.exports = { express, notion };

// Import routes and set up endpoints
const peopleRouter = require("./routes/people/index");
app.use("/people", peopleRouter);

const projectsRouter = require("./routes/projects/index");
app.use("/projects", projectsRouter);

const addProjectsRouter = require("./routes/projects/addProject");
app.use("/projects/add", addProjectsRouter);

const port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
