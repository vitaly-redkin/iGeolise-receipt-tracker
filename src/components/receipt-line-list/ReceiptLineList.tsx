/**
 * The receipt line list component.
 */

import * as React from 'react';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { ReceiptLineEntity } from '../../model/ReceiptLineEntity';
import { PlaceholderMessage } from '../placeholder-message/PlaceholderMessage';
import ReceiptLine from '../receipt-line/ReceiptLine';

// Interface for component properties
interface IReceiptLineListProps {
  receipt: ReceiptEntity;
}

export class ReceiptLineList extends React.PureComponent<IReceiptLineListProps, {}> {
  public render(): JSX.Element {
    const receiptLines: ReceiptLineEntity[] = this.props.receipt.list;
    if (receiptLines.length === 0) {
      return (
        <PlaceholderMessage message='Click Add Expense button to add new expense' />
      );
    }

    return (
      <>
        {receiptLines.map((receiptLine: ReceiptLineEntity) => (
          <ReceiptLine
            key={receiptLine.id.id}
            receipt={this.props.receipt}
            receiptLine={receiptLine}
          />
        ))}
      </>
    );
  }
}
