import Block from '../../core/Block';
import { type EventsPropsType } from '../../types'

interface InputPropsType {
    events?: EventsPropsType;
    label?: string;
    error?: string;
    errorText?: string;
    name: string;
    type?: string;
}

export default class Input extends Block {
    constructor(props: InputPropsType) {
        super({
            ...props,
            events: {
                click: props.events?.onClick
            }
        })
    }

    render(): string {
        return `
            <div class="input">
                <label class="input__label">
                    <input class="input__text" {{error}} name="{{name}}" type="{{type}}" required>
                    <span class="input__placeholder">{{label}}</span>
                    <span class="input__error">{{errorText}}</span>
                </label>
            </div>
            `;
    }
}