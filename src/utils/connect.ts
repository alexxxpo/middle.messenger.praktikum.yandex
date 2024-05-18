import { IState, StoreEvents } from "../core/Store";
import isEqual from './isEqual';
import Store from "../core/Store";
import { Block } from "../core";
import { Constructable } from "../types/types";

export function connect(mapStateToProps: (state: IState) => IState, dispatch?: Record<string, any>) {
  return function (Component: Constructable<Block>) {
    return class extends Component {
      private onChangeStoreCallback: () => void;
      constructor(props: Record<string, unknown>) {
        const store = Store;
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({ ...props, ...state });

        const dispatchHandler: Record<string, any> = {};
        Object.entries(dispatch || {}).forEach(([key, handler]) => {
          dispatchHandler[key] = (...args: any[]) => handler(Store.set.bind(Store), ...args)
        })

        this.setProps({ ...dispatchHandler });

        this.onChangeStoreCallback = () => {

          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({ ...newState });
          }

          // не забываем сохранить новое состояние
          state = newState;
        }

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }


      // componentWillUnmount() {
      //   super.componentWillUnmount();
      //   Store.off(StoreEvents.Updated, this.onChangeStoreCallback);
      // }
    }
  }
}

export type MapStateToProps = (state: IState) => IState
