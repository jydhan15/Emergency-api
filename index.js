const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 SERVE FRONTEND FILES
app.use(express.static(path.join(__dirname, 'frontend')));

// fake database
let emergencies = [];
let id = 1;

// 🔥 SHOW FRONTEND INSTEAD OF TEXT
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// CREATE
app.post('/emergency', (req, res) => {
  const { name, message } = req.body;

  // ✅ Validate input
  if (!name || !message) {
    return res.status(400).json({ error: 'name and message are required' });
  }

  const data = { id: id++, name, message };
  emergencies.push(data);
  res.json(data);
});

// READ
app.get('/emergency', (req, res) => {
  res.json(emergencies);
});

// UPDATE
app.put('/emergency/:id', (req, res) => {
  const target = Number(req.params.id);

  emergencies = emergencies.map((e) =>
    e.id === target ? { ...e, ...req.body } : e
  );

  res.json({ message: 'updated' });
});

// DELETE
app.delete('/emergency/:id', (req, res) => {
  const target = Number(req.params.id);

  emergencies = emergencies.filter((e) => e.id !== target);

  res.json({ message: 'deleted' });
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
