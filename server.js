const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

let alerts = [];

app.get('/alerts', (req, res) => {
    res.json(alerts);
});

app.post('/alerts', (req, res) => {
    const newAlert = {
        id: alerts.length + 1,
        type: req.body.type,
        location: req.body.location,
        status: "Pending"
    };
    alerts.push(newAlert);
    res.status(201).json(newAlert);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));