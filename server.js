// server.js
const express = require('express');
const cors = require('cors');  // Импортируем пакет CORS
const { getParameters, getTheme, saveParameters, saveTheme } = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Настраиваем CORS
app.use(cors());

// Middleware для обработки JSON запросов
app.use(express.json());

// Определяем маршруты и передаем функции
app.get('/getparameters', getParameters);
app.get('/gettheme', getTheme);
app.post('/saveparameters', saveParameters);
app.post('/savetheme', saveTheme);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
