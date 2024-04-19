import { ErrorComp } from '../../components'
import { ErrorPropsType } from '../../components/ErrorComp/ErrorComp';
import Block from '../../core/Block'

type ErrorPageType = {
  errorComp: ErrorComp;
}

export default class ErrorPage extends Block<ErrorPageType> {
  constructor (props: ErrorPropsType) {
    super({
      errorComp: new ErrorComp(props)
    })
  }

  render (): string {
    return `
        <div class="page errorPage">
            <div class="errorPage__errorComp">
                {{{ errorComp }}}
            </div>
        </div>   
        `
  }
}
