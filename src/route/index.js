// Підключаємо технологію express для back-end сервера
const express = require('express')
const { compile } = require('morgan')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'index',
    title: 'JS-PRACTICE-CRUD',
  })
  // ↑↑ сюди вводимо JSON дані
})

// ==========================================================================================================
// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/user-create', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('user-create', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'user-create',
    title: 'JS-PRACTICE-CRUD',

    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

//! ==========================USER-1======================================
//! ==========================USER-1======================================

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
    info: 'The user is created! ✅',
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
    info: '⛔ The user was removed!',
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
    info: result
      ? 'Email is updated! ✅'
      : 'An error occurred (wrong password) 🆘',
  })
})

//! ===============Product-1==========================================
//! ===============Product-1==========================================

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
  static initialized = false

  static #list = []

  constructor(name, price, description) {
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.createDate = new Date().toISOString()
    this.name = name
    this.price = price
    this.description = description
  }

  static init() {
    if (!this.initialized) {
      this.#list.push(
        new Product(
          'Apple iPhone 14 Pro Max',
          800,
          'Екран (6.7", OLED (Super Retina XDR), 2796x1290) / Apple A16 Bionic / основна квадро-камера: 48 Мп + 12 Мп + 12 Мп ...',
        ),
        new Product(
          'Apple MacBook Pro 16" M2',
          930,
          'Екран 16.2" Liquid Retina XDR (3456x2234) 120 Гц, глянсовий / Apple M2 Pro / RAM 16 ГБ / SSD 512 ГБ / Apple M2 Pro Graphics ...',
        ),
        new Product(
          'Apple MacBook Air 15.3',
          1000,
          "Екран (з 15-дюймів, тип екрану) / Процесор (тип процесора) / ОЗП (тип і кількість пам'яті) / Накопичувач ...",
        ),
      )

      this.initialized = true
    }
  }

  static getList = () => this.#list

  static add = (product) => this.#list.push(product)

  static getById = (id) =>
    this.#list.find((product) => product.id === id)

  static updateById = (id, data) => {
    const product = this.getById(id)
    if (product) {
      Object.assign(product, data)
      return true
    } else {
      return false
    }
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }
}

//! Потрібно створити GET endpoint з PATH /product-create який повертає container/product-create

router.get('/product-create', function (req, res) {
  res.render('product-create', {
    style: 'product-create',
    title: 'JS-PRACTICE-CRUD',
  })
})

//! Потрібно створити endpoint POST з PATH /product-create який отримує в req.body дані для оновлення product

router.post('/product-create', function (req, res) {
  const { name, price, description } = req.body

  if (!name || !price || !description) {
    res.render('alert', {
      style: 'alert',
      message:
        '🆘 Product not created (add a short description of the product)!',
      added: false,
    })
  } else {
    const product = new Product(name, price, description)
    Product.add(product)
    res.render('alert', {
      style: 'alert',
      message: '✅ Success! The product was created',
      added: true,
    })
  }
})

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

router.get('/product-list', function (req, res) {
  if (!Product.initialized) {
    Product.init()
  }

  const products = Product.getList()

  res.render('product-list', {
    style: 'product-list',
    title: 'JS-PRACTICE-CRUD',
    data: {
      products,
    },
  })
})

// вище на фото ви можете побачити дизайн інтерфейсу для container/product-list, в якому потрібно реалізувати список товарів

// в ендпоїнті вам потрібно отримати актуальний список товарів, прокинути в container дані cписку товарів та вивести їх в container/product-list

// карточку товару потрібно винести в окремий компонент з назвою product-card

// посилання Редагувати повинно вести на сторінку редагування товару та передавати в посилання ідентифікатор товару. PATH: /product-edit?id=<ідентифікатор товару>

//! Потрібно створити GET endpoint з PATH /product-edit який приймає query параметр з назвою id в посиланні та повертає container/product-edit з даними товару

