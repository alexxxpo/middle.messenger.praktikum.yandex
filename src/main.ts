import './style.css'
import Handlebars from "handlebars";
import * as Components from './components';
import * as Pages from './pages';
import chatList from './utils/chatListData'

const pages = {
    'login': [Pages.Login],
    'registration': [Pages.Registration],
    'chatlist': [Pages.ChatListPage, chatList],
    'editpassword': [Pages.EditPassword],
    'edit': [Pages.EditProfile],
    'edit_popup': [Pages.EditProfile, {popup: true}],
    'profile': [Pages.Profile],
    '404': [Pages.ErrorPage, { errNo: 404, message: 'Не туда попали' }],
    '500': [Pages.ErrorPage, { errNo: 500, message: 'Мы уже фиксим' }],
    'nav': [Pages.NavPage]
};

Object.entries(Components).forEach(([name, comp]) => Handlebars.registerPartial(name, comp));

function navigate(page: string) {
    //@ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
    //@ts-ignore
    const page = e.target.getAttribute('page');
    if (page) {
        navigate(page);

        e.preventDefault();
        // e.stopImmediatePropagation();
    }
});
