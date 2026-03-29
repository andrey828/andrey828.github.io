from fastapi import FastAPI
import uvicorn

app = FastAPI()

@app.post("/analyze")
async def analyze_code(payload: dict):
    code = payload.get("code", "")
    # Aquí iría un modelo de Machine Learning (Pandas/Scikit-learn)
    # Analizando la complejidad ciclomática del código Java
    if "System.out.println" in code:
        return {"status": "good", "suggestion": "Código limpio detectado."}
    else:
        return {"status": "warning", "suggestion": "Añade una salida de consola."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
  
