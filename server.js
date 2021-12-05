const express=require('express');
var log = require('./app/utils/log');
var { server } = require('./app/utils/constants');

/* Routes */
const routeCourse = require('./app/routes/course.route');
const routeStudent = require('./app/routes/student.route');
const routeSession = require('./app/routes/session.route');
const routeLogin = require('./app/routes/login.route');

const app=express();

app.use(
	express.urlencoded({
	  extended: true
	})
);

app.use(express.json());

app.use('/api/courses', routeCourse);
app.use('/api/students', routeStudent);
app.use('/api/auth', routeLogin);
app.use('/api/sessions', routeSession);

const PORT = server.port || 3000;
app.listen(PORT, () => console.log(`server run at port ${PORT}`));
