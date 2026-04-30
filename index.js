const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Fake database
let emergencies = [];
let idCounter = 1;

// Home route
app.get('/', (req, res) => {
  res.send('🚨 Emergency API is running!');
});

// CREATE
app.post('/emergency', (req, res) => {
  const data = {
    id: idCounter++,
    ...req.body,
  };

  emergencies.push(data);

  res.json({
    message: 'Emergency created',
    data,
  });
});

// GET ALL
app.get('/emergency', (req, res) => {
  res.json(emergencies);
});

// UPDATE
app.put('/emergency/:id', (req, res) => {
  const id = Number(req.params.id);
  let found = false;

  emergencies = emergencies.map((e) => {
    if (e.id === id) {
      found = true;
      return { ...e, ...req.body };
    }
    return e;
  });

  if (!found) {
    return res.status(404).json({ message: 'Emergency not found' });
  }

  res.json({ message: 'Updated successfully' });
});

// DELETE
app.delete('/emergency/:id', (req, res) => {
  const id = Number(req.params.id);

  const before = emergencies.length;
  emergencies = emergencies.filter((e) => e.id !== id);

  if (emergencies.length === before) {
    return res.status(404).json({ message: 'Emergency not found' });
  }

  res.json({ message: 'Deleted successfully' });
});

// START SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 Server running on port ' + PORT);
});
