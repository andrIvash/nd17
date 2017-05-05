# ND17 test-task

### MongoDB adv query
API телефонная книга

Getting started:

1. `npm i`
2. `npm run start`

Примеры запросов

- GET /phonebook-api/v1.0/phones => выводит все записи
- GET /phonebook-api/v1.0/phones/{name/surname/phone}?value="" => проводит поиск по полю и его значению и выводит результат 
- POST /phonebook-api/v1.0/phones  Добавляет запись беря данные из тела запроса {name: '', surname: '', phone: ''}
- PATCH /phonebook-api/v1.0/phones/{name/surname/phone}?value=""&name=""&surname=""&phone="" => проводит поиск по полю и его значению и обновляет данные
- DELETE /phonebook-api/v1.0/phones/{name/surname/phone}?value="" => проводит поиск по полю и его значению и удаляет запись 