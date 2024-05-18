import './style.scss'
import Handlebars from 'handlebars'
import * as Components from './components/index.ts'
import * as Pages from './pages/index.ts'
import Router from './core/Router.ts'

export const Routes = {
    Login: '/',
    Registration: '/sign-up',
    Profile: '/settings',
    Chats: '/messenger',
    Error: '*'
}


Object.entries(Components).forEach(([name, comp]) => { Handlebars.registerPartial(name, comp.toString()) })

const router = Router

router.use(Routes.Login, Pages.Login)
    .use(Routes.Registration, Pages.Registration)
    .use(Routes.Profile, Pages.Profile)
    .use(Routes.Chats, Pages.ChatListPage)
    .use(Routes.Error, Pages.ErrorPage)
    .start()
