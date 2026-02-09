document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const imagePreview = document.getElementById('image-preview');
    const previewContainer = document.getElementById('preview-container');
    const loadingOverlay = document.getElementById('loading-overlay');
    const resultsContainer = document.getElementById('results-container');
    const resetBtn = document.getElementById('reset-btn');
    const diseaseNameSpan = document.getElementById('disease-name');
    const confidenceSpan = document.getElementById('confidence-score');
    const recommendationText = document.getElementById('recommendation-text');

    // Mock Database of Diseases
    const diseases = [
        {
            name: "Tomato Early Blight",
            treatment: "Apply fungicides like Chlorothalonil or Copper-based sprays. Remove infected leaves immediately to prevent spread.",
            confidence: 94
        },
        {
            name: "Potato Late Blight",
            treatment: "Destroy infected tubers. Use fungicides containing Mancozeb or Metalaxyl. Ensure proper drainage in the field.",
            confidence: 88
        },
        {
            name: "Corn Common Rust",
            treatment: "Plant resistant varieties. Apply fungicides if infection is severe early in the season.",
            confidence: 91
        },
        {
            name: "Healthy Plant",
            treatment: "No treatment needed. Continue regular watering and fertilization schedule.",
            confidence: 98
        }
    ];

    // Drag and Drop Events
    dropZone.addEventListener('click', () => fileInput.click());

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary-dark)';
        dropZone.style.backgroundColor = '#F1F8E9';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.borderColor = 'var(--primary-light)';
        dropZone.style.backgroundColor = 'var(--card-bg)';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.borderColor = 'var(--primary-light)';
        dropZone.style.backgroundColor = 'var(--card-bg)';
        
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length) {
            handleFile(fileInput.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            showPreview();
            simulateAnalysis();
        };
        reader.readAsDataURL(file);
    }

    function showPreview() {
        dropZone.classList.add('hidden');
        previewContainer.classList.remove('hidden');
        resultsContainer.classList.add('hidden');
    }

    function simulateAnalysis() {
        loadingOverlay.classList.remove('hidden');
        
        // Simulate API delay
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            showResults();
        }, 2500);
    }

    function showResults() {
        // Randomly select a result for demo purposes
        const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];
        
        diseaseNameSpan.textContent = randomDisease.name;
        confidenceSpan.textContent = `${randomDisease.confidence}%`;
        recommendationText.textContent = randomDisease.treatment;
        
        // Dynamic coloring based on "Healthy" status
        const resultCard = document.querySelector('.result-card');
        if (randomDisease.name.includes("Healthy")) {
            resultCard.style.borderLeftColor = "var(--primary-color)";
            document.querySelector('.result-header').style.color = "var(--primary-color)";
        } else {
            resultCard.style.borderLeftColor = "#d32f2f"; // Red for disease
            document.querySelector('.result-header').style.color = "#d32f2f";
        }

        resultsContainer.classList.remove('hidden');
    }

    resetBtn.addEventListener('click', () => {
        fileInput.value = '';
        previewContainer.classList.add('hidden');
        resultsContainer.classList.add('hidden');
        dropZone.classList.remove('hidden');
    });
});
