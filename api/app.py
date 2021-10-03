from flask import Flask, jsonify, request
import pickle
from model.predict import predict_number


app = Flask(__name__)

english_digits_predictor = pickle.load(open('model/english_digits_predictor.pkl', 'rb'))

@app.route('/')
def index():
    return jsonify({"message":"Welcome to handwritten digit prediction"})

@app.route('/api/predict', methods=['GET'])
def predict():
    image = request.args.get('image')
    # try:
    predicted = predict_number(image=image, model=english_digits_predictor)
    # except:
    # predicted = ''
    return jsonify({'number': str(predicted)})
    # return predicted

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
