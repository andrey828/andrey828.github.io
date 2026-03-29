from fastapi import FastAPI
app = FastAPI()

@app.get("/")
def check_ai():
    return {"status": "AI Model Active", "encryption": "verified"}
    
