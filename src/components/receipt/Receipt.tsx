/**
 * The receipt component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardHeader, Col,
         DropdownItem, DropdownMenu, DropdownToggle, Row,
         UncontrolledDropdown } from 'reactstrap';
import { ReceiptEntity } from '../../model/ReceiptEntity';
import { receiptActionCreators } from '../../store/ReceiptListHandler';
import { Consts } from '../../util/Consts';
import { Utils } from '../../util/Utils';
import { ReceiptLineList } from '../receipt-line-list/ReceiptLineList';
import * as styles from './Receipt.css';

// Interface for component properties
interface IReceiptOwnProps {
  receipt: ReceiptEntity;
}

// Component properties type
type ReceiptProps =
  (IReceiptOwnProps
   & typeof receiptActionCreators);

class Receipt extends React.PureComponent<ReceiptProps, {}> {
  public render(): JSX.Element {
    return (
      <Card id={`receipt_${this.props.receipt.id.id}`} className='pr-0 mb-4'>

        <CardHeader className='pr-0'>
          <Row className='w-100 justify-content-around pr-0'>
            <Col className='align-self-center'>

              <UncontrolledDropdown size='sm' className={styles.ExpenseTypeDropdown}>
                <DropdownToggle caret={true}>
                  {this.props.receipt.expenseType}
                </DropdownToggle>
                <DropdownMenu>
                  {
                    Consts.EXPENSE_TYPES.map((item) => {
                      if (item === this.props.receipt.expenseType) { return null; }

                      return (
                        <DropdownItem
                          key={item}
                          className={styles.ExpenseStyleDropdownItem}
                          onClick={this.expenseTypeSelected}
                        >
                          {item}
                        </DropdownItem>
                      );
                    })
                  }
                </DropdownMenu>
              </UncontrolledDropdown>

            </Col>

            <Col className='text-right align-self-center pr-0' style={{display: 'contents'}}>
              <Button
                id={`AddReceiptLineButton_${this.props.receipt.id.id}`}
                onClick={this.addReceiptLine}
                color='primary'
                size='sm'
                className='mr-2'
              >
                Add Expense
              </Button>

              <Button
                id={`AddReceiptLineButton_${this.props.receipt.id.id}`}
                onClick={this.deleteReceipt}
                className='close'
                aria-label='Close'
                title='Delete receipt'
              >
                <span aria-hidden='true'>&times;</span>
              </Button>
            </Col>
          </Row >
        </CardHeader>

        <CardBody className='pr-0'>
          <ReceiptLineList receipt={this.props.receipt} />

          <Row className='w-100 justify-content-around pr-0'>
            <Col className='align-self-center'>
              Total:
            </Col>
            <Col className='text-right align-self-center pr-0'>
              <strong><u>
                {Utils.formatTotal(this.props.receipt.summary.sum)}
              </u></strong>
            </Col>
          </Row >
        </CardBody>

      </Card>
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

  private expenseTypeSelected = (e: React.MouseEvent<HTMLElement>): void => {
    // In this particular case I do not see an alternative to the case to any.
    // The only other viable option is binding the event handler in Render method.
    // tslint:disable
    const expenseType = (e.target as any).innerText;
    // tslint:enable
    this.props.updateReceiptExpenseType(this.props.receipt, expenseType);
}
}

// Redux-Wrapped component
export default connect(
  null,
  receiptActionCreators
)(Receipt);
