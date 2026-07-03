from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    UPLOAD_DIR: str

    OPENAI_API_KEY: str = ""

    MAX_AUDIO_SIZE_MB: int
    ALLOWED_AUDIO_EXTENSIONS: str

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


settings = Settings()