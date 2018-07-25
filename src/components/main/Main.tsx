/**
 * The main component (to contain everything else).
 *
 * This component is connected to Redux because we need to scroll down
 * to the last added receipt.
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, CardFooter, Container } from 'reactstrap';
import { ReceiptListEntity } from '../../model/ReceiptListEntity';
import { IApplicationState } from '../../store';
import Footer from '../footer/Footer';
import ReceiptList from '../receipt-list/ReceiptList';
import * as styles from './Main.css';

// Component properties type
type MainProps =
  (ReceiptListEntity
   & React.Props<{}>);

class Main extends React.PureComponent<MainProps, {}> {
  // Reference of the dummy DIV to scroll to
  private dummyDivRef: HTMLDivElement;

  public render(): JSX.Element {
    return (
      <Container className={styles.Container}>
          <Card className='w-100 h-100'>
            <CardBody className={styles.CardBody}>
              <ReceiptList/>
              <div ref={this.setDummyDivRef}></div>
            </CardBody>
            <CardFooter className='pr-0'>
              <Footer/>
            </CardFooter>
          </Card>
      </Container>
    );
  }

  /**
   * Called when component is updated.
   *
   * @param prevProps Component previous properties
   */
  public componentDidUpdate(prevProps: MainProps) {
    if (prevProps.summary.count < this.props.summary.count) {
      this.scrollToBottom();
    }
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
   * Scrols the receipt list to bottom.
   */
  private scrollToBottom = () => {
    this.dummyDivRef.scrollIntoView({ behavior: 'smooth' });
  }
}

// Redux mapStateToProps function
function mapStateToProps(state: IApplicationState) : ReceiptListEntity {
  return {...state.receiptList.receiptList};
}

// Redux-Wrapped component
export default connect(
  mapStateToProps
)(Main);
