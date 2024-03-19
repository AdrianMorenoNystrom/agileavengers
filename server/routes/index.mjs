import express from "express";
import loginRoute from "./auth/login.mjs";
import statusRoute from "./auth/status.mjs";
import peopleRoute from "./people/allPeople.mjs";
import addPersonRoute from "./people/addPerson.mjs";
import addProjectRoute from "./projects/addProject.mjs";
import projectsRoute from "./projects/allProjects.mjs";
import showProjectsRoute from "./projects/activeProjects.mjs";
import getUser from "./people/getUser.mjs";
import addTimereportsRoute from "./timereports/addTimereport.mjs";
import getTimereportsRoute from "./timereports/getTimereports.mjs";
import showSingleProjectsRoute from "./projects/singleProject.mjs";
import logoutRoute from "./auth/logout.mjs";

const app = express();

app.use(loginRoute);
app.use(statusRoute);
app.use(peopleRoute);
app.use(addPersonRoute);
app.use(addProjectRoute);
app.use(projectsRoute);
app.use(showProjectsRoute);
app.use(getUser);
app.use(addTimereportsRoute);
app.use(getTimereportsRoute);
app.use(showSingleProjectsRoute);
app.use(logoutRoute);

export default app;
