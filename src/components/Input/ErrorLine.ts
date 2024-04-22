import Block from "../../core/Block"

interface ErrorLineProps {
    errorText: string
}

class ErrorLine extends Block<ErrorLineProps> {
    constructor(props: ErrorLineProps) {
        super({...props})
    }

    render(): string {
        return (`
            <div class="input__text-error">{{errorText}}</div>
        `)
    }
}

export default ErrorLine