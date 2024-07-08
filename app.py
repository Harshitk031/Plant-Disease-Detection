from flask import Flask, render_template, request, jsonify
import torch
import torch.nn as nn
from PIL import Image
import io
import torchvision.transforms as transforms
from app_model import CNN_Model

app = Flask(__name__)

model = torch.load('D:\Project\Plant_disease_model.pth', map_location=torch.device('cpu'))
model.eval()

Disease_classes = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy',
                   'Blueberry___healthy',
                   'Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy', 
                   'Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight','Corn_(maize)___healthy',  
                   'Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)', 'Grape___healthy',  
                   'Orange___Haunglongbing_(Citrus_greening)',
                   'Peach___Bacterial_spot', 'Peach___healthy', 
                   'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy',
                   'Potato___Early_blight','Potato___Late_blight','Potato___healthy',
                   'Raspberry___healthy',
                   'Soybean___healthy',
                   'Squash___Powdery_mildew',
                   'Strawberry___Leaf_scorch','Strawberry___healthy',
                   'Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold', 'Tomato___Septoria_leaf_spot',
                   'Tomato___Spider_mites Two-spotted_spider_mite', 'Tomato___Target_Spot','Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus' , 'Tomato___healthy']

def prediction(img, model):
    x = img.unsqueeze(0)
    y = model(x)
    _, predict = torch.max(y, dim=1)
    return predict[0].item()

transform = transforms.Compose([
    transforms.Resize((256, 256)),  # Resize the image to 256x256
    transforms.ToTensor()           # Convert the image to a PyTorch tensor
])


@app.route('/',methods=['GET'])
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file:
            img_bytes = file.read()
            image = Image.open(io.BytesIO(img_bytes))
            img = transform(image)
            predicted_class = Disease_classes[prediction(img, model)]
            return jsonify({'prediction': predicted_class})
    except Exception as e:
        print(f"An error occurred: {str(e)}")
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500



if __name__ == "__main__":
    app.run(debug=True)