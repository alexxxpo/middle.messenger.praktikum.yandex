import { Constructable } from "../types/types";
import Block from "./Block";

export default class Route<T = Record<string, unknown>> {
  private _pathname: string
  private _blockClass: Constructable<Block<Record<string, unknown>>>
  private _block: Block<Record<string, unknown>> | null
  private _props: T

  constructor(pathname: string, view: Constructable<Block<Record<string, unknown>>>, props: T) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return pathname === this._pathname;
  }

  _renderDom(query, block) {
    const root = document.querySelector(query);
    root.append(block.getContent());
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass({});
      this._renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}