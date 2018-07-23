/**
 * The root file of the Redux store.
 */

import * as ReceiptListHandler from './ReceiptListHandler';

/**
 * Interface for the application state.
 */
export interface IApplicationState {
  receiptList: ReceiptListHandler.IReceiptListState;
}

/**
 * Inital application state.
 */
export const initialState: IApplicationState = {
  receiptList: ReceiptListHandler.initialState
};

/**
 * Application reducers.
 */
export const reducers = {
  receiptList: ReceiptListHandler.reducer
};

/**
 * This type can be used as a hint on action creators so that its 'dispatch' and
 * 'getState' params are correctly typed to match your store.
 */
export type AppThunkAction<TAction> = (
  dispatch: (action: TAction) => void,
  getState: () => IApplicationState) => void;
