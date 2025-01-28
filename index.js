//modules
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

dotenv.config();
//uri
const MONGO_URI = process.env.MONGO_URI;

const client = new MongoClient(MONGO_URI);

const app = express();
//Request format to json
app.use(express.json());
//All CORS
app.use(cors());

// Routes// Підключення до MongoDB поза роутами
let isConnected = false;

(async () => {
  try {
    await client.connect({
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: true,
      // Додайте ці параметри для вирішення проблеми з TLS
      tls: true,
      tlsAllowInvalidCertificates: false,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
})();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello from Taskify server!' });
});

app.get('/get-tasks', async (req, res) => {
  try {
    if (!isConnected) {
      console.error('Database connection is not initialized.');
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

// Інші маршрути залишаються незмінними

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server was started on ${port} port`));
