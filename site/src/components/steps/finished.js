import React from 'react';
import { Label, Button, Radio } from 'react-bootstrap';

export default class Download extends React.Component {
    
    handleChange = (e) => {
        this.props.parent.setState({
            blanks: e.target.value
        });
    }

    handleZeroChange = (e) => {
        this.props.parent.setState({
            zeros: e.target.value
        });
    }

    render() {
        return (
            <div className="container pb-50">
                <h3>
                    <Label>You can now prepare and download your report below.</Label>
                </h3>
                <div className="mt-20">
                    <Radio 
                        name="removeBlanks" 
                        inline 
                        defaultChecked 
                        value="1"
                        onChange={ e => this.handleChange(e)}
                    >
                        Remove blank populations
                    </Radio>{' '}
                    <Radio 
                        name="removeBlanks" 
                        inline 
                        value="0"
                        onChange={ e => this.handleChange(e)}
                    >
                        Treat blanks as the number 0
                    </Radio>
                </div>
                <div className="mt-20">
                    <Radio 
                        name="removeZeros" 
                        inline 
                        value="1"
                        defaultChecked
                        onChange={ e => this.handleZeroChange(e)}
                    >
                        Include populations set to 0
                    </Radio>{' '}
                    <Radio 
                        name="removeZeros" 
                        inline  
                        value="0"
                        onChange={ e => this.handleZeroChange(e)}
                    >
                        Remove populations set to 0
                    </Radio>
                </div>
                <div className="mt-20">
                    <Button bsStyle="success" bsSize="large" onClick={this.props.action}>Download</Button>
                </div>
            </div>
        )
    }
}