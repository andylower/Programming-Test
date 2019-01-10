import React from 'react';
import { Alert } from 'react-bootstrap';

export default class Error extends React.Component {

    render() {
        return (
            <div className="container">
                <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
                    <h4>Oh snap! You got an error.</h4>
                    <p>
                        {this.props.message}
                    </p>
                </Alert>
            </div>
        )
    }
}