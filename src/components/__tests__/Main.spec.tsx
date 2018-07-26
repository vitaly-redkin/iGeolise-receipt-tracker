/**
 * Integration test for the Main component.
 */

import * as React from "react";
import { Provider } from 'react-redux'
import { mount } from "enzyme";
import { configureStore, StoreType } from '../../store/configureStore';
import { ReceiptListEntity } from '../../model/ReceiptListEntity';
import { Utils } from '../../util/Utils';
import Main from "../main/Main";

// Workaround for "scrollIntoView is not a function" errors
(window as any).HTMLElement.prototype.scrollIntoView = function() {};

describe("Test if a receipt being added correctly", () =>  {
  const store: StoreType = configureStore();
  let wrapper;

  const receiptCount = getRL(store).summary.count;
  wrapper = addReceipt(store);
  const receiptCountAfterAdd = getRL(store).summary.count;
  it("Receipt added to the store after Add Receipt button clicked", () => {
    expect(receiptCountAfterAdd).toBe(receiptCount + 1);
  });

  const firstReceiptCard = wrapper.find(`#receipt_${getRL(store).list[0].id.id}`);
  it("Renders the added receipt card", () => {
    // There is DiV inside reactstrap Card, so two elements found...
    expect(firstReceiptCard.length).toBe(2);
  });
});

describe("Test if a receipt line being added and updated correctly", () =>  {
  const store: StoreType = configureStore();
  let wrapper;

  const receiptLineCount = 0;
  wrapper = addReceiptLine(store);
  const receiptLineCountAfterAdd = getRL(store).list[0].summary.count;;
  it("Receipt line added after Add Expense button clicked", () => {
    expect(receiptLineCountAfterAdd).toBe(receiptLineCount + 1);
  });

  const expenseName: string = ' Expense 1 ';
  const expenseAmount: number = 9875.43;
  wrapper = addReceiptLineAndSetNameAndAmount(store, expenseName, expenseAmount);
  const expenseNameInStore = getRL(store).list[0].list[0].name;
  it("Expense name set in the store", () => {
    expect(expenseNameInStore).toBe(expenseName.trim());
  });
  const expenseAmountInStore = getRL(store).list[0].list[0].amount;
  it("Expense amount set in the store", () => {
    expect(expenseAmountInStore).toBe(expenseAmount);
  });

  const receiptTotalWrapper = wrapper.find(
    `#receiptTotal_${getRL(store).list[0].id.id}`);
  const receiptListTotalWrapper = wrapper.find('#receiptListTotal');
  it("Receipt total matches the expense amount we set", () => {
    expect(receiptTotalWrapper.get(0).props.children).toBe(
      Utils.formatTotal(expenseAmount)
    );
  });
  it("Receipt total matches the store amount", () => {
    console.log('After add expense: ' + Date.now());
    expect(receiptTotalWrapper.get(0).props.children).toBe(
      Utils.formatTotal(getRL(store).list[0].summary.sum)
    );
  });
  it("Receipt list total matches the store amount", () => {
    expect(receiptListTotalWrapper.get(0).props.children).toBe(
      Utils.formatTotal(getRL(store).summary.sum)
    );
  });
});

describe("Test if receipt line being deleted correctly", () =>  {
  const store: StoreType = configureStore();

  const expenseName: string = ' Expense 1 ';
  const expenseAmount: number = 9875.43;
  addReceiptLineAndSetNameAndAmount(store, expenseName, expenseAmount);

  const receiptLineCount: number = getRL(store).list[0].summary.count;
  const receiptTotal: number = getRL(store).list[0].summary.sum;
  const receiptLineAmount: number = getRL(store).list[0].list[0].amount;
  
  deleteReceiptLine(store);

  const receiptLineCountAfterDelete: number = getRL(store).list[0].summary.count;
  const receiptTotalAfterDelete: number = getRL(store).list[0].summary.sum;

  it("Receipt line deleted after Delete Expense button clicked", () => {
    expect(receiptLineCountAfterDelete).toBe(receiptLineCount - 1);
  });
  it("Receipt total has been updated", () => {
    expect(receiptTotalAfterDelete).toBe(receiptTotal - receiptLineAmount);
  });
});

describe("Test if receipt being deleted correctly", () =>  {
  const store: StoreType = configureStore();

  const expenseName: string = ' Expense 1 ';
  const expenseAmount: number = 9875.43;
  addReceiptLineAndSetNameAndAmount(store, expenseName, expenseAmount);

  const receiptCount: number = getRL(store).summary.count;
  const receiptListTotal: number = getRL(store).summary.sum;
  const receiptAmount: number = getRL(store).list[0].amount;
  
  deleteReceipt(store);

  const receiptCountAfterDelete: number = getRL(store).summary.count;
  const receiptListTotalAfterDelete: number = getRL(store).summary.sum;

  it("Receipt deleted after Delete Expense button clicked", () => {
    expect(receiptCountAfterDelete).toBe(receiptCount - 1);
  });
  it("Receipt List total has been updated", () => {
    expect(receiptListTotalAfterDelete).toBe(receiptListTotal - receiptAmount);
  });
});

//-----------------------------------------------------------------------------
// Utility functons
function addReceipt(store: StoreType) {
  const wrapper = mount(<Provider store={store}><Main /></Provider>);

  const addReceiptButton = wrapper.find('#AddReceiptButton');
  addReceiptButton.get(0).props.onClick();

  return mount(<Provider store={store}><Main /></Provider>);
}

function addReceiptLine(store: StoreType) {
  const wrapper = addReceipt(store);

  const addReceiptLineButton = wrapper.find(
    `#AddReceiptLineButton_${getRL(store).list[0].id.id}`);
  addReceiptLineButton.get(0).props.onClick();

  return mount(<Provider store={store}><Main /></Provider>);
}

function addReceiptLineAndSetNameAndAmount(
    store: StoreType, name: string, amount: number) {
  const wrapper = addReceiptLine(store);

  const nameInputWrapper = wrapper.find(
    `#ReceiptLineName_${getRL(store).list[0].list[0].id.id}`);
  nameInputWrapper.get(0).props.onChange({target: {value: name}});

  const amountInputWrapper = wrapper.find(
    `#ReceiptLineAmount_${getRL(store).list[0].list[0].id.id}`);
  amountInputWrapper.get(0).props.onChange({target: {value: amount.toString()}});

  return mount(<Provider store={store}><Main /></Provider>);
}

function deleteReceiptLine(store: StoreType) {
  const wrapper = mount(<Provider store={store}><Main /></Provider>);

  const deleteReceiptLineButton = wrapper.find(
    `#DeleteReceiptLineButton_${getRL(store).list[0].list[0].id.id}`);
  deleteReceiptLineButton.get(0).props.onClick();

  return mount(<Provider store={store}><Main /></Provider>);
}

function deleteReceipt(store: StoreType) {
  const wrapper = mount(<Provider store={store}><Main /></Provider>);

  const deleteReceiptButton = wrapper.find(
    `#DeleteReceiptButton_${getRL(store).list[0].id.id}`);
  deleteReceiptButton.get(0).props.onClick();

  return mount(<Provider store={store}><Main /></Provider>);
}

function getRL(store: StoreType): ReceiptListEntity {
  return store.getState().receiptList.receiptList;
}
