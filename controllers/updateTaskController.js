const { client } = require('../config');

const updateTaskController = async (req, res) => {
  const taskStatusUpdateObj = {
    taskId: req.body.taskId,
    taskStatus: req.body.status,
  };

  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('Taskify');
    const coll = database.collection('all_tasks');

    const filter = {
      task_id: taskStatusUpdateObj.taskId,
    };
    const updateDoc = {
      $set: { status: taskStatusUpdateObj.taskStatus },
    };
    const result = await coll.updateOne(filter, updateDoc);

    // additional check
    if (result.modifiedCount === 1) {
      res.json(taskStatusUpdateObj);
    } else res.json({});
  } catch (err) {
    console.error('Error update tasks:', err);
    res.status(500).json({ message: 'Failed to update tasks' });
  } finally {
    await client.close();
    console.log('Connection to DB was closed!');
  }
};

module.exports = { updateTaskController };