router.get('/product-edit', function (req, res) {
  const { id } = req.query
  const product = Product.getById(Number(id))
  if (!product) {
    res.render('alert', {
      style: 'alert',
      message: '🆘 Product with that ID was not found!',
      added: false,
    })
  } else {
    res.render('product-edit', {
      style: 'product-edit',
      title: 'JS-PRACTICE-CRUD',
      data: {
        product,
      },
    })
  }
})

// вище на фото ви можете побачити дизайн інтерфейсу для container/product-edit, в якому потрібно реалізувати форму редагування даних товару

// в ендпоїнті вам потрібно:
// - отримати з req.query властивість id
// - за допомогою id вам потрібно отримати об’єкт сутності product з таким id
// - прокинути дані отриманого товару в container
// - вивести дані товару в полях форми в container/product-edit.
// - якщо при пошуку product по id не було знайдено такого товару, то потрібно відобразити container/alert з інформацією "Товар з таким ID не знайдено"

//! Потрібно створити endpoint POST з PATH /product-edit який отримує в req.body дані для оновлення product

router.post('/product-edit', function (req, res) {
  const { id, name, price, description } = req.body
  const product = Product.getById(Number(id))

  if (!product) {
    res.render('alert', {
      style: 'alert',
      message: '🆘 Product with that ID was not found!',
    })
  } else {
    const isChanged =
      name !== product.name ||
      price !== product.price ||
      description !== product.description

    if (!isChanged) {
      return res.render('alert', {
        style: 'alert',
        message: '⚠️ Make changes to at least one field',
        id,
        isCheck: true,
      })
    }

    product.name = name
    product.price = price
    product.description = description
    res.render('alert', {
      style: 'alert',
      message: '✅ Success! Product updated!',
      added: true,
    })
  }
})

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно вказати атрибут method: POST, action: /product-edit

// при натисканні на кнопку "Зберегти оновлення" потрібно відправляти POST запит на ендпоїнт /product-edit

// в ендпоїнті /product-edit потрібно:
// - через req.body отримати оновлені дані товару (name, price, description) та id товару
// - за допомогою id товару оновити дані в товарі (name, price, description)
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

//! Потрібно створити GET endpoint з PATH /product-delete який приймає query параметр з назвою id в посилані

router.get('/product-delete', function (req, res) {
  const { id } = req.query
  const product = Product.getById(Number(id))

  if (!product) {
    res.render('alert', {
      style: 'alert',
      message: '🆘 Product with that ID was not found!',
      added: false,
    })
  } else {
    res.render('product-delete', {
      style: 'product-delete',
      title: 'JS-PRACTICE-CRUD',
      data: {
        product,
      },
    })
  }
})

// вище на фото ви можете побачити форму редагування даних товару з container/product-edit, в якій потрібно:
// - зробити кнопку-посилання "Видалити товар"
// - яке буде вести на сторінку-ендпоїнт видалення товару
// - та передавати в посилання ідентифікатор товару.
// - PATH: /product-edit?id=<ідентифікатор товару>

// в ендпоїнті /product-delete потрібно:
// - через req.query отримати id товару
// - за допомогою id товару видалити товар
// - після успішного або неуспішного виконання операції потрібно відобразити container/alert з інформацією про результат виконання операції

// POST endpoint to handle product deletion
router.post('/product-delete', function (req, res) {
  const { id } = req.body
  const product = Product.getById(Number(id))

  if (!product) {
    res.render('alert', {
      style: 'alert',
      message: '🆘 Product with that ID was not found!',
    })
  } else {
    const deleted = Product.deleteById(Number(id))
    if (deleted) {
      res.render('alert', {
        style: 'alert',
        message: '⛔ Product deleted!',
        added: true,
      })
    } else {
      res.render('alert', {
        style: 'alert',
        message: '🆘 Could not delete the product',
      })
    }
  }
})
// ===========================================================================

//! ========================PURCHASE========================================
//! ========================PURCHASE========================================
class PurchaseProduct {
  static #list = []

