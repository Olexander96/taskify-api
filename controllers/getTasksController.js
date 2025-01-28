const { client } = require('../config');

const getTasksController = async (req, res) => {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    database = client.db('Taskify');
    const coll = database.collection('all_tasks');

    const tasks = await coll.find().toArray();
    res.json(tasks);
  } catch (err) {
    console.error('Error getting tasks:', err);
    res.status(500).json({ message: 'Failed to getting tasks' });
  } finally {
    await client.close();
    console.log('Connection to DB was closed!');
  }
};

module.exports = { getTasksController };
