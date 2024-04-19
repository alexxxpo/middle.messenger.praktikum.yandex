import Block from "../../core/Block";



export default class Registration extends Block {
    constructor(props) {
        super({
            ...props,
        })
    }
    render(): string {
        return`
        <div class="page registration_page">
            <div class="form__container">
        
                <form class="form form_registration">
                    <h1 class="form__title">Регистрация</h1>
        
                    <div class="form__inputs">
                        {{ Input label="Почта" type="email" name="email" }}
                        {{ Input label="Логин" type="text" name="login" }}
                        {{ Input label="Имя" type="text" name="first_name" }}
                        {{ Input label="Фамилия" type="text" name="second_name" }}
                        {{ Input label="Телефон" type="tel" name="phone" }}
                        {{ Input label="Пароль" type="password" name="password" }}
                        {{ Input label="Пароль ещё раз" type="password" name="password" }}
                    </div>
        
                    <div class="form__buttons">
                        {{ Button type="primary" label="Зарегистрироваться"}}
                        {{ Button type="link" label="Войти"}}
                    </div>
                </form>
            </div>
        </div>
        `
    }
}