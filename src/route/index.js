// Підключаємо технологію express для back-end сервера
const express = require('express')
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
    title: 'JS-PRACTICE',
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
    title: 'USER-CRUD',

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
        new Product('Apple iPhone 14 Pro Max', 800, "Екран (6.7\", OLED (Super Retina XDR), 2796x1290) / Apple A16 Bionic / основна квадро-камера: 48 Мп + 12 Мп + 12 Мп ..."),
        new Product('Apple MacBook Pro 16" M2', 930, "Екран 16.2\" Liquid Retina XDR (3456x2234) 120 Гц, глянсовий / Apple M2 Pro / RAM 16 ГБ / SSD 512 ГБ / Apple M2 Pro Graphics ..."),
        new Product('Apple MacBook Air 15.3', 1000, "Екран (з 15-дюймів, тип екрану) / Процесор (тип процесора) / ОЗП (тип і кількість пам'яті) / Накопичувач ..."),
      )

      this.initialized = true
    }
  }

  static getList() {
    return this.#list
  }

  static add(product) {
    this.#list.push(product)
  }

  static getById(id) {
    return this.#list.find((product) => product.id === id)
  }

  static updateById(id, data) {
    const product = this.getById(id)
    if (product) {
      Object.assign(product, data)
      return true
    } else {
      return false
    }
  }

  static deleteById(id) {
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
  if(!Product.initialized) {
    Product.init();
  }

  const products = Product.getList()

  res.render('product-list', {
    style: 'product-list',
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
  const { id, name, price, description } = req.body;
  const product = Product.getById(Number(id));

  if (!product) {
    res.render('alert', {
      style: 'alert',
      message: '🆘 Product with that ID was not found!',
    });
  } else {
    const isChanged = name !== product.name || price !== product.price || description !== product.description;

    if (!isChanged) {
      return res.render('alert', {
        style: 'alert',
        message: '⚠️ Make changes to at least one field',
        id,
        isCheck: true,
      });
    }

    product.name = name;
    product.price = price;
    product.description = description;
    res.render('alert', {
      style: 'alert',
      message: '✅ Success! Product updated!',
      added: true,
    });
  }
});

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

// Підключаємо роутер до бек-енду
module.exports = router
