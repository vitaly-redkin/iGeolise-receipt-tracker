/**
 * The Redux store stuff for the receipt list.
 */

import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ReceiptEntity } from '../model/ReceiptEntity';
import { ReceiptLineEntity } from '../model/ReceiptLineEntity';
import { ReceiptListEntity } from '../model/ReceiptListEntity';
import * as ReceiptManager from '../model/ReceiptManager';

/**
 * Interface for the receipt list state.
 */
export interface IReceiptListState {
  receiptList: ReceiptListEntity;
}

/**
 * Initial receipt list state,
 */
export const initialState: IReceiptListState = {
  receiptList: new ReceiptListEntity()
};

/**
 * Enumeration for the action type strings.
 */
export enum ActionTypeEnum {
  ReceiptAdd = '@@RECEIPT/ADD',
  ReceiptDelete = '@@RECEIPT/DELETE',
  ReceiptUpdateExpenseType = '@@RECEIPT/SET_EXPENSE_TYPE',

  ReceiptLineAdd = '@@RECEIPT_LINE/ADD',
  ReceiptLineDelete = '@@RECEIPT_LINE/DELETE',
  ReceiptLineUpdate = '@@RECEIPT_LINE/UPDATE'
}

// -----------------
// ACTIONS

/**
 * Interface for the ReceiptAdd action.
 */
interface IReceiptAddAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptAdd;
  // tslint:enable
  expenseType: string;
}

/**
 * Interface for the ReceiptDelete action.
 */
interface IReceiptDeleteAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptDelete;
  // tslint:enable
  receipt: ReceiptEntity;
}

/**
 * Interface for the ReceiptUpdateExpenseType action.
 */
interface IReceiptUpdateExpenseTypeAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptUpdateExpenseType;
  // tslint:enable
  receipt: ReceiptEntity;
  expenseType: string;
}

/**
 * Interface for the ReceiptLineAdd action.
 */
interface IReceiptLineAddAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineAdd;
  // tslint:enable
  receipt: ReceiptEntity;
}

/**
 * Interface for the ReceiptDelete action.
 */
interface IReceiptLineDeleteAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineDelete;
  // tslint:enable
  receipt: ReceiptEntity;
  receiptLine: ReceiptLineEntity;
}

/**
 * Interface for the ReceiptLineUpdate action.
 */
interface IReceiptLineUpdateAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineUpdate;
  // tslint:enable
  receipt: ReceiptEntity;
  receiptLine: ReceiptLineEntity;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references
 * to 'type' properties contain one of the declared type strings
 * (and not any other arbitrary string).
 */
export type KnownAction =
  IReceiptAddAction | IReceiptDeleteAction | IReceiptUpdateExpenseTypeAction |
  IReceiptLineAddAction | IReceiptLineDeleteAction | IReceiptLineUpdateAction;

/**
 * ACTION CREATORS.
 * These are functions exposed to UI components that will trigger a state transition.
 */
const actionCreators = {
  addReceipt: (expenseType: string): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptAdd, expenseType });
  },

  deleteReceipt: (receipt: ReceiptEntity): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptDelete, receipt });
  },

  updateReceiptExpenseType: (receipt: ReceiptEntity, expenseType: string): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptUpdateExpenseType, receipt, expenseType });
  },

  addReceiptLine: (receipt: ReceiptEntity): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineAdd, receipt });
  },

  deleteReceiptLine: (receipt: ReceiptEntity, receiptLine: ReceiptLineEntity): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineDelete, receipt, receiptLine });
  },

  updateReceiptLine: (receipt: ReceiptEntity, receiptLine: ReceiptLineEntity): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineUpdate, receipt, receiptLine });
  }
};

export const receiptListActionCreators = {
  addReceipt: actionCreators.addReceipt
};

export const receiptActionCreators = {
  updateReceiptExpenseType: actionCreators.updateReceiptExpenseType,
  deleteReceipt: actionCreators.deleteReceipt,
  addReceiptLine: actionCreators.addReceiptLine
};

export const receiptLineActionCreators = {
  updateReceiptLine: actionCreators.updateReceiptLine,
  deleteReceiptLine: actionCreators.deleteReceiptLine
};

/**
 * REDUCER - For a given state and action, returns the new state.
 *
 * @param state Current application state
 * @param incomingAction Dispatched Redux action
 *
 * @returns New application state
 */
export const reducer: Reducer<IReceiptListState> =
  (state: IReceiptListState, incomingAction: KnownAction): IReceiptListState => {
    switch (incomingAction.type) {
      // Receipt actions
      case ActionTypeEnum.ReceiptAdd:
      {
        const action: IReceiptAddAction = <IReceiptAddAction> incomingAction;

        return composeState(state, ReceiptManager.addReceipt(
          state.receiptList, action.expenseType));
      }
      case ActionTypeEnum.ReceiptDelete:
      {
        const action: IReceiptDeleteAction = <IReceiptDeleteAction> incomingAction;

        return composeState(state, ReceiptManager.deleteReceipt(
          state.receiptList, action.receipt));
      }
      case ActionTypeEnum.ReceiptUpdateExpenseType:
      {
        const action: IReceiptUpdateExpenseTypeAction = <IReceiptUpdateExpenseTypeAction> incomingAction;

        return composeState(state, ReceiptManager.updateReceiptExpenseType(
          state.receiptList, action.receipt, action.expenseType));
      }
      // Receipt line actions
      case ActionTypeEnum.ReceiptLineAdd:
      {
        const action: IReceiptLineAddAction = <IReceiptLineAddAction> incomingAction;

        return composeState(state, ReceiptManager.addReceiptLine(
          state.receiptList, action.receipt));
      }
      case ActionTypeEnum.ReceiptLineDelete:
      {
        const action: IReceiptLineDeleteAction = <IReceiptLineDeleteAction> incomingAction;

        return composeState(state, ReceiptManager.deleteReceiptLine(
          state.receiptList, action.receipt, action.receiptLine));
      }
      case ActionTypeEnum.ReceiptLineUpdate:
      {
        const action: IReceiptLineUpdateAction = <IReceiptLineUpdateAction> incomingAction;

        return composeState(state, ReceiptManager.updateReceiptLine(
          state.receiptList, action.receipt, action.receiptLine));
      }
      default:
        // Do nothing - the final return will work
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || initialState;
  };

  /**
   * Composes state to return from reducers.
   *
   * @param state Current state
   * @param receiptList New receipt list to use in the state
   */
function composeState(
    state: IReceiptListState,
    receiptList: ReceiptListEntity): IReceiptListState  {
  return { ...state, receiptList };
}
