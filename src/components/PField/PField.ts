import Block from "../../core/Block";

type PFieldProps = {
    label?: string;
    disabled?: boolean;
    type?: string;
    value?: string;
    name?: string;  
}


export default class PField extends Block<PFieldProps> {
    constructor(props: PFieldProps) {
        super({
            ...props,
        })
    }
    render(): string {
        return `
        <div class="pField">
            <span class="pField__label">{{label}}</span>
            <label class="pField__label">
                <input class="pField__input" type={{type}} ${ this.props.disabled ? "disabled" : ""} value={{value}}>  
            </label>
        </div>
        `
    }
}