import Block from "../../core/Block";

type PImageType = {
    className?: string;
}

export default class PImage extends Block<PImageType> {
    constructor(props: PImageType) {
        super({
            ...props
        })
    }
    render(): string {
        return `
        <div class="pImage {{className}}">
            <div class="pImage_hovered">Поменять<br>аватар</div>
        </div>
        `
    }
}