  constructor(
    img,
    title,
    description,
    category,
    price,
    amount = 0,
  ) {
    ;(this.id = Math.floor(Math.random() * 90000) + 10000),
      (this.img = img),
      (this.title = title),
      (this.description = description),
      (this.category = category),
      (this.price = price),
      (this.amount = amount)
  }

  static removeFormatting = (priceStr) =>
    priceStr.replace(/[\s,]/g, '')

  static add = (...data) => {
    this.#list.push(new PurchaseProduct(...data))
  }

  static getList = () => this.#list

  static getById = (id) =>
    this.#list.find((purchase) => purchase.id === id)

  static getRandomList = (id) => {
    // Фільтруємо товари, щоб вилучити той, з яким порівнюємо id
    const filteredList = this.#list.filter(
      (purchase) => purchase.id !== id,
    )

    // Відсортуємо за допомогою Math.random() та перемішаємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    // Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.slice(0, 4)
  }
}

PurchaseProduct.add(
  '/img/img-purchase/img616.jpg',
  'Computer Artline Gaming (X43v31) AMD Ryzen 5 3600/',
  'AMD Ryzen 5 3600 (3.6 - 4.2 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 480 ГБ / nVidia GeForce RTX 3050, 8 ГБ / без ОД / LAN / без ОС',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'top sales',
      color: 'blue',
      isBadge: true,
    },
  ],
  '27 000',
  12,
)

PurchaseProduct.add(
  '/img/img-purchase/img617.jpg',
  'Computer COBRA Advanced (I11F.8.H1S2.15T.13356) Intel',
  'Intel Core i3-10100F (3.6 - 4.3 ГГц) / RAM 8 ГБ / HDD 1 ТБ + SSD 240 ГБ / GeForce GTX 1050 Ti, 4 ГБ / без ОД / LAN / Linux',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'top sales',
      color: 'blue',
      isBadge: true,
    },
  ],
  '17 000',
  14,
)

PurchaseProduct.add(
  '/img/img-purchase/img618.jpg',
  'Computer ARTLINE Gaming by ASUS TUF v119 (TUFv119)',
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4070 Ti, 12 ГБ / без ОД / LAN / Wi-Fi',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'top sales',
      color: 'blue',
      isBadge: false,
    },
  ],
  '113 109',
  6,
)

PurchaseProduct.add(
  '/img/img-purchase/img619.jpg',
  'Computer ARTLINE Gaming X66 v37 (X66v37) AMD Ryzen 5 5500/',
  'AMD Ryzen 5 5500 (3.6 - 4.2 ГГц) / RAM 16 ГБ / SSD 1 TБ / nVIdia GeForce RTX 3060 Ti, 8 ГБ / без ОД / LAN / без ОС',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'novelty',
      color: 'purple',
      isBadge: true,
    },
  ],
  '32 499',
  8,
)

PurchaseProduct.add(
  '/img/img-purchase/img620.jpg',
  'Computer ARTLINE Gaming X77 v39 (X77v39) Intel Core i7-10700F',
  'Intel Core i7-10700F (2.9 — 4.8 ГГц) / RAM 32 ГБ / SSD 1 ТБ / nVidia GeForce RTX 3070, 8 ГБ / без ОД / LAN / без ОС',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: false,
    },
    {
      id: 2,
      text: 'novelty',
      color: 'purple',
      isBadge: true,
    },
  ],
  '36 999',
  10,
)

PurchaseProduct.add(
  '/img/img-purchase/img621.jpg',
  'Computer COBRA Advanced (A36.16.S4.165.6130) AMD Ryzen',
  'AMD Ryzen 5 3600 (3.6 — 4.2 ГГц) / RAM 16 ГБ / SSD 480 ГБ / nVidia GeForce GTX 1650, 4 ГБ / без ОД / LAN / Linux',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'top sales',
      color: 'blue',
      isBadge: true,
    },
  ],
  '18 499',
  15,
)

