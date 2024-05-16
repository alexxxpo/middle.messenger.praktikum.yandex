import { BackButton, Button, Input, PField, PImage, Popup } from '../../components/index.ts'
import { type PFieldProps } from '../../components/PField/PField.ts'
import { type PopupProps } from '../../components/Popup/Popup.ts'
import { Block } from '../../core/index.ts'
import Router from '../../core/Router.ts'
import { logout, me } from '../../services/Auth.service.ts'
import { changeAvatar, changePassword, changeUserData } from '../../services/Users.service.ts'
import { UserResponse, UserUpdateRequest } from '../../types/types.ts'
import { connect, MapStateToProps } from '../../utils/connect.ts'
import { getModel } from '../../utils/LogFormFields/index.ts'
import { InputValidation, conditions } from '../../utils/validations/index.ts'
import img from '../../assets/images/Union.png'

interface ProfileProps {
	popupProps: PopupProps;
	fieldsProps: PFieldProps[];
	editPassword: boolean;
	editData: boolean;
	currentUser: UserResponse | null;
	isLoading: boolean;
	showPopup: boolean;
}

const router = Router

class Profile extends Block<ProfileProps> {
	constructor(props: ProfileProps) {
		super({
			...props,
			editPassword: false,
			editData: false
		})
	}

	componentDidUpdate(oldProps: ProfileProps, newProps: ProfileProps): boolean {
		if (oldProps !== newProps) {
			this.children.email.setProps({ value: newProps.currentUser?.email })
			this.children.login.setProps({ value: newProps.currentUser?.login })
			this.children.firstName.setProps({ value: newProps.currentUser?.first_name })
			this.children.secondName.setProps({ value: newProps.currentUser?.second_name })
			this.children.phone.setProps({ value: newProps.currentUser?.phone })
			this.children.displayName.setProps({ value: newProps.currentUser?.display_name })
			this.children.pImage.setProps({
				avatar: this.props.currentUser?.avatar === null ?
					img :
					'https://ya-praktikum.tech/api/v2/resources/' + this.props.currentUser?.avatar
			})
			return true
		}
		return false
	}

