# Build from the repository root so the shared core is included:
#   docker build -f services/flame-api/Dockerfile -t flame-api .
FROM python:3.12-slim
WORKDIR /srv
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY services/flame-api/requirements.txt services/flame-api/requirements.txt
RUN pip install --no-cache-dir -r services/flame-api/requirements.txt
COPY python ./python
COPY services/flame-api ./services/flame-api
RUN useradd --create-home app && chown -R app /srv
USER app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--app-dir", "services/flame-api", "--host", "0.0.0.0", "--port", "8000"]