PurchaseProduct.add(
  '/img/img-purchase/img622.jpg',
  'Computer QUBE Gaming Intel Core i5-10400F / RAM 1 ГБ / HDD 1ТБ',
  'Intel Core i5-10400F (2.9 — 4.3 ГГц) / RAM 16 ГБ / HDD 1 ТБ + SSD 240 ГБ / nVidia GeForce RTX 3060, 12 ГБ / без ОД / LAN / без ОС',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'novelty',
      color: 'purple',
      isBadge: false,
    },
  ],
  '28 999',
  7,
)

PurchaseProduct.add(
  '/img/img-purchase/img623.jpg',
  'Computer ARTLINE Overlord X99 (X99v68)',
  'Intel Core i9-13900KF (3.0 - 5.8 ГГц) / RAM 64 ГБ / SSD 2 ТБ (2 x 1 ТБ) / nVidia GeForce RTX 4090, 24 ГБ / без ОД / LAN / Wi-Fi',
  [
    {
      id: 1,
      text: 'ready to ship',
      color: 'green',
      isBadge: true,
    },
    {
      id: 2,
      text: 'novelty',
      color: 'purple',
      isBadge: true,
    },
  ],
  '175 999',
  5,
)

class Purchase {
  static DELIVERY_PRICE = 150
  // #BONUS_FACTOR - відповідає за відсоток нарахування бонусів за ціну замовлення
  static #BONUS_FACTOR = 0.1

  static #list = []

  // словник в якому в форматі "ключ: значення" буде іти пошта та бонусний баланс по цій пошті
  static #bonusAccount = new Map()

  // витаскує баланс бонуса а якщо не знаходить то повертає 0
  static getBonusBalance = (email) => {
    return Purchase.#bonusAccount.get(email) || 0
  }

  static calcBonusAmount = (value) => {
    return value * Purchase.#BONUS_FACTOR
  }

  static updateBonusBalance = (
    email,
    price,
    bonusUse = 0,
  ) => {
    // кількість нових бонусів
    const amount = this.calcBonusAmount(price)

    //поточний баланс який ми витягуєм через - getBonusBalance
    const currentBalance = Purchase.getBonusBalance(email)

    const updatedBalance =
      currentBalance + amount - bonusUse

    Purchase.#bonusAccount.set(email, updatedBalance)

    console.log(email, updatedBalance)

    return amount
  }

  constructor(data, product) {
    this.id = Math.floor(Math.random() * 90000) + 10000

    // обовязкові дані
    this.firstname = data.firstname
    this.lastname = data.lastname
    this.phone = data.phone
    this.email = data.email

    // необовязкові дані
    this.comment = data.comment || null
    this.promocode = data.promocode || null

    // технічні поля
    this.totalPrice = data.totalPrice
    this.bonus = Math.floor(
      Purchase.calcBonusAmount(this.totalPrice),
    )
    this.productPrice = data.productPrice
    this.deliveryPrice = data.deliveryPrice
    this.amount = data.amount

    this.product = product
  }

  static add = (...arg) => {
    const newPurchase = new Purchase(...arg)

    this.#list.push(newPurchase)

    return newPurchase
  }

  // щоб спочатку виводились останні покупки
  static getList = () => {
    return Purchase.#list.reverse()
  }

  static getById = (id) => {
    return Purchase.#list.find((item) => item.id === id)
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (product) => product.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const purchase = Purchase.getById(id)

    if (purchase) {
      if (data.firstname)
        purchase.firstname = data.firstname
      if (data.lastname) purchase.lastname = data.lastname
      if (data.phone) purchase.phone = data.phone
      if (data.email) purchase.email = data.email

      purchase.bonus = Math.round(
        Purchase.calcBonusAmount(purchase.totalPrice),
      )

      return true
    } else {
      return false
    }
  }
}

class Promocode {
  static #list = []

