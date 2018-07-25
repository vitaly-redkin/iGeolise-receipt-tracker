/**
 * The receipt list component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { ReceiptListEntity } from '../../model/ReceiptListEntity';
import { IApplicationState } from '../../store';
import { PlaceholderMessage } from '../placeholder-message/PlaceholderMessage';
import Receipt from '../receipt/Receipt';

// Component properties type
interface IReceiptListProps {
  receiptList: ReceiptListEntity;
}

class ReceiptList extends React.PureComponent<IReceiptListProps, {}> {
  public render(): JSX.Element {
    const receipts: ReceiptEntity[] = this.props.receiptList.list;
    if (receipts.length === 0) {
      return (
        <PlaceholderMessage message='Click Add Receipt button to add new receipt' />
      );
    }

    return (
      <Container className='pl-0 pr-0'>
        {receipts.map((receipt: ReceiptEntity) => (
          <Receipt key={receipt.id.id} receipt={receipt} />
        ))}
      </Container>
    );
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : IReceiptListProps {
  return {receiptList: state.receiptList.receiptList};
}

// Redux-Wrapped component
export default connect(
  mapStateToProps
)(ReceiptList);
