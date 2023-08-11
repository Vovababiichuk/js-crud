//* Завдання полягає у написанні CRUD для сутності product

// id - Унікальне число з 5 цифр, яке потрібно отримати через функцію Math.random
// createDate - Дата в форматі ISO рядка, яка створена та додана при створенні об’єкта в методі класу constructor
// name - Текстова назва товару
// price - Ціна товару, число
// description - Текстовий опис товару

//* вище в таблиці ви можете побачити публічні поля класу Product, які з’являється в об’єкта, який створюється від класу

// #list - Приватне поле, яке містить список створених товарів
// getList() - Повертає список створених товарів
// add(product) - Додає переданий в аргументі товар в список створених товарів в приватному полі #list
// getById(id) - Знаходить товар в списку створених товарів за допомогою ID, яке повинно бути числом, та яке передається як аргумент
// updateById(id, data) - Оновлює властивості аргументу data в об’єкт товару, який був знайдений по ID. Можна оновлювати price, name, description
// deleteById(id) - Видаляє товар по його ID зі списку створених товарів

//* вище в таблиці ви можете побачити статичні та приватні поля класу Product, які використовуються через клас Product

//! Потрібно створити GET endpoint з PATH /product-create який повертає container/product-create

//! Потрібно створити endpoint POST з PATH /product-create який отримує в req.body дані для оновлення product

// вище на фото ви можете побачити форму створення нового об’єкту товару в container/product-create, в якій потрібно вказати атрибут method: POST, action: /product-create

// при натисканні на кнопку "Створити товар" потрібно відправляти POST запит на ендпоїнт /product-create

//в ендпоїнті /product-create потрібно:
// - через req.body отримати оновлені дані товару (name price, descriptionÌ
// - створити товар
// - зберегти товар в списку створених товарів
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

//! Потрібно створити container/alert

// container/alert використовується в ендпоїнтах, які виконують певну операцію над об’єктами product та повинні повернути інформацію про результат виконання операції (успішно або помилка)

// посилання-кнопка Повернутись назад повинно вести на сторінку /product-list

//! Потрібно створити GET endpoint з PATH /product-list який повертає container/product-list

// вище на фото ви можете побачити дизайн інтерфейсу для container/product-list, в якому потрібно реалізувати список товарів

// в ендпоїнті вам потрібно отримати актуальний список товарів, прокинути в container дані cписку товарів та вивести їх в container/product-list

// карточку товару потрібно винести в окремий компонент з назвою product-card

// посилання Редагувати повинно вести на сторінку редагування товару та передавати в посилання ідентифікатор товару. PATH: /product-edit?id=<ідентифікатор товару>

//! Потрібно створити GET endpoint з PATH /product-edit який приймає query параметр з назвою id в посиланні та повертає container/product-edit з даними товару

// вище на фото ви можете побачити дизайн інтерфейсу для container/product-edit, в якому потрібно реалізувати форму редагування даних товару

// в ендпоїнті вам потрібно:
// - отримати з req.query властивість id
// - за допомогою id вам потрібно отримати об’єкт сутності product з таким id
// - прокинути дані отриманого товару в container
// - вивести дані товару в полях форми в container/product-edit.
// - якщо при пошуку product по id не було знайдено такого товару, то потрібно відобразити container/alert з інформацією "Товар з таким ID не знайдено"

//! Потрібно створити endpoint POST з PATH /product-edit який отримує в req.body дані для оновлення product

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно вказати атрибут method: POST, action: /product-edit

// при натисканні на кнопку "Зберегти оновлення" потрібно відправляти POST запит на ендпоїнт /product-edit

// в ендпоїнті /product-edit потрібно:
// - через req.body отримати оновлені дані товару (name, price, description) та id товару
// - за допомогою id товару оновити дані в товарі (name, price, description)
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

//! Потрібно створити GET endpoint з PATH /product-delete який приймає query параметр з назвою id в посилані

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно:
// - зробити кнопку-посилання "Видалити товар"
// - яке буде вести на сторінку-ендпоїнт видалення товару
// - та передавати в посилання ідентифікатор товару.
// - PATH: /product-edit?id=<ідентифікатор товару>

// в ендпоїнті /product-delete потрібно:
// - через req.query отримати id товару
// - за допомогою id товару видалити товар
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції



/////////////////////

// Здається, у вас є досить конкретне завдання, пов'язане з реалізацією CRUD операцій для сутності `Product` в контексті веб-додатку. Давайте розглянемо кожен з ендпоінтів та їх вимоги окремо.

// **1. Створення нового товару (GET /product-create):**

// - Створіть HTML форму в `container/product-create`, де користувач буде вводити дані для створення товару (name, price, description).
// - Форма повинна мати атрибут `method="POST"` та `action="/product-create"`.
// - Після натискання на кнопку "Створити товар", відправте POST-запит на сервер для обробки.

// **2. Створення нового товару (POST /product-create):**

// - Отримайте дані товару з `req.body` (name, price, description).
// - Створіть об'єкт `Product` з отриманими даними та згенеруйте `id` та `createDate`.
// - Додайте створений об'єкт до приватного поля `#list`.
// - Виведіть повідомлення в `container/alert` з результатом операції.

// **3. Список товарів (GET /product-list):**

// - Створіть розділ `container/product-list` для виведення списку товарів.
// - Отримайте список товарів з приватного поля `#list`.
// - Виведіть дані кожного товару в окремому компоненті `product-card`.

// **4. Редагування товару (GET /product-edit):**

// - Створіть розділ `container/product-edit` для редагування даних товару.
// - Отримайте `id` товару з `req.query`.
// - Знайдіть товар за `id` в приватному полі `#list`.
// - Відобразіть дані товару в полях форми.
// - Виведіть повідомлення в `container/alert`, якщо товар не знайдено.

// **5. Редагування товару (POST /product-edit):**

// - Отримайте дані товару з `req.body` (name, price, description, id).
// - Знайдіть товар за `id` в приватному полі `#list`.
// - Оновіть дані товару за допомогою отриманих даних.
// - Виведіть повідомлення в `container/alert` з результатом операції.

// **6. Видалення товару (GET /product-delete):**

// - Додайте кнопку "Видалити товар" в `container/product-edit`, яка має посилання на `/product-delete?id=<ідентифікатор товару>`.
// - Отримайте `id` товару з `req.query`.
// - Знайдіть товар за `id` в приватному полі `#list`.
// - Видаліть товар зі списку.
// - Виведіть повідомлення в `container/alert` з результатом операції.

// Це загальна схема того, як ви можете виконати кожен з ендпоінтів згідно з вашими вимогами. Важливо розуміти, що реалізація кожного кроку може варіюватися залежно від того, як ви організуєте ваш код, використовуючи відповідні фреймворки та бібліотеки.

/////////////////////
