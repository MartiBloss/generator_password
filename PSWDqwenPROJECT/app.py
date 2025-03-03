from flask import Flask, render_template

# Создаем экземпляр Flask приложения
app = Flask(__name__)

# Определяем маршрут для главной страницы
@app.route('/')
def index():
    return render_template('index.html')  # Отображаем HTML-шаблон

# Запуск сервера
if __name__ == '__main__':
    app.run(debug=True)  # Режим отладки включен для разработки