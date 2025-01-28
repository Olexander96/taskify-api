const indexController = async (req, res) => {
  try {
    res.status(200).json({ message: 'Hello from Taskify server!' });
  } catch (err) {
    console.error('Error connect to server:', err);
    res.status(500).json({ message: 'Failed to getting tasks' });
  } finally {
    console.log('Connection to server was closed!');
  }
};

module.exports = { indexController };
