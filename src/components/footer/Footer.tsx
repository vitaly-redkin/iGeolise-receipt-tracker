/**
 * The footer component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
import { EntityListSummary } from '../../model/EntityListSummary';
import { IApplicationState } from '../../store';
import { addReceiptActionCreator } from '../../store/ReceiptListHandler';
import { Consts } from '../../util/Consts';
import { Utils } from '../../util/Utils';

// Component properties type
type FooterProps =
  (EntityListSummary
   & typeof addReceiptActionCreator);

class Footer extends React.PureComponent<FooterProps, {}> {
  public render(): JSX.Element {
    return (
      <Row className='w-100 justify-content-around pr-0'>
        <Col className='align-self-center'>
          Total:
        </Col>
        <Col className='text-right align-self-center'>
          <strong><u>
            {Utils.formatTotal(this.props.count * 100)}
            </u></strong>
        </Col>
        <Col className='text-right justify-content-end pr-0' >
          <Button id='AddReceiptButton' onClick={this.addReceipt} color='primary' size='sm'>
            Add Receipt
          </Button>
        </Col>
      </Row >
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
