import { ErrorComp } from "../../components";
import Block from "../../core/Block";



export default class ErrorPage extends Block {
    constructor(props) {
        super({
            ...props,
            errorComp: new ErrorComp(props)
        })
    }
    render(): string {
        return `
        <div class="page errorPage">
            <div class="errorPage__errorComp">
                {{{ errorComp }}}
            </div>
        </div>   
        `
    }
}