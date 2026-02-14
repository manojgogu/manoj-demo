// Navigation Logic
function navigateTo(sectionId) {
    // Hide all sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active-section');
        section.classList.add('hidden-section');
    });

    // Show target section
    const target = document.getElementById(sectionId);
    if (target) {
        target.classList.remove('hidden-section');
        target.classList.add('active-section');
    }

    // Update Nav Links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-target') === sectionId) {
            link.classList.add('active');
        }
    });
}

// Event Listeners for Navigation
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-target');
        navigateTo(target);
    });
});

// Complaint Submission Logic
const complaintForm = document.getElementById('complaintForm');

if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Gather Data
        const complaint = {
            id: 'CMP-' + Math.floor(100000 + Math.random() * 900000), // Random 6 digit ID
            name: document.getElementById('complainantName').value || 'Anonymous',
            contact: document.getElementById('contactNumber').value,
            type: document.getElementById('incidentType').value,
            date: document.getElementById('incidentDate').value,
            location: document.getElementById('incidentLocation').value,
            description: document.getElementById('incidentDescription').value,
            status: 'Submitted', // Default status
            timestamp: new Date().toISOString()
        };

        // Save to LocalStorage
        const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
        complaints.push(complaint);
        localStorage.setItem('complaints', JSON.stringify(complaints));

        // Show Success Message
        alert(`Complaint Filed Successfully!\nYour Complaint ID is: ${complaint.id}\nPlease save this ID for tracking.`);

        // Reset Form and Go to Home
        complaintForm.reset();
        navigateTo('home');
    });
}

// Status Tracking Logic
function trackComplaint() {
    const trackingId = document.getElementById('trackingId').value.trim();
    const resultDiv = document.getElementById('statusResult');

    if (!trackingId) {
        alert('Please enter a Complaint ID');
        return;
    }

    const complaints = JSON.parse(localStorage.getItem('complaints') || '[]');
    const complaint = complaints.find(c => c.id === trackingId);

    if (complaint) {
        // Populate Data
        document.getElementById('resId').textContent = complaint.id;
        document.getElementById('resStatus').textContent = complaint.status;
        document.getElementById('resType').textContent = complaint.type;
        document.getElementById('resDate').textContent = new Date(complaint.date).toLocaleString();

        // Show Result
        resultDiv.classList.remove('hidden');

        // Update Progress Bar
        updateProgressBar(complaint.status);
    } else {
        alert('Complaint ID not found. Please check and try again.');
        resultDiv.classList.add('hidden');
    }
}

function updateProgressBar(status) {
    const statuses = ['Submitted', 'Under Review', 'Action Taken', 'Resolved'];
    const statusIndex = statuses.indexOf(status);
    const steps = document.querySelectorAll('.progress-track .step');

    steps.forEach((step, index) => {
        if (index <= statusIndex) {
            step.classList.add('active');
            step.style.borderColor = 'var(--primary-color)';
            step.style.color = 'var(--primary-color)';
        } else {
            step.classList.remove('active');
            step.style.borderColor = 'var(--glass-border)';
            step.style.color = 'var(--secondary-color)';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    navigateTo('home');
});
