# ND17 test-task

### Mongoose
API Task runner

Getting started:

1. `npm i`
2. `npm run start`

Примеры запросов
- POST /task-manager-api/v1.0/users - добавить пользователя
- GET /task-manager-api/v1.0/users - получить список польователей
- DELETE /task-manager-api/v1.0/users/id - удалить пользователя

- GET /task-manager-api/v1.0/tasks/id - получить задачу
- GET /task-manager-api/v1.0/tasks/{title/description}?value="" => проводит поиск по названию или описанию задачи и выводит результат 