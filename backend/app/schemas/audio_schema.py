from pydantic import BaseModel


class AudioUploadResponse(BaseModel):
    success: bool
    message: str
    filename: str