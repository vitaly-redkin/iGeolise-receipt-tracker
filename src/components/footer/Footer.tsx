/**
 * The footer component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { EntityListSummary } from '../../model/EntityListSummary';
import { IApplicationState } from '../../store';
import { addReceiptActionCreator } from '../../store/ReceiptListHandler';
import { Consts } from '../../util/Consts';
import * as styles from './Footer.css';

// Component properties type
type FooterProps =
  (EntityListSummary
   & typeof addReceiptActionCreator
   & React.Props<{}>);

class Footer extends React.PureComponent<FooterProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.Footer}>
        <div>
          Total:
        </div>
        <div>
          {this.props.count}
          {Consts.CURRENCY_SUFFIX}
        </div>
        <div>
          <button id='AddReceiptButton' type='button' onClick={this.addReceipt}>
            Add Receipt
          </button>
        </div>
      </div>
    );
  }

  /**
   * Event handler for the Add Receipt button.
   */
  public addReceipt = (): void => {
    this.props.addReceipt(Consts.DEFAULT_EXPENSE_TYPE);
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : EntityListSummary {
  return {...state.receiptList.receiptList.summary};
}

// Redux-Wrapped component
export default connect(
  mapStateToProps,
  addReceiptActionCreator
)(Footer);
