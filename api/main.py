import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.V2 import router as version_2

app = FastAPI()

app.include_router(version_2)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        
    allow_credentials=False,   
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8080, reload=True)
