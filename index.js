// Validate Age (18-55 years old)
const validateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birth month/day hasn't occurred yet this year
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 18 && age <= 55;
};

// Validate Email
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Load saved entries from localStorage and display in the table
const loadEntries = () => {
    const entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.forEach(entry => {
        addEntryToTable(entry);
    });
};

// Add entry to the table
const addEntryToTable = (entry) => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${entry.name}</td><td>${entry.email}</td><td>${entry.password}</td><td>${entry.dob}</td><td>${entry.acceptedTerms}</td>`;
    document.getElementById('entriesTable').appendChild(row);
};

// Save new entry to localStorage and append it to existing entries
const saveEntry = (entry) => {
    let entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push(entry);
    localStorage.setItem('entries', JSON.stringify(entries));
};

// Handle form submission
document.getElementById('registrationForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('terms').checked;

    // Validate the date of birth
    if (!validateAge(dob)) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    // Validate the email format
    if (!validateEmail(email)) {
        alert('Invalid email address.');
        return;
    }

    const entry = { name, email, password, dob, acceptedTerms: acceptedTerms ? 'true' : 'false' };
    
    // Save the new entry to localStorage
    saveEntry(entry);
    
    // Add the new entry to the table
    addEntryToTable(entry);

    // Reset the form for the next submission
    this.reset();
});

// Load saved entries on page load
window.onload = loadEntries;


// Clear all entries on page load
window.onload = clearEntriesOnRefresh;
