require("dotenv").config();
const express = require("express");
const cors = require('cors');
const { Client } = require("@notionhq/client");

const app = express();

const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3500', 'http://localhost:300']
};

app.use(cors(corsOptions));

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

module.exports = { express, notion };

// Import routes and set up endpoints
const peopleRouter = require("./routes/people/index");
app.use("/people", peopleRouter);

const addPeopleRouter = require("./routes/people/addPeople");
app.use("/people/addName", addPeopleRouter);

const projectsRouter = require("./routes/projects/index");
app.use("/projects", projectsRouter);

const addProjectsRouter = require("./routes/projects/addProject");
app.use("/projects/add", addProjectsRouter);

const port = process.env.PORT || 3500;

app.listen(port, () => {
    console.log(`Server listening on ${port}`);
});

// async function getDatabase() {
//     const databaseId = process.env.NOTION_DATABASE_ID;
//     const response = await notion.databases.retrieve({ database_id: databaseId })
//     console.log(response, null, 2);
// }

// getDatabase();