  constructor(name, factor) {
    this.name = name
    // фактор - множник на який буде множитись ціна, щоб порахувати ціну з урахуванням знижки від промокоду
    this.factor = factor
  }

  static add = (name, factor) => {
    const newPromocode = new Promocode(name, factor)
    Promocode.#list.push(newPromocode)
    return newPromocode
  }

  // шукає промокод по назві
  static getByName = (name) => {
    return this.#list.find((promo) => promo.name === name)
  }

  static calc = (promo, price) => {
    return price * promo.factor
  }
}

Promocode.add('BLACKFRIDAY', 0.9)
Promocode.add('NEWYEAR', 0.5)
Promocode.add('CHRISTMAS', 0.85)

// ===========================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-product', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-product', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-product',

    data: {
      list: PurchaseProduct.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

//================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-card-preview', function (req, res) {
  const id = Number(req.query.id)

  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-card-preview', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-card-preview',

    data: {
      list: PurchaseProduct.getRandomList(id),
      product: PurchaseProduct.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===========================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-basket', function (req, res) {
  const id = Number(req.query.id)
  const amount = Number(req.body.amount)

  console.log(amount)

  if (amount < 1) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '⚠️ Enter the correct quantity',
        link: `/purchase-card-preview?id=${id}`,
      },
    })
  }

  const product = PurchaseProduct.getById(id)

  if (amount > product.amount) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '⚠️ This quantity is not available',
        att:
          'Now ' + product.amount + ' pieces are available',
        link: `/purchase-card-preview?id=${id}`,
      },
    })
  }

  const formatPrice = PurchaseProduct.removeFormatting(
    product.price,
  )
  const numericPrice = parseInt(
    PurchaseProduct.removeFormatting(formatPrice),
    10,
  )

  const productPrice = numericPrice * amount
  const totalPrice = productPrice + Purchase.DELIVERY_PRICE
  const bonus = Math.floor(
    Purchase.calcBonusAmount(totalPrice),
  )

  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-basket', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-basket',

    data: {
      id: product.id,

      info: {
        productTitle: product.title,
        quantity: amount,
        productPrice: productPrice,
        deliveryPrice: Purchase.DELIVERY_PRICE,
      },
      totalPrice,
      productPrice,
      deliveryPrice: Purchase.DELIVERY_PRICE,
      amount,
      bonus,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===========================================================================
// ↙️ тут вводимо шлях (PATH) до сторінки
router.post('/purchase-submit', function (req, res) {
  const id = Number(req.query.id)

  let {
    totalPrice,
    productPrice,
    deliveryPrice,
    amount,

    firstname,
    lastname,
    email,
    phone,

    comment,
    promocode,
    bonus,
  } = req.body

  const product = PurchaseProduct.getById(id)

  if (!product) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '🆘 Product with that ID was not found!',
        link: `/purchase-card-preview?id=${id}`,
      },
    })
  }

  totalPrice = Number(totalPrice)
  productPrice = Number(productPrice)
  deliveryPrice = Number(deliveryPrice)
  amount = Number(amount)
  bonus = Number(bonus)

  if (
    isNaN(totalPrice) ||
    isNaN(productPrice) ||
    isNaN(deliveryPrice) ||
    isNaN(amount)
  ) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '🆘 Invalid data entered!',
        link: `/purchase-card-preview?id=${id}`,
      },
    })
  }

  if (bonus < 0) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '🆘 Invalid data entered!',
        link: `/purchase-card-preview?id=${id}`,
      },
    })
  }

  if (!firstname || !lastname || !email || !phone) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '🆘 Error!',
        message: '⚠️ Please fill in the required fields',
        link: `/purchase-basket?id=${id}`,
      },
    })
  }

  // bonus || bonus > 0 - бонус є і він больше 0, щоб не було що користувач відємний бонус пише
  if (bonus || bonus > 0) {
    const bonusAmount = Purchase.getBonusBalance(email)

    console.log(bonusAmount)

    if (bonus > bonusAmount) {
      bonus = bonusAmount
    }

    Purchase.updateBonusBalance(email, totalPrice, bonus)

    totalPrice -= bonus
  } else {
    Purchase.updateBonusBalance(email, totalPrice, 0)
  }

  if (promocode) {
    promocode = Promocode.getByName(promocode)

    if (promocode) {
      totalPrice = Promocode.calc(promocode, totalPrice)
    }
  }

  if (totalPrice < 0) totalPrice = 0

  // створюємо нове замовлення...
  const purchase = Purchase.add(
    {
      totalPrice,
      productPrice,
      deliveryPrice,
      amount,

      firstname,
      lastname,
      email,
      phone,

      promocode,
      comment,
      bonus,
    },
    product,
  )

  console.log(purchase)
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('alert-purchase-submit', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'alert-purchase-submit',

    data: {
      info: '✅ Success!',
      message: '✅ The order was created!',
      link: `/purchase-list`,
    },
  })

  // ↑↑ сюди вводимо JSON дані
})

