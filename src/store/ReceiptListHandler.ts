/**
 * The Redux store stuff for the uploaded file.
 */

import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Receipt } from '../model/Receipt';
import { ReceiptLine } from '../model/ReceiptLine';
import { ReceiptList } from '../model/ReceiptList';
import * as ReceiptManager from '../model/ReceiptManager';

/**
 * Interface for the receipt list state.
 */
export interface IReceiptListState {
  receiptList: ReceiptList;
}

/**
 * Initial receipt list state,
 */
export const initialState: IReceiptListState = {
  receiptList: new ReceiptList()
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
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

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
  receipt: Receipt;
}

/**
 * Interface for the ReceiptUpdateExpenseType action.
 */
interface IReceiptUpdateExpenseTypeAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptUpdateExpenseType;
  // tslint:enable
  receipt: Receipt;
  expenseType: string;
}

/**
 * Interface for the ReceiptLineAdd action.
 */
interface IReceiptLineAddAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineAdd;
  // tslint:enable
  receipt: Receipt;
}

/**
 * Interface for the ReceiptDelete action.
 */
interface IReceiptLineDeleteAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineDelete;
  // tslint:enable
  receipt: Receipt;
  receiptLine: ReceiptLine;
}

/**
 * Interface for the ReceiptLineUpdate action.
 */
interface IReceiptLineUpdateAction {
  // tslint:disable
  type: ActionTypeEnum.ReceiptLineUpdate;
  // tslint:enable
  receipt: Receipt;
  receiptLine: ReceiptLine;
}

/**
 * Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
 * declared type strings (and not any other arbitrary string).
 */
export type KnownAction =
  IReceiptAddAction | IReceiptDeleteAction | IReceiptUpdateExpenseTypeAction |
  IReceiptLineAddAction | IReceiptLineDeleteAction | IReceiptLineUpdateAction;

/**
 * ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
 * They don't directly mutate state, but they can have external side-effects (such as loading data)
 */
export const actionCreators = {
  addReceipt: (expenseType: string): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptAdd, expenseType });
  },

  deleteReceipt: (receipt: Receipt): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptDelete, receipt });
  },

  updateReceiptExpenseType: (receipt: Receipt, expenseType: string): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptUpdateExpenseType, receipt, expenseType });
  },

  addReceiptLine: (receipt: Receipt): AppThunkAction <KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineAdd, receipt });
  },

  deleteReceiptLine: (receipt: Receipt, receiptLine: ReceiptLine): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineDelete, receipt, receiptLine });
  },

  updateReceiptLine: (receipt: Receipt, receiptLine: ReceiptLine): AppThunkAction<KnownAction> =>
      (dispatch: (action: KnownAction) => void): void => {
    dispatch({ type: ActionTypeEnum.ReceiptLineUpdate, receipt, receiptLine });
  }
};

/**
 * REDUCER - For a given state and action, returns the new state
 * To support time travel, this must not mutate the old state
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
   * Composes state to return fr0m reducers.
   *
   * @param state Current state
   * @param receiptList New receipt list to use in the state
   */
function composeState(
    state: IReceiptListState,
    receiptList: ReceiptList): IReceiptListState  {
  return { ...state, receiptList };
}
