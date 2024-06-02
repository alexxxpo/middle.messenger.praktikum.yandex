import { ErrorComp } from '../../components/index.ts'
import { type ErrorPropsType } from '../../components/ErrorComp/ErrorComp.ts'
import { Block } from '../../core/index.ts'
import { type MapStateToProps, connect } from '../../utils/connect.ts'

interface ErrorPageType {
  errorComp: ErrorComp
}

class ErrorPage404 extends Block<ErrorPageType> {
  constructor (props: ErrorPropsType) {
    super({
      errorComp: new ErrorComp({
        ...props,
        errNo: '404',
        message: 'Не туда попали'
      })
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

const mapStateToProps: MapStateToProps = ({ loginError }) => ({ loginError })

export default connect(mapStateToProps)(ErrorPage404)
