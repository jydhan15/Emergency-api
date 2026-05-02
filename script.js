const API = 'https://emergency-api-wgx7.onrender.com/emergency';

// SEND EMERGENCY
function sendEmergency() {
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'User',
      message: 'Emergency triggered',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('Emergency sent! ID: ' + data.id);
      loadEmergencies();
    })
    .catch((err) => {
      console.log('Error sending:', err);
      alert('Failed to send emergency');
    });
}

// LOAD ALL EMERGENCIES
function loadEmergencies() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('list');

      list.innerHTML = data
        .map(
          (item) => `
        <div class="card">
          <b>ID:</b> ${item.id}<br>
          <b>Name:</b> ${item.name}<br>
          <b>Message:</b> ${item.message}<br><br>

          <button onclick="deleteEmergency(${item.id})">
            ❌ Delete
          </button>
        </div>
      `
        )
        .join('');
    })
    .catch((err) => {
      console.log('Error loading:', err);
    });
}

// DELETE EMERGENCY (THIS WAS MISSING / IMPORTANT)
function deleteEmergency(id) {
  fetch(`${API}/${id}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => {
      alert('Deleted successfully');
      loadEmergencies();
    })
    .catch((err) => {
      console.log('Delete error:', err);
      alert('Failed to delete');
    });
}

// AUTO LOAD
loadEmergencies();

// AUTO REFRESH EVERY 5 SECONDS
setInterval(loadEmergencies, 5000);
