import express from "express";
import loginRoute from "./auth/login.mjs";
import statusRoute from "./auth/status.mjs";
import peopleRoute from "./people/allPeople.mjs";
import addPersonRoute from "./people/addPerson.mjs";
import addProjectRoute from "./projects/addProject.mjs";

import changeTimeRoute from './projects/changeTime.mjs';
import changeDateRoute from './projects/changeDate.mjs';
import changeStatusRoute from './projects/changeStatus.mjs';

import projectsRoute from "./projects/allProjects.mjs";
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
import GetUserSpecificProjects from "./projects/getprojectsforTimereport.mjs";


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
app.use(changeTimeRoute);
app.use(changeDateRoute);
app.use(changeStatusRoute);
app.use(logoutRoute);
app.use(getTasksRoute);
app.use(GetUserSpecificProjects);

export default app;
