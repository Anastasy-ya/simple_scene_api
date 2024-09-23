const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

// Пути к файлам
const parametersFilePath = path.join(__dirname, '../data/parameters.json');
const themeFilePath = path.join(__dirname, '../data/theme.json');

// Чтение данных из файла
function readDataFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
}

// Запись данных в файл
function writeDataToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8', (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

// Функция для получения параметров
function getParameters(req, res) {
  readDataFromFile(parametersFilePath)
    .then((parameters) => {
      res.json(parameters);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to read parameters' });
    });
}

// Функция для получения темы
function getTheme(req, res) {
  readDataFromFile(themeFilePath)
    .then((theme) => {
      res.json(theme);
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to read theme' });
    });
}

// Функция для сохранения параметров
function saveParameters(req, res) {
  const newParameters = req.body;

  writeDataToFile(parametersFilePath, newParameters)
    .then(() => {
      res.status(200).json({ message: 'Parameters saved successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to save parameters' });
    });
}

// Функция для сохранения темы
function saveTheme(req, res) {
  const newTheme = req.body;

  writeDataToFile(themeFilePath, newTheme)
    .then(() => {
      res.status(200).json({ message: 'Theme saved successfully' });
    })
    .catch((err) => {
      res.status(500).json({ error: 'Failed to save theme' });
    });
}

module.exports = {
  getParameters,
  getTheme,
  saveParameters,
  saveTheme
};
