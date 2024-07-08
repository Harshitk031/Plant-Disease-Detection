// script.js

document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const previewContainer = document.getElementById('preview-container');
    const previewImage = document.getElementById('preview-image');
    const fileName = document.getElementById('file-name');
    const fileSize = document.getElementById('file-size');
    const analyzeButton = document.getElementById('analyze-button');
    const removeFileButton = document.getElementById('remove-file');
    const resultContainer = document.getElementById('result-container');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', () => {
        handleFiles(fileInput.files);
    });

    removeFileButton.addEventListener('click', removeFile);

    analyzeButton.addEventListener('click', analyzePlant);

    function handleFiles(files) {
        if (files.length) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImage.src = e.target.result;
                    fileName.textContent = file.name;
                    fileSize.textContent = formatFileSize(file.size);
                    previewContainer.style.display = 'flex';
                    analyzeButton.style.display = 'block';
                    resultContainer.style.display = 'none';
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' bytes';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
        else return (bytes / 1048576).toFixed(2) + ' MB';
    }

    function removeFile() {
        previewContainer.style.display = 'none';
        analyzeButton.style.display = 'none';
        resultContainer.style.display = 'none';
        fileInput.value = '';
        previewImage.src = '';
        fileName.textContent = '';
        fileSize.textContent = '';
    }

    async function analyzePlant() {
        const file = fileInput.files[0];
        if (!file) {
            alert('Please select an image first.');
            return;
        }
    
        const formData = new FormData();
        formData.append('file', file);
    
        try {
            analyzeButton.disabled = true;
            analyzeButton.textContent = 'Analyzing...';
    
            const response = await fetch('/predict', {
                method: 'POST',
                body: formData
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const result = await response.json();
            displayResult(result);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while processing the image: ' + error.message);
        } finally {
            analyzeButton.disabled = false;
            analyzeButton.textContent = 'Analyze';
        }
    }

    function displayResult(result) {
        if (result.error) {
            resultContainer.innerHTML = `<p class="error">${result.error}</p>`;
        } else {
            resultContainer.innerHTML = `<p>Predicted Disease: ${result.prediction}</p>`;
        }
        resultContainer.style.display = 'block';
    }
});