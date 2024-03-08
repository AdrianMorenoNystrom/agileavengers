const { app, startServer } = require("./express");

// Import routes and set up endpoints
const loginRouter = require("./routes/login/index");
app.use("/login", loginRouter);

const peopleRouter = require("./routes/people/index");
app.use("/people", peopleRouter);

const projectsRouter = require("./routes/projects/index");
app.use("/projects", projectsRouter);

const addPeopleRouter = require('./routes/people/addPeople');
app.use('/people/add', addPeopleRouter);

const addProjectsRouter = require("./routes/projects/addProject");
app.use("/projects/add", addProjectsRouter);

startServer();
