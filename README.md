# 🌱 Plant Disease Detection

![1](https://images.saymedia-content.com/.image/t_share/MTc0MzU0NDg3NTYwMzE2MjY0/plant-diseases-that-affect-cucumbers-and-how-to-treat-them.jpg)

## 💭Why Plant Disease Detection?
### Detecting plant diseases is crucial for several reasons:

- **Agricultural Productivity:** Early identification of diseases can prevent widespread outbreaks, ensuring the health and yield of crops.
- **Economic Impact:** Minimizing crop losses due to diseases directly affects the economic stability of farmers and the agriculture industry.
- **Food Security:** Protecting crops from diseases is essential to maintain a stable food supply for the growing global population.
- **Environmental Protection:** Effective disease management reduces the need for chemical treatments, thus protecting the environment.

## ✨Features
- Detects whether a plant leaf is healthy or diseased.
- Classifies the type of disease based on the leaf image.
- Provides a user-friendly web interface for uploading images and obtaining predictions.
  
## 🛠️Technologies Used
- **Programming Languages:** Python
- **Frameworks:** PyTorch, Flask
- **Deep Learning:** Convolutional Neural Networks (CNN)
- **Frontend:** HTML, CSS, JavaScript
- **Tools:** Conda, Visual Studio Code, Git
- **Libraries:** NumPy, Pandas, Matplotlib, Seaborn

## 📊Dataset
The model is trained on a comprehensive image dataset ([Plant Disease Dataset](https://www.kaggle.com/datasets/vipoooool/new-plant-diseases-dataset)) containing 87,000 images across 38 classes of plant diseases. The dataset includes a diverse range of leaf images, covering various plant species and disease types.

## 🧠Model Architecture
The CNN model is designed to effectively extract features from leaf images and classify them into healthy or diseased categories.
The architecture includes multiple convolutional layers, pooling layers, and fully connected layers.

## 🖥️Installation
#### Clone the repository:
```bash
git clone https://github.com/your-username/plant-disease-detection.git
cd plant-disease-detection
```

#### Create a virtual environment:
```bash
conda create -n plant-disease-detection python=3.8
conda activate plant-disease-detection
```

#### Install the required packages:
```bash
pip install pandas numpy matplotlib flask torch
```

#### Download the dataset:

Place the dataset in the appropriate directory or update the dataset path in the code.

#### Run the Flask application:

```bash
python app.py
```
#### Access the web interface:
Open your browser and go to http://localhost:5000.

## 🏆Results
Achieved a high accuracy of 99.43% in disease detection and classification. The model demonstrates robust performance across different types of plant diseases.

## 🤝Contributing
Contributions are welcome! If you have any ideas or improvements, feel free to create an issue or submit a pull request.
