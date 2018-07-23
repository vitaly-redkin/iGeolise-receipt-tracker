/**
 * The Redux store stuff for the uploaded file.
 */

import { Reducer } from 'redux';
import { AppThunkAction } from '.';
import { ReceiptList } from '../model/ReceiptList';
import { Receipt } from '../model/Receipt';
import { ReceiptLine } from '../model/ReceiptLine';

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
  ReceiptLineUpdate = '@@RECEIPT_LINE/UPDATE',
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.
// Use @typeName and isActionType for type detection that works even after serialization/deserialization.

/**
 * Interface for the ReceiptAdd action.
 */
interface IReceiptAddAction {
  type: ActionTypeEnum.ReceiptAdd;
  expenseType: string;
}

/**
 * Interface for the ReceiptDelete action.
 */
interface IReceiptDeleteAction {
  type: ActionTypeEnum.ReceiptDelete;
  receipt: Receipt;
}

/**
 * Interface for the ReceiptUpdateExpenseType action.
 */
interface IReceiptUpdateExpenseTypeAction {
  type: ActionTypeEnum.ReceiptUpdateExpenseType;
  receipt: Receipt;
  expenseType: string;
}

/**
 * Interface for the ReceiptLineAdd action.
 */
interface IReceiptLineAddAction {
  type: ActionTypeEnum.ReceiptLineAdd;
  receipt: Receipt;
}

/**
 * Interface for the ReceiptDelete action.
 */
interface IReceiptLineDeleteAction {
  type: ActionTypeEnum.ReceiptLineDelete;
  receipt: Receipt;
  receiptLine: ReceiptLine;
}

/**
 * Interface for the ReceiptLineUpdate action.
 */
interface IReceiptLineUpdateAction {
  type: ActionTypeEnum.ReceiptLineUpdate;
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
  },
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
        state.receiptList.addReceipt(action.expenseType);
        return { ...state, receiptList: state.receiptList };
      }
      case ActionTypeEnum.ReceiptDelete:
      {
        const action: IReceiptDeleteAction = <IReceiptDeleteAction> incomingAction;
        state.receiptList.deleteReceipt(action.receipt);
        return { ...state, receiptList: state.receiptList };
      }
      case ActionTypeEnum.ReceiptUpdateExpenseType:
      {
        const action: IReceiptUpdateExpenseTypeAction = <IReceiptUpdateExpenseTypeAction> incomingAction;
        state.receiptList.updateReceiptExpenseType(action.receipt, action.expenseType);
        return { ...state, receiptList: state.receiptList };
      }
      // Receipt line actions
      case ActionTypeEnum.ReceiptLineAdd:
      {
        const action: IReceiptLineAddAction = <IReceiptLineAddAction> incomingAction;
        state.receiptList.addReceiptLine(action.receipt);
        return { ...state, receiptList: state.receiptList };
      }
      case ActionTypeEnum.ReceiptLineDelete:
      {
        const action: IReceiptLineDeleteAction = <IReceiptLineDeleteAction> incomingAction;
        state.receiptList.deleteReceiptLine(action.receipt, action.receiptLine);
        return { ...state, receiptList: state.receiptList };
      }
      case ActionTypeEnum.ReceiptLineUpdate:
      {
        const action: IReceiptLineUpdateAction = <IReceiptLineUpdateAction> incomingAction;
        state.receiptList.updateReceiptLine(action.receipt, action.receiptLine);
        return { ...state, receiptList: state.receiptList };
      }
      default:
        // Do nothing - the final return will work
    }

    // For unrecognized actions (or in cases where actions have no effect), must return the existing state
    //  (or default initial state if none was supplied)
    return state || initialState;
  };
