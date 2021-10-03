import numpy as np
import base64
import cv2


def predict_number(image, model):
    image_data = image.replace(' ', '+').encode()
    with open("imageToSave.png", "wb") as fh:
        fh.write(base64.decodebytes(image_data))
    image = cv2.imread('imageToSave.png')
    image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY) 
    image = cv2.resize(image, (28,28), interpolation = cv2.INTER_AREA)
    image = np.where(image==255, 0, image)
    image = np.where(image!=0, 255, image)
    image = image.reshape(1,784)
    predicted = model.predict(image)
    return predicted[0]