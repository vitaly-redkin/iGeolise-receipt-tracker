/**
 * The receipt list component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { ReceiptListEntity } from '../../model/ReceiptListEntity';
import { IApplicationState } from '../../store';
import Receipt from '../receipt/Receipt';
import * as styles from './ReceiptList.css';

// Component properties type
type ReceiptListProps =
  (ReceiptListEntity
   & React.Props<{}>);

class ReceiptList extends React.PureComponent<ReceiptListProps, {}> {
  public render(): JSX.Element {
    const receipts: ReceiptEntity[] = this.props.list;
    if (receipts.length === 0) {
      return (
        <div>Click Add Receipt button to add new receipt</div>
      );
    }

    return (
      <div className={styles.ReceiptList}>
        {receipts.map((receipt: ReceiptEntity) => (
          <Receipt key={receipt.id.id} receipt={receipt} />
        ))}
      </div>
    );
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : ReceiptListEntity {
  return {...state.receiptList.receiptList};
}

// Redux-Wrapped component
export default connect(
  mapStateToProps
)(ReceiptList);
