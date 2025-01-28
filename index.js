//modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
  tls: true,
  tlsAllowInvalidCertificates: false,
});

const app = express();
app.use(express.json());
app.use(cors());

let isConnected = false;

async function connectToDatabase() {
  try {
    await client.connect();
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Завершуємо процес при помилці підключення
  }
}

// Підключаємось до бази даних перед запуском сервера
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server was started on ${port} port`);
  });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Taskify server!' });
});

app.get('/get-tasks', async (req, res) => {
  try {
    if (!isConnected) {
      return res.status(500).json({ message: 'Database connection error' });
    }

    const database = client.db('Taskify');
    const coll = database.collection('all_tasks');
    const tasks = await coll.find().toArray();
    res.json(tasks);
  } catch (err) {
    console.error('Error during /get-tasks execution:', err);
    res.status(500).json({ message: 'Failed to get tasks' });
  }
});

const port = process.env.PORT || 5000;
