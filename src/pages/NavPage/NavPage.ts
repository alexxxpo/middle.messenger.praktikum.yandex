import Block from "../../core/Block";



export default class NavPage extends Block<Record<string, unknown>> {
    constructor(props: Record<string, unknown>) {
        super({ ...props })
    }

    render(): string {
        return `
        <nav class="page navPage">
            <ul class="navList">
                <li class="navList__item"><a page="login">Логин</a></li>
                <li class="navList__item"><a page="registration">Регистрация</a></li>
                <li class="navList__item"><a page="chatlist">Список чатов</a></li>
                <li class="navList__item"><a page="profile">Профиль</a></li>
                <li class="navList__item"><a page="404">404</a></li>
                <li class="navList__item"><a page="500">500</a></li>
            </ul>
        </nav>
        `
    }
}