// ===========================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-list', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-list', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-list',

    data: {
      list: Purchase.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ===========================================================================
router.delete('/purchase-delete', function (req, res) {
  const { id } = req.query
  const success = Purchase.deleteById(Number(id))

  res.json({ success })
})

// ===========================================================================

router.get('/get-cart-count', function (req, res) {
  // Отримайте список товарів у корзині з класу Purchase
  const cartItems = Purchase.getList()

  // Обчисліть загальну кількість товарів у корзині
  const cartCount = cartItems.reduce(
    (total, item) => total + item.amount,
    0,
  )

  res.json({ cartCount })
})

// =============================================================================

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/purchase-info', function (req, res) {
  const id = Number(req.query.id)

  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-info', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-info',

    data: {
      list: Purchase.getById(id),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// =============================================================================

router.get('/purchase-edit', function (req, res) {
  const id = Number(req.query.id)

  res.render('purchase-edit', {
    style: 'purchase-edit',
    data: {
      purchase: Purchase.getById(id),
    },
  })
})

// =============================================================================

router.post('/purchase-update', function (req, res) {
  const { firstname, lastname, phone, email } = req.body
  const id = Number(req.query.id)

  const purchase = Purchase.getById(id)

  const isChanged =
    firstname !== purchase.firstname ||
    lastname !== purchase.lastname ||
    phone !== purchase.phone ||
    email !== purchase.email

  if (!isChanged) {
    return res.render('alert-purchase', {
      style: 'alert-purchase',

      data: {
        info: '⚠️ Warning!',
        message: '⚠️ Make changes to at least one field',
        link: `/purchase-edit?id=${id}`,
      },
    })
  }

  Purchase.updateById(id, {
    firstname,
    lastname,
    phone,
    email,
  })

  res.render('alert-purchase', {
    style: 'alert-purchase',

    data: {
      info: '✅ Success!',
      message: '✅ Purchase details updated',
      link: `/purchase-info?id=${id}`,
    },
  })
})

// =============================================================================

//! ================================SPOTIFY=============================================
//! ================================SPOTIFY=============================================

class TrackSpotify {
  static #list = []

  constructor(link) {
    this.id = Math.floor(Math.random() * 90000) + 10000
    this.link = link
  }

  static addTrack(track) {
    TrackSpotify.#list.push(track)
  }

  static getRandomTrack() {
    const randomIndex = Math.floor(
      Math.random() * TrackSpotify.#list.length,
    )
    return TrackSpotify.#list[randomIndex]
  }

  static getList() {
    return TrackSpotify.#list
  }
}

const track1 = new TrackSpotify(
  '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7MnPqlRg4XPv9cqHF76tbs?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
)
const track2 = new TrackSpotify(
  '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/51HCQFTlKHs7w9Fxo9QcjA?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
)
const track3 = new TrackSpotify(
  '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/7fvQ3kv9pCOkFyGdON4k6H?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
)
const track4 = new TrackSpotify(
  '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/539yxbKKHPHrI1vc3BI2Ee?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>',
)

TrackSpotify.addTrack(track1)
TrackSpotify.addTrack(track2)
TrackSpotify.addTrack(track3)
TrackSpotify.addTrack(track4)

class Track {
  // статичне приватне поле для зберігання списку обьектів Track
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 90000)
    this.name = name
    this.author = author
    this.image = image
  }

  //статичний метод для створення обьекту Track і додавання його в список #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  //статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }

  static getById(id) {
    return (
      Track.#list.find((track) => track.id === id) || null
    )
  }
}

