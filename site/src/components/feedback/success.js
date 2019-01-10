import React from 'react';
import { Alert, Table, Button } from 'react-bootstrap';

export default class Success extends React.Component {

    render() {
        return (
            <>
                <div className="container">
                    <Alert bsStyle="success" onDismiss={this.handleDismiss}>
                        <h4>Report generated.</h4>
                        <p>
                            You can do another, if you like!
                        </p>
                        <p>
                            <Button onClick={this.props.action}>
                                Do Another
                            </Button>
                        </p>
                    </Alert>
                </div>
                <div className="container">
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Stat</th>
                                <th>City</th>
                                <th>Population</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.stats.map((d, i) => {
                                return(
                                    <tr key={i}>
                                        <td>{i+1}</td>
                                        <td>{d.stat}</td>
                                        <td>{d.city}</td>
                                        <td>{d.population}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </>
        )
    }
}