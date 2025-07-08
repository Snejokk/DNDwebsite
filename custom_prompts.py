# Пользовательские промпты для нейросети
# Этот файл позволяет легко добавлять новые режимы работы

# Функция для добавления новых промптов
def add_custom_prompt(prompt_id, prompt_text, display_name, description):
    """
    Добавить новый пользовательский промпт
    
    Args:
        prompt_id (str): Уникальный идентификатор промпта
        prompt_text (str): Текст промпта
        display_name (str): Отображаемое имя режима
        description (str): Описание режима
    
    Returns:
        dict: Информация о добавленном промпте
    """
    return {
        'id': prompt_id,
        'prompt': prompt_text,
        'name': display_name,
        'description': description
    }

# Примеры пользовательских промптов
CUSTOM_PROMPTS = {
}

def get_custom_prompt(prompt_id):
    """
    Получить пользовательский промпт по ID
    
    Args:
        prompt_id (str): ID промпта
    
    Returns:
        str: Текст промпта или None, если не найден
    """
    if prompt_id in CUSTOM_PROMPTS:
        return CUSTOM_PROMPTS[prompt_id]['prompt']
    return None

def get_all_custom_prompts():
    """
    Получить все пользовательские промпты
    
    Returns:
        dict: Словарь всех пользовательских промптов
    """
    return CUSTOM_PROMPTS 