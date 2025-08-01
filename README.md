# Todo-лист (составление заметок)

Простая программа для создания и управления заметками, написанная на `JavaScript` с использованием `Webpack` в качестве сборщика (для изучения в большей степени). Данные сохраняются в локальном хранилище браузера `(localStorage)`.

## Демонстрация

Для возможности быстрой демонстрации проекта, ToDO-лист размещен `Github Pages`.
[Ссылка](https://niko142.github.io/Notes) на демо.

## Основной функционал программы

Данный ToDo лист содержит весь необходимый функционал, которыми обладают все стандартные программы для составления списка дел:

- Добавление новых заметок;
- Редактирование существующих заметок;
- Удаление лишних или выполненных заметок;
- Валидация ввода текста (ограничение на длину текста);
- Наличие поля поиска для фильтрации заметок по содержанию;
- Пагинация для корректного отображения большого списка;
- Анимация загрузки страницы.

## Установка и запуск

Для того, чтобы запустить проект локально в целях изучения или собственного тестирования, нужно сделать ряд шагов, согласно инструкции.

### Инструкция

#### 1. **Клонирование репозитория**

```bash
git clone https://github.com/Niko142/Notes.git
cd Notes
```

#### 2. **Установка зависимостей**

```bash
npm install
# или любой другой пакетный менеджер
```

#### 3. **Сборка и запуск**

```bash
# Сборка проекта
npm run build

# ДАЛЕЕ

# Запуск проекта (development-режим)
npm run preview
# Запуск проекта (production-режим)
npm run prod
```
