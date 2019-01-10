import React from 'react';
import { Label, SplitButton } from 'react-bootstrap';

export default class StepTwo extends React.Component {

    render() {
        const { options, label } = this.props;
        return (
            <div className="container">
                <h3>
                    <Label>Which column contains the names of the cities?</Label>
                </h3>
                <SplitButton
                    id="city"
                    title={(label) ? label : "Select City Column"}
                >
                    {options}
                </SplitButton>
            </div>
        )
    }
}