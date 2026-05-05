const API = '/emergency';

function sendEmergency() {
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'User', message: 'Emergency triggered' }),
  })
    .then((res) => res.json())
    .then(() => loadEmergencies())
    .catch(() => alert('Failed to send emergency'));
}

function loadEmergencies() {
  fetch(API)
    .then((res) => res.json())
    .then((data) => {
      const list = document.getElementById('list');
      const sub = document.getElementById('sub');

      sub.textContent = data.length
        ? data.length + ' active report' + (data.length !== 1 ? 's' : '')
        : 'No active reports';

      if (!data.length) {
        list.innerHTML =
          '<div class="empty">All clear — no active emergencies</div>';
        return;
      }

      list.innerHTML = data
        .map(
          (item) => `
        <div class="card">
          <div class="card-dot"></div>
          <div class="card-body">
            <div class="card-id">#${String(item.id).padStart(4, '0')}</div>
           <div class="card-name">${item.name || 'Unknown'}</div>
           <div class="card-msg">${item.message || 'No message'}</div>
          </div>
          <button class="del-btn" onclick="deleteEmergency(${
            item.id
          })">Dismiss</button>
        </div>
      `
        )
        .join('');
    })
    .catch((err) => console.log('Error loading:', err));
}

function deleteEmergency(id) {
  fetch(`${API}/${id}`, { method: 'DELETE' })
    .then(() => loadEmergencies())
    .catch((err) => console.log('Delete error:', err));
}

loadEmergencies();
setInterval(loadEmergencies, 5000);
