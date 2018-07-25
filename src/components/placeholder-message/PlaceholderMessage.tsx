/**
 * The placeholder message component.
 */

import * as React from 'react';
import { Col, Row } from 'reactstrap';
import * as styles from './PlaceholderMessage.css';

// Component properties type
interface IPlaceholderMessageProps {
  message: string;
}

export class PlaceholderMessage extends React.PureComponent<IPlaceholderMessageProps, {}> {
  public render(): JSX.Element {
    return (
      <Row className={styles.placeholderRow}>
        <Col className='text-center my-auto pr-0' >
          <div className={styles.PlaceholderText}>{this.props.message}</div>
        </Col>
      </Row>
    );
  }
}
