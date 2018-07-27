/**
 * The receipt component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Card, CardBody, CardFooter, CardHeader, Col,
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
  // Reference of the dummy DIV to scroll to  when new receipt has been added
  private dummyDivRef: HTMLDivElement;

  public render(): JSX.Element {
    return (
      <Card id={`receipt_${this.props.receipt.id.id}`} className='pr-0 mb-4'>

        <CardHeader className='pr-0'>
          <Row className='w-100 justify-content-around pr-0'>
            <Col className='align-self-center pr-0 mr-0' style={{flexGrow: 0}}>
              <Button
                id={`DeleteReceiptButton_${this.props.receipt.id.id}`}
                onClick={this.deleteReceipt}
                className='close'
                aria-label='Close'
                title='Delete receipt'
              >
                <span aria-hidden='true'>&times;</span>
              </Button>
            </Col>

            <Col className='align-self-center col-3 pl-2'>
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

            <Col className='text-right align-self-center pr-0'>
              <Button
                id={`AddReceiptLineButton_${this.props.receipt.id.id}`}
                onClick={this.addReceiptLine}
                color='primary'
                size='sm'
              >
                Add Expense
              </Button>
            </Col>
          </Row >
        </CardHeader>

        <CardBody className='pr-0 pb-1'>
          <ReceiptLineList receipt={this.props.receipt} />
        </CardBody>

        <CardFooter className='pr-0'>
          <Row className='w-100 justify-content-around pr-0'>
            <Col className='align-self-center'>
              Total:
            </Col>
            <Col className='text-right align-self-center pr-1'>
              <strong><u><div id={`receiptTotal_${this.props.receipt.id.id}`}>
                {Utils.formatTotal(this.props.receipt.summary.sum)}
              </div></u></strong>
            </Col>
          </Row >
          <div ref={this.setDummyDivRef} />
        </CardFooter>

      </Card>
    );
  }

  /**
   * Called when component is updated.
   * If a new receipt line has been added scrolls to the bottom-most div.
   *
   * @param prevProps Component previous properties
   */
  public componentDidUpdate(prevProps: ReceiptProps) {
    if (prevProps.receipt.summary.count < this.props.receipt.summary.count) {
      this.scrollToBottom();
    }
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

  /**
   * Event handler for the Expense Type "dropown".
   *
   * @param  e Event details
   */
  private expenseTypeSelected = (e: React.MouseEvent<HTMLElement>): void => {
    // In this particular case I do not see an alternative to the cast to any.
    // The only other viable option is binding the event handler in Render method.
    // tslint:disable
    const expenseType = (e.target as any).innerText;
    // tslint:enable
    this.props.updateReceiptExpenseType(this.props.receipt, expenseType);
  }

  /**
   * Sets reference to the dummy DIV.
   *
   * @param div Dummy DIV to set the reference to
   */
  private setDummyDivRef = (div: HTMLDivElement): void => {
    this.dummyDivRef = div;
  }

  /**
   * Scrolls the receipt list to bottom.
   */
  private scrollToBottom = () => {
    this.dummyDivRef.scrollIntoView({ behavior: 'smooth' });
  }
}

// Redux-Wrapped component
export default connect(
  null,
  receiptActionCreators
)(Receipt);
