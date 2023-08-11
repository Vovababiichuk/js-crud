// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    title: 'CRUD',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

//* ми маємо дані які нам приходять і нам потрібно їх зберегти. Для цього ми створимо код який буде в середині сервера зберігати дані, взаємодіяти з ними і робити все що нам потрібно...

// створюємо клас User
class User {
  static #list = []

  constructor(email, login, password) {
    // підключимо дані з аргумента і в сам клас передамо
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }

  verifyPassword = (password) => this.password === password

  // cтворимо статичний метод add яка буде приймати user і зберігати його в приватну змінну #list
  static add = (user) => this.#list.push(user)

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((user) => user.id === id)

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )

    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = this.getById(id)

    if (user) {
      this.update(user, data)

      return true
    } else {
      return false
    }
  }

  static update = (user, { email }) => {
    if (email) {
      user.email = email
    }
  }
}
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/user-create', function (req, res) {
  // через деструктиризацію дістаємо email login і password
  const { email, login, password } = req.body

  // створимо нового User куди передамо потрібні дані
  const user = new User(email, login, password)

  User.add(user)

  console.log(User.getList())

  res.render('success-info', {
    style: 'success-info',
    info: 'The user is created',
  })
})

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-delete', function (req, res) {
  // query - те що знаходиться після знаку ?
  const { id } = req.query

  User.deleteById(Number(id))

  res.render('success-info', {
    style: 'success-info',
    info: 'The user was removed',
  })
})

// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/user-update', function (req, res) {
  // query - те що знаходиться після знаку ?
  const { email, password, id } = req.body

  let result = false

  const user = User.getById(Number(id))

  if (user.verifyPassword(password)) {
    User.update(user, { email })
    result = true
  }

  res.render('success-info', {
    style: 'success-info',
    info: result ? 'Email is updated' : 'An error occurred',
  })
})

// ================================================================
// ===============Product==========================================

// ================================================================

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

class Product {
  static #list = [] // Приватне поле, яке містить список створених товарів

  constructor(id, name, price, description) {
    this.id = id // Унікальне число з 5 цифр, яке потрібно отримати через функцію Math.random
    this.createDate = new Date().toISOString() // Дата в форматі ISO рядка, яка створена та додана при створенні об’єкта в методі класу constructor
    this.name = name // Текстова назва товару
    this.price = price // Ціна товару, число
    this.description = description // Текстовий опис товару
  }

  static getList = () => this.#list // Повертає список створених товарів

  static add = (product) => this.#list.push(product) // Додає переданий в аргументі товар в список створених товарів в приватному полі #list

  // Знаходить товар в списку створених товарів за допомогою ID, яке повинно бути числом, та яке передається як аргумент
  static getById = (id) => {
    if (typeof id !== 'number') {
        throw new Error('ID має бути числом');
    }
    return this.#list.find((product) => product.id === id);
}

  static updateById = (id, data) => {
    // Оновлює властивості аргументу data в об’єкт товару, який був знайдений по ID. Можна оновлювати price, name, description
    const product = this.getById(id)
    if (product) {
      product.name = data.name || product.name
      product.price = data.price || product.price
      product.description = data.description || product.description
    }
  }

  static deleteById = (id) => {
    // Видаляє товар по його ID зі списку створених товарів
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
    }
  }
}

//! Потрібно створити GET endpoint з PATH /product-create який повертає container/product-create

router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
  })
})

//! Потрібно створити endpoint POST з PATH /product-create який отримує в req.body дані для оновлення product

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body;
  const id = Math.floor(Math.random() * 90000) + 10000;
  const createDate = new Date().toISOString();
  const product = new Product(id, name, price, description, createDate);

  Product.add(product);

  res.render('container/alert', { message: 'Product created successfully' });
});


// вище на фото ви можете побачити форму створення нового об’єкту товару в container/product-create, в якій потрібно вказати атрибут method: POST, action: /product-create

// при натисканні на кнопку "Створити товар" потрібно відправляти POST запит на ендпоїнт /product-create

//в ендпоїнті /product-create потрібно:
// - через req.body отримати оновлені дані товару (name price, description)
// - створити товар
// - зберегти товар в списку створених товарів
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

//! Потрібно створити container/alert

