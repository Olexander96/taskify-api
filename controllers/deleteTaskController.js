const { client } = require('../config');

const deleteTaskController = async (req, res) => {
  const taskId = req.body.taskId;
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('Taskify');
    const coll = database.collection('all_tasks');

    const filter = {
      task_id: taskId,
    };

    const result = await coll.deleteOne(filter);
    // additional check
    if (result.deletedCount === 1) {
      res.send(taskId);
    } else res.send(0);
  } catch (err) {
    console.error('Error update tasks:', err);
    res.status(500).json({ message: 'Failed to update tasks' });
  } finally {
    await client.close();
    console.log('Connection to DB was closed!');
  }
};

module.exports = { deleteTaskController };
