import './style.css'
import Handlebars from "handlebars";
import * as Components from './components';
import * as Pages from './pages';


const chatList = {
    chatItem: [
        {
            name: "Иван",
            message: "Привет, как дела?",
            messageCount: 6,
            time: '10:25'
        },
        {
            name: "Иван",
            message: "Привет, как дела?",
            active: true,
        },
        {
            name: "Иван",
            message: "Привет, как дела?"
        },
        {
            name: "Иван",
            message: "Привет, как дела?"
        },
        {
            name: "Иван",
            message: "Привет, как дела?"
        },
    ]
}


Object.entries(Components).forEach(([name, comp]) => Handlebars.registerPartial(name, comp));

document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.ErrorPage)({ errNo: 500, message: 'Мы уже фиксим' });
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.ErrorPage)({ errNo: 404, message: 'Не туда попали' });
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.Registration)({});
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.Login)({});
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.Profile)({});
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.EditProfile)({});
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.EditPassword)({});
document.querySelector<HTMLDivElement>('#app')!.innerHTML = Handlebars.compile(Pages.ChatListPage)(chatList);