# DND with AI

This web application is an interface for playing Dungeons & Dragons (D&D), featuring Google's Gemini AI as the Dungeon Master. The application allows users to start new games, continue saved ones, and customize the game's language and difficulty.

## Features

- **Interactive AI Gameplay:** Play D&D where the universe and adventures are crafted by an AI.
- **Multilingual Support:** The game is available in multiple languages, including English, Russian, German, and more.
- **Customizable Difficulty:** Choose a difficulty level from "Easy" to "Extreme."
- **Save and Load:** You can save your progress and return to your adventure later.
- **Custom Prompts:** Add your own scenarios and game modes through `custom_prompts.py`.

## Technologies

- **Backend:** Python, Flask
- **Frontend:** HTML, CSS, JavaScript
- **AI Engine:** Google Gemini API

## Project Structure

```
DND.website.1.1/
├── app.py                  # Main Flask application file (backend)
├── requirements.txt        # Python dependencies
├── prompts.py              # System prompts for different languages
├── custom_prompts.py       # Custom prompts for new game modes
├── HTML/                     # HTML files for the pages
│   ├── FirstPage.html        # Main menu
│   ├── SecondPageGamePromt.html # New game mode selection
│   ├── ThirdPage.html        # Load saved games
│   ├── FourPage.html         # Settings
│   └── z-ChatPage.html       # Game chat page
├── CSS/                      # Stylesheets
├── JS/                       # Client-side scripts
└── README.md               # This file
```

## Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <YOUR_REPOSITORY_URL>
    cd DND.website.1.1
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv .venv
    # On Windows
    .venv\Scripts\activate
    # On Linux/macOS
    source .venv/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your API key:**
    - Create a `.env` file in the project's root directory.
    - Add your Google Gemini API key to it:
      ```
      GOOGLE_API_KEY="YOUR_API_KEY"
      ```
    - Alternatively, you can enter the key in the settings page of the web interface.

5.  **Run the backend server:**
    ```bash
    python app.py
    ```
    The server will start at `http://127.0.0.1:5000`.

6.  **Open the frontend:**
    - Open the `HTML/FirstPage.html` file in your web browser.

## How to Use

1.  **Settings:** Before starting, go to "Settings" to select your preferred language, difficulty, and enter your Google API key if you haven't set it in the `.env` file.
2.  **New Game:** Click "New Game," choose a mode (language), and begin your adventure.
3.  **Continue:** If you have saved games, you can load them from the "Continue" menu.
4.  **Save:** During the game, you can click the "Save" button to record your current progress.

## Customization

You can easily add new languages or entirely new game scenarios.

-   **Adding a Language:**
    1.  Open `prompts.py`.
    2.  Add a new prompt following the existing format.
    3.  Add it to the `LANGUAGE_PROMPTS` dictionary.
    4.  Update the language list in `app.py` within the `get_available_languages` function.

-   **Creating a Custom Mode:**
    1.  Open `custom_prompts.py`.
    2.  Use the `add_custom_prompt` function to create a new mode with a unique ID and prompt text.
    3.  This new mode will automatically appear in the game mode selection list.