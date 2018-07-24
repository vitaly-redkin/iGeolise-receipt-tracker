/**
 * The receipt component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { receiptActionCreators } from '../../store/ReceiptListHandler';
import { Consts } from '../../util/Consts';
import { ReceiptLineList } from '../receipt-line-list/ReceiptLineList';
import * as styles from './Receipt.css';

// Interface for component properties
interface IReceiptOwnProps {
   receipt: ReceiptEntity;
  }

// Component properties type
type ReceiptProps =
  (IReceiptOwnProps
   & typeof receiptActionCreators
   & React.Props<{}>);

class Receipt extends React.PureComponent<ReceiptProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.Receipt} id={`receipt_${this.props.receipt.id.id}`}>
        <div className={styles.ReceiptHeader}>
          <div>{this.props.receipt.id.id}</div>
          <div>{this.props.receipt.expenseType}</div>
          <div>
            <button
                id={`DeleteReceiptButton_${this.props.receipt.id.id}`}
                type='button'
                onClick={this.deleteReceipt}
            >
              Delete Receipt
            </button>
          </div>
          <div>
            <button
                id={`AddReceiptLineButton_${this.props.receipt.id.id}`}
                type='button'
                onClick={this.addReceiptLine}
            >
              Add Expense
            </button>
          </div>
        </div>
        <ReceiptLineList receipt={this.props.receipt} />
        <div className={styles.ReceiptFooter}>
          <div>
            Total:
          </div>
          <div>
            {this.props.receipt.summary.count}
            {Consts.CURRENCY_SUFFIX}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Deletes receipt.
   */
  private deleteReceipt = (): void => {
    this.props.deleteReceipt(this.props.receipt);
  }

  /**
   * Adds receipt line.
   */
  private addReceiptLine = (): void => {
    this.props.addReceiptLine(this.props.receipt);
  }
}

// Redux-Wrapped component
export default connect(
  null,
  receiptActionCreators
)(Receipt);
