/**
 * Integration test for the Main component.
 */

import * as React from "react";
import { Provider } from 'react-redux'
import { mount } from "enzyme";
import { configureStore } from '../../store/configureStore';
import Main from "../main/Main";

// Workround for "scrollIntoView is not a function" errors
(window as any).HTMLElement.prototype.scrollIntoView = function() {};

describe("Integration testing", () =>  {
    const store = configureStore();
//    console.log(store);

    const wrapper = mount(<Provider store={store}><Main /></Provider>);
//    console.log(wrapper.debug());

    const addReceiptButton = wrapper.find('#AddReceiptButton');
    it("Renders the Add Receipt button", () => {
      // There is HTML button inside reactstrap button, so two elements found...
      expect(addReceiptButton.length === 2).toBeTruthy();
    });

    const receiptCount = store.getState().receiptList.receiptList.summary.count;
//    console.log(addReceiptButton.get(0));
    addReceiptButton.get(0).props.onClick();
    const receiptCountAfterAdd = store.getState().receiptList.receiptList.summary.count;

    it("Receipt added after Add Receipt button  clicked", () => {
      expect(receiptCountAfterAdd === receiptCount + 1).toBeTruthy();
  });
});