Track.create(
  'Close to Me',
  'Max Oazo',
  '/img/spotify/close-to-me.jpg',
)

Track.create('Sadness', 'Skybar', '/img/spotify/deep.jpg')

Track.create(
  'Essense',
  'Shimmer Johnson',
  '/img/spotify/essense.jpg',
)

Track.create(
  'Never Gonna Say Goodbye',
  'Max Oazo',
  '/img/spotify/oazo.jpg',
)

Track.create(
  'Another Dream',
  'Furkan Sert',
  '/img/spotify/ricodisko.jpg',
)

Track.create(
  'Yoy Are My Soul',
  'Ahmet Kilic',
  '/img/spotify/you-my-soul.jpg',
)

Track.create('Anagramma', 'ZOYA', '/img/spotify/zoya.jpg')

class PlayList {
  static #list = []

  constructor(name, image, amount) {
    this.id = Math.floor(1000 + Math.random() * 90000)
    this.name = name
    this.image = image
    this.amount = amount
    // сам список треків які додані до PlayList
    this.tracks = []
  }

  static create(name, image, amount) {
    const newPlayList = new PlayList(name, image, amount)
    this.#list.unshift(newPlayList)
    return newPlayList
  }

  // отримання всього списку плейлистів
  static getList() {
    // return this.#list.reverse()
    return [...this.#list]
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    playlist.tracks.push(...randomTracks)
  }

  static getById(id) {
    return (
      PlayList.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }
  
  updateAmount() {
    this.amount = this.tracks.length
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
    this.updateAmount()
  }

  addTrack(track) {
    this.tracks.unshift(track)
    this.updateAmount()
  }

  static randomImage() {
    const imagesPlaylist = [
      '/img/spotify/close-to-me.jpg',
      '/img/spotify/deep.jpg',
      '/img/spotify/oazo.jpg',
      '/img/spotify-img/list-img1.jpg',
      '/img/spotify-img/list-img5.jpg',
    ]

    const randomImage =
      imagesPlaylist[
        Math.floor(Math.random() * imagesPlaylist.length)
      ]
    return randomImage
  }

  static findListByValue(name) {
    return this.#list.filter((playlist) =>
      playlist.name
        .toLowerCase()
        .includes(name.toLowerCase()),
    )
  }
}

PlayList.create(
  'Songs I liked',
  '/img/spotify-img/list-img3.jpg',
  3,
)
PlayList.create(
  'The joint album',
  '/img/spotify-img/list-img5.jpg',
  9,
)
PlayList.create(
  'Yin Yang',
  '/img/spotify-img/list-img8.jpg',
  5,
)
PlayList.create(
  'Songs I liked',
  '/img/spotify-img/list-img1.jpg',
  3,
)
PlayList.create(
  'The joint album',
  '/img/spotify-img/list-img4.jpg',
  9,
)
PlayList.create(
  'Yin Yang',
  '/img/spotify-img/list-img2.jpg',
  5,
)

// ============================================================

router.get('/spotify-list', function (req, res) {
  res.render('spotify-list', {
    style: 'spotify-list',
    title: 'JS-PRACTICE-CRUD',

    data: {
      list: PlayList.getList(),
    },
  })
})

// ==========================================

router.get('/spotify-choose', function (req, res) {
  res.render('spotify-choose', {
    style: 'spotify-choose',
    title: 'JS-PRACTICE-CRUD',

    data: {
      list: TrackSpotify.getList(),
    },
  })
})

// ==========================================

router.get('/spotify-create', function (req, res) {
  //якщо в мене є isMix
  const isMix = !!req.query.isMix

  res.render('spotify-create', {
    style: 'spotify-create',
    title: 'JS-PRACTICE-CRUD',

    data: {
      isMix,
    },
  })
})

// ==============================================

router.post('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  const name = req.body.name

  if (!name) {
    return res.render('alert-spotify', {
      style: 'alert-spotify',

      data: {
        info: 'Warning!',
        message: 'Please enter the name in the field!',
        link: isMix
          ? `/spotify-create?isMix=true`
          : `/spotify-create`,
      },
    })
  }

  const randomImage = PlayList.randomImage()
  const amount = isMix ? 3 : 0
  const playlist = PlayList.create(name, randomImage, amount)

  if (isMix) {
    PlayList.makeMix(playlist)
  }

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
      image: playlist.image,
    },
  })
})

