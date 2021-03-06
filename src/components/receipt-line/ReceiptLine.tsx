/**
 * The receipt component.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Col, Row } from 'reactstrap';
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

/**
 * Interface for the component local state.
 */
interface IReceiptLineState {
  invalidAmountFlag: boolean;
}

class ReceiptLine extends React.PureComponent<ReceiptLineProps, IReceiptLineState> {
  /**
   * Constructor.
   * Uses to initialize local state.
   */
  constructor() {
    super();
    this.state = {invalidAmountFlag: false};
  }

  public render(): JSX.Element {
    return (
      <Row className='w-100 pr-0 pb-3 mr-0'>
        <Col className='col-9 text-left align-self-center'>
          <div className={styles.NameColumn}>
            <Button
                id={`DeleteReceiptLineButton_${this.props.receiptLine.id.id}`}
                onClick={this.deleteReceiptLine}
                className='close pr-2'
                aria-label='Close'
                title='Delete expense'
            >
              <span aria-hidden='true'>&times;</span>
            </Button>

            <input
              id={`ReceiptLineName_${this.props.receiptLine.id.id}`}
              type='text'
              placeholder='Enter expense name'
              className={styles.NameInput}
              defaultValue={this.props.receiptLine.name}
              onChange={this.nameChanged}
            />
          </div>
        </Col>
        <Col className='col-3 text-right align-self-center pl-0 pr-0'>
          <div className={styles.AmountColumn}>
            <input
              id={`ReceiptLineAmount_${this.props.receiptLine.id.id}`}
              type='number'
              className={this.state.invalidAmountFlag ? styles.AmountInputInvalid : styles.AmountInput}
              defaultValue={this.props.receiptLine.amount.toString()}
              onChange={this.amountChanged}
              min={0}
            />
            &nbsp;{Consts.CURRENCY_SUFFIX}
          </div>
        </Col>
      </Row>
    );
  }

  /**
   * Deletes receipt line.
   */
  private deleteReceiptLine = (): void => {
    this.props.deleteReceiptLine(this.props.receipt, this.props.receiptLine);
  }

  /**
   * Name change event handler.
   *
   * @param e Event details
   */
  private nameChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.value.trim();
    const amount: number = this.props.receiptLine.amount;
    this.updateReceiptLine(name, amount);
  }

  /**
   * Amount change event handler.
   *
   * @param e Event details
   */
  private amountChanged = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = this.props.receiptLine.name;
    const amount: number =  parseFloat(e.target.value.trim());
    const invalidAmountFlag: boolean = (isNaN(amount) || amount < 0);

    this.setState({invalidAmountFlag});
    this.updateReceiptLine(name, (invalidAmountFlag ? 0 : amount));
  }

  /**
   * Updates current receipt line.
   *
   * @param name New name
   * @param amount New amount
   */
  private updateReceiptLine(name: string, amount: number): void {
    const newReceiptLine: ReceiptLineEntity = new ReceiptLineEntity(
      this.props.receiptLine.id, name, amount);
    this.props.updateReceiptLine(this.props.receipt, newReceiptLine);
  }
}

// Redux-Wrapped component
export default connect(
  null,
  receiptLineActionCreators
)(ReceiptLine);
