# Personal Portfolio and Project Chatbot

Portfolio website featuring a chatbot for talking with any of my pinned projects on Github.

### Installing

1. Clone this repository:
   ```
   git clone https://github.com/voynow/jamievoynow.com.git
   ```

2. Create a virtual environment and activate it (optional, but recommended):
   ```
   python -m venv venv
   source venv/bin/activate
   ```

3. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Create a `.env` file in the root directory of the project and add the following variables:
   ```
   GH_TOKEN=your_github_access_token
   API_KEY=your_openai_api_key
   ```

5. Run the app using Flask locally:
   ```
   export FLASK_APP=app.py
   export FLASK_ENV=development
   flask run
   ```


## Features

1. Personal portfolio displaying basic information and featured projects
2. A chatbot for each featured project, where users can ask questions and get on-topic responses generated by OpenAI's GPT-3
3. The chatbot interface features real-time chat functionality using Flask-SocketIO, gevent, and websockets
4. Project information is cached using Flask-Caching

## File Structure

```
- app.py                      # Main Flask application
- Procfile                    # For deploying on web servers supporting the Procfile format
- requirements.txt            # Python dependencies
- exclude.toml                # Configuration file for Black code formatter
- src
  - config.py                 # Configuration variables
  - services.py               # Service functions to interact with GitHub, GPT-3, and caching
- templates                   # Jinja2 templates for the web pages
- static                      # CSS, JavaScript, and other static files
```

## Deployment

The `Procfile` provided is configured for deploying on Heroku with Gunicorn and gevent-websocket. However, you can also deploy it on other web servers supporting the Procfile format or using a custom deployment procedure suited to the target platform.