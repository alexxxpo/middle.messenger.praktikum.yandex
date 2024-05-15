import { Block } from "../../core";

interface PropsType extends Record<string, unknown> {
    type?: string
    name: string
    className?: string
}

export default class MessageInput extends Block<PropsType> {
    constructor(props: PropsType) {
        super({
            ...props,
            type: props.type || 'text',
            name: props.name || 'message'
        })
    }
    render(): string {
        return `
            <input 
                type="{{type}}" 
                class="messageInput {{className}}" 
                name="{{name}}" 
                placeholder="Сообщение">
        `
        
    }
}
