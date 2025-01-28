//modules
const express = require('express');
const cors = require('cors');

//controllers
const { indexController } = require('./controllers/indexController');
const { getTasksController } = require('./controllers/getTasksController');
const { addTaskController } = require('./controllers/addTaskController');
const { updateTaskController } = require('./controllers/updateTaskController');
const { deleteTaskController } = require('./controllers/deleteTaskController');

const app = express();
//Request format to json
app.use(express.json());
//All CORS
app.use(cors());

// Routes
app.get('/', indexController); //for root
app.get('/get-tasks', getTasksController);
app.post('/add-task', addTaskController);
app.patch('/update-task', updateTaskController);
app.delete('/delete-task', deleteTaskController);

app.listen(5000, () => console.log('Server was started on 5000 port'));