// container/alert використовується в ендпоїнтах, які виконують певну операцію над об’єктами product та повинні повернути інформацію про результат виконання операції (успішно або помилка)

// посилання-кнопка Повернутись назад повинно вести на сторінку /product-list

//! Потрібно створити GET endpoint з PATH /product-list який повертає container/product-list

router.get('/product-list', (req, res) => {
  const products = Product.getList();
  res.render('/product-list', { products });
});


// вище на фото ви можете побачити дизайн інтерфейсу для container/product-list, в якому потрібно реалізувати список товарів

// в ендпоїнті вам потрібно отримати актуальний список товарів, прокинути в container дані cписку товарів та вивести їх в container/product-list

// карточку товару потрібно винести в окремий компонент з назвою product-card

// посилання Редагувати повинно вести на сторінку редагування товару та передавати в посилання ідентифікатор товару. PATH: /product-edit?id=<ідентифікатор товару>

//! Потрібно створити GET endpoint з PATH /product-edit який приймає query параметр з назвою id в посиланні та повертає container/product-edit з даними товару

router.get('/product-edit', (req, res) => {
  const id = parseInt(req.query.id); // Отримуємо з req.query властивість id
  const product = Product.getById(id); // За допомогою id отримуємо об’єкт сутності product з таким id
  if (product) {
      res.render('/product-edit', { product }); // Прокидаємо дані отриманого товару в container та виводимо дані товару в полях форми в container/product-edit
  } else {
      res.render('/alert', { message: 'Товар з таким ID не знайдено' }); // Якщо при пошуку product по id не було знайдено такого товару, то відображаємо container/alert з інформацією "Товар з таким ID не знайдено"
  }
});

// вище на фото ви можете побачити дизайн інтерфейсу для container/product-edit, в якому потрібно реалізувати форму редагування даних товару

// в ендпоїнті вам потрібно:
// - отримати з req.query властивість id
// - за допомогою id вам потрібно отримати об’єкт сутності product з таким id
// - прокинути дані отриманого товару в container
// - вивести дані товару в полях форми в container/product-edit.
// - якщо при пошуку product по id не було знайдено такого товару, то потрібно відобразити container/alert з інформацією "Товар з таким ID не знайдено"

//! Потрібно створити endpoint POST з PATH /product-edit який отримує в req.body дані для оновлення product

router.post('/product-update', (req, res) => {
  const id = parseInt(req.body.id); // Через req.body отримуємо оновлені дані товару (name, price, description) та id товару
  const data = {
      name: req.body.name,
      price: parseFloat(req.body.price),
      description: req.body.description
  };
  Product.updateById(id, data); // За допомогою id товару оновлюємо дані в товарі (name, price, description)
  res.render('/alert', { 
    message: 'Товар успішно оновлено' 
  }); // Після успішного або неуспішного виконання операції відображаємо container/alert з інформацією про результат виконання операції
});

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно вказати атрибут method: POST, action: /product-edit

// при натисканні на кнопку "Зберегти оновлення" потрібно відправляти POST запит на ендпоїнт /product-edit

// в ендпоїнті /product-edit потрібно:
// - через req.body отримати оновлені дані товару (name, price, description) та id товару
// - за допомогою id товару оновити дані в товарі (name, price, description)
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

//! Потрібно створити GET endpoint з PATH /product-delete який приймає query параметр з назвою id в посилані

router.get('/product-delete', (req, res) => {
  const id = parseInt(req.query.id); // Через req.query отримуємо id товару
  Product.deleteById(id); // За допомогою id товару видаляємо товар
  res.render('container/alert', { message: 'Товар успішно видалено' }); // Після успішного або неуспішного виконання операції відображаємо container/alert з інформацією про результат виконання операції
});

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно:
// - зробити кнопку-посилання "Видалити товар"
// - яке буде вести на сторінку-ендпоїнт видалення товару
// - та передавати в посилання ідентифікатор товару.
// - PATH: /product-edit?id=<ідентифікатор товару>

// в ендпоїнті /product-delete потрібно:
// - через req.query отримати id товару
// - за допомогою id товару видалити товар

// ===========================================================================

// Підключаємо роутер до бек-енду
module.exports = router
