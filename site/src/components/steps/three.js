import React from 'react';
import { Label, SplitButton } from 'react-bootstrap';

export default class StepThree extends React.Component {
    render() {
        const { options, label } = this.props;
        return (
            <div className="container">
                <h3>
                    <Label>Which column contains the populations of each city?</Label>
                </h3>
                <SplitButton
                    id="population"
                    title={(label) ? label : "Select Population Column"}
                >
                    {options}
                </SplitButton>
            </div>
        )
    }
}