import Block from "../../core/Block";
import { EventsType } from "../../types";
import ErrorLine from "./ErrorLine";
import Input from "./Input";


interface InputElementProps {
    errorText?: string;
    events?: EventsType;
    label:string;
    name: string;
}

interface InputElementType extends InputElementProps {
    [input: string]: Input | ErrorLine | string | EventsType | undefined;    
}

class InputElement extends Block<InputElementType> {
    constructor(props: InputElementProps) {
        super({
            ...props,
            Input: new Input({
                events: {
                    blur: props.events?.blur ?? (() => {}) 
                }
            }),
            ErrorLine: new ErrorLine({
                errorText: props.errorText ?? ''
            })
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps) {
            return false;
        }

        this.children.ErrorLine.setProps(newProps);
        return true;
    }

    render(): string {
        return `
        <div class="input {{#if error}}input__error{{/if}}" >
            <label class="input__container">
                {{{ Input }}}
                <div class="input__label">{{label}}</div>
            </label>
            {{{ ErrorLine }}}
        </div>
    `
    }
}

export default InputElement;