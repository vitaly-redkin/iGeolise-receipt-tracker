/**
 * The application root component.
 */

import * as React from 'react';
import { Provider } from 'react-redux';
import { configureStore, StoreType } from '../../store/configureStore';
import { Main } from '../main/Main';

// Redux store to use in the application
const store: StoreType = configureStore();

export class App extends React.PureComponent<{}, {}> {
  public render(): JSX.Element {
    return (
      <Provider store={store}>
        <Main/>
      </Provider>
    );
  }
}
