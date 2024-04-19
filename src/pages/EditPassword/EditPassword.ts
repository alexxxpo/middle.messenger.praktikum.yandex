import Block from "../../core/Block";



export default class EditPassword extends Block {
    constructor(props) {
        super({
            ...props
        })
    }
    render(): string {
        return `
        <main class="page editProfilePage">
            <div class="profilePage__userInfo">
                {{ BackButton }}
        
                {{ PImage class="profilePage__PImage" }}
                <h2 class="profilePage__title">Иван</h2>
                {{ PField label="Старый пароль" type="password" value="sdafadfa" name="old_password" }}
                {{ PField label="Новый пароль" type="password" value="ivanivanov" name="new_password" }}
                {{ PField label="Повторите новый пароль" type="password" value="ivanivanov" name="new_password" }}
            </div>
            <div class="editProfilePage__buttons">
                <div class="pField editProfilePage__buttonField">
                    {{ Button type="primary" label="Сохранить" }}
                </div>
            </div>
        </main>
        `
    }
}