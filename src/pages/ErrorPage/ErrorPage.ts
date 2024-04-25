import { ErrorComp } from '../../components/index.ts'
import { type ErrorPropsType } from '../../components/ErrorComp/ErrorComp.ts'
import { Block } from '../../core/index.ts'

interface ErrorPageType {
  errorComp: ErrorComp
}

export default class ErrorPage extends Block<ErrorPageType> {
  constructor(props: ErrorPropsType) {
    super({
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
