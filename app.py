from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
import os
from dotenv import load_dotenv
from prompts import get_language_prompt
from custom_prompts import get_custom_prompt, get_all_custom_prompts

app = Flask(__name__)
CORS(app)

load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

model = genai.GenerativeModel('gemini-2.5-flash-preview-04-17')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message', '')
        language = data.get('language', 'russian')
        difficulty_level = data.get('difficulty', 'Normal')
        client_history = data.get('history', []) # История с клиента

        system_prompt_for_persona = ""
        custom_prompt = get_custom_prompt(language)
        if custom_prompt:
            system_prompt_for_persona = custom_prompt
        else:
            system_prompt_for_persona = get_language_prompt(language, difficulty_level)

        effective_history_for_model = []

        # Если клиентская история пуста, это начало новой сессии чата.
        # Нам нужно добавить системный промпт в начало беседы.
        if not client_history:
            effective_history_for_model.append({'role': 'user', 'parts': [{'text': system_prompt_for_persona}]})
            effective_history_for_model.append({'role': 'model', 'parts': [{'text': ''}]}) # Инициируем модель пустым ответом

        # Добавляем историю, предоставленную клиентом (которая содержит только предыдущие ходы пользователя/модели)
        effective_history_for_model.extend(client_history)

        convo = model.start_chat(history=effective_history_for_model)

        response_text = ""
        # Это начальный запрос DM для D&D игры (пустое сообщение пользователя и пустая клиентская история)
        if not user_message and not client_history:
            response_text = convo.send_message("Начни игру").text # Скрытая команда для DM
        else: # Обычное сообщение или первое сообщение пользователя после вступления DM
            response_text = convo.send_message(user_message).text
        
        return jsonify({
            'response': response_text,
            'language': language,
            'difficulty': difficulty_level
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/languages', methods=['GET'])
def get_available_languages():
    """Получить список доступных языков"""
    custom_prompts = get_all_custom_prompts()
    
    base_languages = [
        {'id': 'russian', 'name': 'Русский', 'description': 'Русский язык', 'flag': '🇷🇺'},
        {'id': 'ukrainian', 'name': 'Українська', 'description': 'Украинский язык', 'flag': '🇺🇦'},
        {'id': 'english', 'name': 'English', 'description': 'Английский язык', 'flag': '🇺🇸'},
        {'id': 'german', 'name': 'Deutsch', 'description': 'Немецкий язык', 'flag': '🇩🇪'},
        {'id': 'french', 'name': 'Français', 'description': 'Французский язык', 'flag': '🇫🇷'},
        {'id': 'spanish', 'name': 'Español', 'description': 'Испанский язык', 'flag': '🇪🇸'},
        {'id': 'italian', 'name': 'Italiano', 'description': 'Итальянский язык', 'flag': '🇮🇹'},
        {'id': 'chinese', 'name': '中文', 'description': 'Китайский язык', 'flag': '🇨🇳'}
    ]
    
    all_languages = base_languages
    
    return jsonify({'languages': all_languages})

@app.route('/api/modes', methods=['GET'])
def get_available_modes():
    """Получить список доступных режимов (для обратной совместимости)"""
    return get_available_languages()

@app.route('/api/prompts', methods=['GET'])
def get_prompts():
    """Получить все доступные промпты (для административных целей)"""
    try:
        custom_prompts = get_all_custom_prompts()
        return jsonify({
            'custom_prompts': custom_prompts,
            'message': 'Промпты успешно загружены'
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 