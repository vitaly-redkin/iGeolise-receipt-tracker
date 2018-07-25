/**
 * The receipt component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { ReceiptLineEntity } from '../../model/ReceiptLineEntity';
import { receiptLineActionCreators } from '../../store/ReceiptListHandler';
import { Consts } from '../../util/Consts';
import * as styles from './ReceiptLine.css';

// Interface for component properties
interface IReceiptLineOwnProps {
  receipt: ReceiptEntity;
  receiptLine: ReceiptLineEntity;
}

// Component properties type
type ReceiptLineProps =
  (IReceiptLineOwnProps
   & typeof receiptLineActionCreators);

class ReceiptLine extends React.PureComponent<ReceiptLineProps, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.ReceiptLine} id={`receipt_line_${this.props.receipt.id.id}`}>
        <div>{this.props.receiptLine.id.id}</div>
        <div>Name: {this.props.receiptLine.name}</div>
        <div>Amount: {this.props.receiptLine.amount}{Consts.CURRENCY_SUFFIX}</div>
        <div>
          <button
              id={`DeleteReceiptLineButton_${this.props.receipt.id.id}`}
              type='button'
              onClick={this.deleteReceiptLine}
          >
            Delete Expense
          </button>
        </div>
      </div>
    );
  }

  /**
   * Deletes receipt line.
   */
  private deleteReceiptLine = (): void => {
    this.props.deleteReceiptLine(this.props.receipt, this.props.receiptLine);
  }
}

// Redux-Wrapped component
export default connect(
  null,
  receiptLineActionCreators
)(ReceiptLine);
