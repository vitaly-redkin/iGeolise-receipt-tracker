/**
 * Redux store configurator.
 */

import {
  AnyAction, applyMiddleware, combineReducers, compose, createStore,
  Reducer, ReducersMapObject, Store, StoreEnhancerStoreCreator
} from 'redux';
import reduxThunk from 'redux-thunk';
import { IApplicationState, initialState, reducers } from '.';

/**
 * Types for the application Redux store.
 */
export type StoreType = Store<IApplicationState, AnyAction>;

/**
 * Configures Redux store.
 *
 * @returns application Redux store.
 */
export function configureStore() : StoreType {
/* Replaced with a single statement below to avoid TSLint warnings about absent types
  const createStoreWithMiddleware = compose(
    applyMiddleware(reduxThunk),
    <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore);

  const allReducers = buildRootReducer(reducers);
  return createStoreWithMiddleware(allReducers, initialState);
*/
  return compose(
    applyMiddleware(reduxThunk),
    <S>(next: StoreEnhancerStoreCreator<S>) => next
  )(createStore)(buildRootReducer(reducers), initialState);
}

/**
 * Builds the root reducer.
 *
 * @param allReducers Application reducers
 * @returns Root reducer combined from the application ones
 */
function buildRootReducer(allReducers: ReducersMapObject<IApplicationState, AnyAction>):
  Reducer<IApplicationState, AnyAction> {
  return combineReducers<IApplicationState>(allReducers);
}