	init(): void {
		const getUserInfo = async () => {
			if (this.props.currentUser === null) await me() // Если нет данных о пользователе, то делаем запрос
		}
		getUserInfo()

		// Handlers
		const onChangeDataBind = this.onChangeData.bind(this)
		const onSaveDataBind = this.onSaveData.bind(this)
		const onChangePasswordBind = this.onChangePassword.bind(this)
		const onImageChangeBind = this.onImageChange.bind(this)
		const onChangeInput = InputValidation.bind(this)
		const onSaveImageBind = this.onSaveImage.bind(this)
		const onClosePopupBind = this.onClosePopup.bind(this)

		// Children profile
		const email = new PField({
			label: 'Почта',
			type: 'text',
			value: this.props.currentUser?.email || '',
			disabled: true,
			name: 'email',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.email as Input, 'Некорректный формат email', ...conditions.email)
					}
				]
			}
		})
		const login = new PField({
			label: 'Логин',
			type: 'text',
			value: this.props.currentUser?.login || '',
			disabled: true,
			name: 'login',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.login as Input, 'Может содеражать цифры, но не состоять из них', ...conditions.login)
					}
				]
			}
		})
		const firstName = new PField({
			label: 'Имя',
			type: 'text',
			value: this.props.currentUser?.first_name || '',
			disabled: true,
			name: 'first_name',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.firstName as Input, 'Имя должно начинаться с заглавной буквы', ...conditions.names)
					}
				]
			}
		})
		const secondName = new PField({
			label: 'Фамилия',
			type: 'text',
			value: this.props.currentUser?.second_name || '',
			disabled: true,
			name: 'second_name',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.secondName, 'Фамилия должна начинаться с заглавной буквы', ...conditions.names)
					}
				]
			}
		})
		const displayName = new PField({
			label: 'Имя в чате',
			type: 'text',
			value: this.props.currentUser?.display_name || '',
			disabled: true,
			name: 'display_name',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.displayName, 'Имя должно начинаться с заглавной буквы', ...conditions.names)
					}
				]
			}
		})
		const phone = new PField({
			label: 'Телефон',
			type: 'text',
			value: this.props.currentUser?.phone || '',
			disabled: true,
			name: 'phone',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.phone as Input, 'Телефон может содержать только цифры и может начинаться с +', ...conditions.phone)
					}
				]
			}
		})

		// Children change password
		const oldPasword = new PField({
			label: 'Старый пароль',
			type: 'password',
			value: 'sdafadfa',
			name: 'old_password',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.oldPasword as Input, 'Пароль должен содержать строчные и заглавные буквы и цифры', ...conditions.password)
					}
				]
			}
		})
		const newPassword = new PField({
			label: 'Новый пароль',
			type: 'password',
			value: 'ivanivanov',
			name: 'new_password',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.newPassword as Input, 'Пароль должен содержать строчные и заглавные буквы и цифры', ...conditions.password)
					}
				]
			}
		})
		const newPasswordAgain = new PField({
			label: 'Повторите новый пароль',
			type: 'password',
			value: 'ivanivanov',
			name: 'new_password',
			events: {
				blur: [
					e => {
						onChangeInput(e, this.children.newPasswordAgain as Input, 'Пароль должен содержать строчные и заглавные буквы и цифры', ...conditions.password)
					}
				]
			}
		})

		// Childern buttons profile
		const buttonChangePassword = new Button({
			type: 'link',
			label: 'Изменить пароль',
			className: 'profilePage__Button',
			events: {
				click: [onChangePasswordBind]
			}
		})

		const buttonChangeData = new Button({
			type: 'link',
			label: 'Изменить данные',
			className: 'profilePage__Button',
			events: {
				click: [onChangeDataBind]
			}
		})

		const buttonExit = new Button({
			type: 'link',
			label: 'Выйти',
			className: 'profilePage__Button profilePage__exitButton',
			events: {
				click: [logout]
			}
		})

		// button save
		const buttonSaveData = new Button({
			type: 'primary',
			label: 'Сохранить',
			events: {
				click: [(e) => { changeUserData({ ...getModel(e) as UserUpdateRequest }) }, onSaveDataBind]
			}
		})

		const buttonSavePassword = new Button({
			type: 'primary',
			label: 'Сохранить',
			events: {
				click: [(e) => { 
					const model = getModel(e)
					changePassword({ oldPassword: model.old_password, newPassword: model.new_password })
				 }, onSaveDataBind]
			}
		})

		// common
		const backButton = new BackButton({
			events: {
				click: [() => { router.back() }]
			}
		})

		const pImage = new PImage({
			className: 'profilePage__PImage',
			events: {
				click: [onImageChangeBind]
			},
			avatar: this.props.currentUser?.avatar === null ? img : 'https://ya-praktikum.tech/api/v2/resources/' + this.props.currentUser?.avatar
		})

		const popup = new Popup({
			title: 'Загрузите файл',
			clickButton: onSaveImageBind,
			name: 'avatar',
			events: {
				click: [
					onClosePopupBind
				]
			}
		})

		this.children = {
			...this.children,
			email,
			login,
			firstName,
			secondName,
			phone,
			oldPasword,
			newPassword,
			newPasswordAgain,
			displayName,
			buttonChangePassword,
			buttonChangeData,
			buttonExit,
			buttonSaveData,
			buttonSavePassword,
			backButton,
			pImage,
			popup
		}
	}


	onChangeData(): void {
		const names = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone']
		Object.values(this.children).forEach(child => {
			if (names.includes(child.props.name as string)) {
				child.setProps({
					disabled: false
				})
			}
		})
		this.setProps({
			editData: true,
			editPassword: false
		})
	}

	onChangePassword(): void {
		const names = ['old_password', 'new_password', 'new_password_again']
		Object.values(this.children).forEach(child => {
			if (names.includes(child.props.name as string)) {
				child.setProps({
					disabled: false
				})
			}
		})
		this.setProps({
			editData: false,
			editPassword: true
		})
	}

	onSaveData(): void {
		const names = ['email', 'login', 'first_name', 'second_name', 'display_name', 'phone', 'old_password', 'new_password', 'new_password_again']
		Object.values(this.children).forEach(child => {
			if (names.includes(child.props.name as string)) {
				child.setProps({
					disabled: true
				})
			}
		})
		this.setProps({
			editData: false,
			editPassword: false
		})
	}

	onImageChange(): void {
		this.setProps({ showPopup: true })
	}

	onSaveImage(e: Event) {
		e.preventDefault()
		const target = e.target as HTMLButtonElement
		const form = target.form as HTMLFormElement
		this.setProps({ showPopup: false })
		changeAvatar(form)
	}

	onClosePopup(e: Event) {
		e.stopPropagation()
		console.log(e.target, this.children.popup.getElement());

		if (e.target === this.children.popup.getElement()) {
			this.setProps({ showPopup: false })
		}
	}

	render(): string {
		if (this.props.isLoading) return `
    		<div>Загрузка данных о пользователе...</div>
    	`

		return `
        <main class="page profilePage">        
            <div class="profilePage__userInfo">
                {{{ backButton }}}
        
                {{{pImage}}}

                <form>
                    <h2 class="profilePage__title">${this.props.currentUser?.display_name as string || 'Здесь будет отображаться Ваше имя'}</h2>   

                    ${this.props.editPassword === false
				? `<div class="profilePage__fields">
                      {{{ email }}}
                      {{{ login }}}
                      {{{ firstName }}}
                      {{{ secondName }}}
                      {{{ displayName }}}
                      {{{ phone }}}
                    </div>`
				: ''}

                    ${this.props.editPassword === true
				? `<div class="profilePage__fields">
                      {{{ oldPasword }}}
                      {{{ newPassword }}}
                      {{{ newPasswordAgain }}}
                    </div>`
				: ''}

                    ${this.props.editPassword === true
				? `<div class="profilePage__buttons">
                        <div class="pField profilePage__saveButtonField">
                            {{{buttonSavePassword}}}
                        </div>
                    </div>`
				: this.props.editData === true 
				? `<div class="profilePage__buttons">
						<div class="pField profilePage__saveButtonField">
							{{{buttonSaveData}}}
						</div>
					</div>`

				: `<div class="profilePage__buttons">
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangeData }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonChangePassword }}}
                        </div>
                        <div class="pField profilePage__buttonField">
                            {{{ buttonExit }}}
                        </div>
                    </div>`}
                </form>
                ${this.props.showPopup === true ? '{{{popup}}}' : ''}    
            </div>
        </main>
        `
	}
}

const mapStateToProps: MapStateToProps = ({ currentUser, isLoading }) => ({ currentUser, isLoading })

export default connect(mapStateToProps)(Profile)
