// public/script.js
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
    } else {
        alert(data.message);
    }
});

document.getElementById('attraction-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const name = document.getElementById('attraction-name').value;
    const location = document.getElementById('attraction-location').value;
    const description = document.getElementById('attraction-description').value;
    const category = document.getElementById('attraction-category').value;
    const openingHours = document.getElementById('attraction-opening-hours').value;
    const admissionFee = document.getElementById('attraction-admission-fee').value;
    const contactDetails = document.getElementById('attraction-contact-details').value;

    const response = await fetch('/api/attractions/add', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, location, description, category, openingHours, admissionFee, contactDetails })
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = document.getElementById('search-location').value;
    const category = document.getElementById('search-category').value;
    const keyword = document.getElementById('search-keyword').value;

    const query = new URLSearchParams({ location, category, keyword }).toString();
    const response = await fetch(`/api/attractions/search?${query}`);
    const attractions = await response.json();

    const resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';
    attractions.forEach(attraction => {
        const div = document.createElement('div');
        div.innerHTML = `
            <h3>${attraction.name}</h3>
            <p>${attraction.description}</p>
            <p><strong>Location:</strong> ${attraction.location}</p>
            <p><strong>Category:</strong> ${attraction.category}</p>
            <p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>
            <p><strong>Admission Fee:</strong> ${attraction.admissionFee}</p>
            <p><strong>Contact Details:</strong> ${attraction.contactDetails}</p>
        `;
        resultsDiv.appendChild(div);
    });
});
