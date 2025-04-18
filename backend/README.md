# QuizGPT API

## Quick Start

1. **Install Docker:** Follow the [Docker installation guide](https://docs.docker.com/get-docker/).
2. **Get the `docker-compose.prod.yml` file from this repository.**
3. **Run Docker Compose:**
    ```sh
    docker-compose -f docker-compose.prod.yml up -d
    ```

## Local Start

1. **Clone this repository and go to the backend folder**
2. **Install requirements:**
    ```sh
    pip install -r requirements.txt
    ```
3. **Run the API:**
    ```sh
    uvicorn main:app --reload --port 8080
    ```
