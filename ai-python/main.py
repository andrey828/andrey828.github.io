from fastapi import FastAPI
import time

app = FastAPI()

@app.get("/predict")
def predict_load():
    # Simulando IA de predicción de tráfico
    return {"prediction": "Stable", "load_factor": 0.0000000001}
    
