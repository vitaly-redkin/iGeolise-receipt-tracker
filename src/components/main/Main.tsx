/**
 * The main component (to contain everything else).
 */

import * as React from 'react';
import Footer from '../footer/Footer';
import ReceiptList from '../receipt-list/ReceiptList';
import * as styles from './Main.css';

export class Main extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div className={styles.Main}>
        <Footer/>
        <ReceiptList/>
      </div>
    );
  }
}
