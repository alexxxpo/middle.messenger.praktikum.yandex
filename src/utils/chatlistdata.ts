export const chatList = {
  chatItems: [
    {
      name: 'Иван',
      message: 'Привет, как дела?',
      messageCount: 14,
      time: '10:25',
      my: true,
    },
    {
      name: 'Иван',
      message: 'Привет, как дела?',
      active: true
    },
    {
      name: 'Иван',
      message: 'Привет, как дела?'
    },
    {
      name: 'Иван',
      message: 'Привет, как дела?'
    },
    {
      name: 'Иван',
      message: 'Привет, как дела?'
    }
  ]
}

export const fields = [
  {
    label: 'Почта',
    type: 'text',
    value: 'pochta@yandex.ru',
    name: 'email'
  },
  {
    label: 'Логин',
    type: 'text',
    value: 'ivanivanov',
    name: 'login'
  },
  {
    label: 'Имя',
    type: 'text',
    value: 'Иван',
    name: 'first_name'
  },
  {
    label: 'Фамилия',
    type: 'text',
    value: 'Иванов',
    name: 'second_name'
  },
  {
    label: 'Имя в чате',
    type: 'text',
    value: 'Иван',
    name: 'display_name'
  },
  {
    label: 'Телефон',
    type: 'text',
    value: '+7(909)9673030',
    name: 'phone'
  }
]

export const profileFields = [
  { label: "Почта", type: "text", value: "pochta@yandex.ru", disabled: true, name: "email", },
  { label: "Логин", type: "text", value: "ivanivanov", disabled: true, name: "login", },
  { label: "Имя", type: "text", value: "Иван", disabled: true, name: "first_name", },
  { label: "Фамилия", type: "text", value: "Иванов", disabled: true, name: "second_name", },
  { label: "Имя в чате", type: "text", value: "Иван", disabled: true, name: "display_name", },
  { label: "Телефон", type: "text", value: "+7(909)9673030", disabled: true, name: "phone", },
]