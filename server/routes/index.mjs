import express from "express";
import loginRoute from "./auth/login.mjs";
import statusRoute from "./auth/status.mjs";
import peopleRoute from "./people/allPeople.mjs";
import addPersonRoute from "./people/addPerson.mjs";
import addProjectRoute from "./projects/addProject.mjs";
import filteredProjectsRoute from "./projects/getFilteredProjects.mjs";
import getAllProjectsRoute from "./projects/getAllProjects.mjs";
import showProjectsRoute from "./projects/activeProjects.mjs";
import getUserRoute from './people/getUser.mjs';
import addTimereportsRoute from "./timereports/addTimereport.mjs";
import getDatafromIdRoute from './people/getDataFromId.mjs';
import getWeeklyTimeReportsRoute from './timereports/getWeeklyTimeReports.mjs';
import getTimereportsRoute from "./timereports/getTimereports.mjs";
import showSingleProjectsRoute from "./projects/singleProject.mjs";
import logoutRoute from "./auth/logout.mjs";
import getTasksRoute from "./tasks/getTasks.mjs";

const app = express();

app.use(loginRoute);
app.use(statusRoute);
app.use(peopleRoute);
app.use(addPersonRoute);
app.use(addProjectRoute);
app.use(filteredProjectsRoute);
app.use(getAllProjectsRoute);
app.use(showProjectsRoute);
app.use(getUserRoute);
app.use(addTimereportsRoute);
app.use(getDatafromIdRoute);
app.use(getWeeklyTimeReportsRoute);
app.use(getTimereportsRoute);
app.use(showSingleProjectsRoute);
app.use(logoutRoute);
app.use(getTasksRoute);

export default app;