// ============================

router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)

  const playlist = PlayList.getById(id)

  if (!playlist) {
    return res.render('alert-spotify', {
      style: 'alert-spotify',

      data: {
        info: 'Error!',
        message: 'Playlist with that ID was not found!',
        link: `/spotify-choose`,
      },
    })
  }

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// ==============================

router.get('/spotify-track-delete', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = PlayList.getById(playlistId)

  if (!playlist) {
    return res.render('alert-spotify', {
      style: 'alert-spotify',

      data: {
        info: 'Error!',
        message: 'Playlist with that ID was not found!',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  playlist.deleteTrackById(trackId)

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// ==============================

router.get('/spotify-playlist-add', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = PlayList.getById(playlistId)

  if (!playlist) {
    return res.render('alert-spotify', {
      style: 'alert-spotify',

      data: {
        info: 'Error!',
        message: 'Playlist with that ID was not found!',
        link: `/spotify-choose`,
      },
    })
  }

  res.render('spotify-playlist-add', {
    style: 'spotify-playlist-add',

    data: {
      playlistId: playlist.id,
      tracks: Track.getList(),
      name: playlist.name,
    },
  })
})

// ===============================

router.get('/spotify-track-add', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = PlayList.getById(playlistId)

  if (!playlist) {
    return res.render('alert-spotify', {
      style: 'alert-spotify',

      data: {
        info: 'Error!',
        message: 'Playlist with that ID was not found!',
        link: `/spotify-playlist?id=${playlistId}`,
      },
    })
  }

  playlist.addTrack(Track.getById(trackId))

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// =====================================

router.get('/spotify-search', function (req, res) {
  //по замовчуванню пустий рядок
  const value = ''

  const list = PlayList.findListByValue(value)

  res.render('spotify-search', {
    style: 'spotify-search',
    title: 'JS-PRACTICE-CRUD',

    data: {
      // кількість пісень....роблю за допомогою map
      // таким чином в list мені попадає новий масив який має всі поля окрім tracks і має amount який мені потрібно ось тут вивести...
      // list: list.map(({ tracks, ...rest }) => ({
      //   ...rest,
      //   amount: tracks.length,
      // })),
      // value,

      list: PlayList.getList(),
    },
  })
})

// ==========================================

router.post('/spotify-search', function (req, res) {
  //витягуються дані з value
  const value = req.body.value || ''

  // отримується список плейлистів по цьому value
  const list = PlayList.findListByValue(value)

  // і назад точно така ж сторінка повертається
  res.render('spotify-search', {
    style: 'spotify-search',
    title: 'JS-PRACTICE-CRUD',

    data: {
      list: list,
      value: value,
    },
  })
})

// ==========================================

// Підключаємо роутер до бек-енду
module.exports = router
