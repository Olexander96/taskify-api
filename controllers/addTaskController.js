const { client } = require('../config');

const addTaskController = async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('Taskify');
    const coll = database.collection('all_tasks');

    const newTask = {
      task_id: req.body.task_id,
      title: req.body.title,
      text: req.body.text,
      status: req.body.status,
      completed: req.body.completed,
      created_date: req.body.created_date,
    };

    const result = await coll.insertOne(newTask);
    // additional check
    if (result.acknowledged === true) {
      res.json(newTask);
    } else res.json({});
  } catch (err) {
    console.error('Error adding tasks:', err);
    res.status(500).json({ message: 'Failed to adding tasks' });
  } finally {
    await client.close();
    console.log('Connection to DB was closed!');
  }
};

module.exports = { addTaskController };
