import express from "express";
import loginRoute from "./auth/login.mjs";
import statusRoute from "./auth/status.mjs";
import peopleRoute from "./people/allPeople.mjs";
import addPersonRoute from "./people/addPerson.mjs";
import addProjectRoute from "./projects/addProject.mjs";
import projectsRoute from "./projects/allProjects.mjs";
import showProjectsRoute from "./projects/activeProjects.mjs";

const app = express();

app.use(loginRoute);
app.use(statusRoute);
app.use(peopleRoute);
app.use(addPersonRoute);
app.use(addProjectRoute);
app.use(projectsRoute);
app.use(showProjectsRoute);

export default app;
