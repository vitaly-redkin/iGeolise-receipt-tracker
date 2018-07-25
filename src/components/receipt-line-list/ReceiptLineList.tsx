/**
 * The receipt line list component.
 */

import * as React from 'react';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { ReceiptLineEntity } from '../../model/ReceiptLineEntity';
import ReceiptLine from '../receipt-line/ReceiptLine';
import * as styles from './ReceiptLineList.css';

// Interface for component properties
interface IReceiptLineListProps {
  receipt: ReceiptEntity;
 }

export class ReceiptLineList extends React.PureComponent<IReceiptLineListProps, {}> {
  public render(): JSX.Element {
    const receiptLines: ReceiptLineEntity[] = this.props.receipt.list;
    if (receiptLines.length === 0) {
      return (
        <div>Click Add Expense button to add new expense</div>
      );
    }

    return (
      <div className={styles.ReceiptLineList}>
        {receiptLines.map((receiptLine: ReceiptLineEntity) => (
          <ReceiptLine
            key={receiptLine.id.id}
            receipt={this.props.receipt}
            receiptLine={receiptLine}
          />
        ))}
      </div>
    );
  }
}
