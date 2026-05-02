const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Fake DB
let emergencies = [];
let idCounter = 1;

// Home
app.get('/', (req, res) => {
  res.send('🚨 Emergency API is running!');
});

// Health check (IMPORTANT)
app.get('/health', (req, res) => {
  res.json({ status: "OK", message: "API is live" });
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

// READ ALL
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

// START
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('🚀 Server running on port ' + PORT);
});
