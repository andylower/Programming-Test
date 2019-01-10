import React from 'react';
import { Label, Image, Button } from 'react-bootstrap';
import ImageSrc from './../assets/csv.png';

//Import function for upload
import { fileHeaders } from './../../functions'

export default class StepOne extends React.Component {

    resetParent = () => {
        //if another csv is chose, we reset the steps
        this.props.parent.setState({
            stepTwo: false,
            stepThree: false,
            finished: false
        });
    }

    readFile = () => {
        var parent = this.props.parent;
        parent.setState({
            success: false,
            error: false,
            loading: {
                bool: true,
                msg: 'Reading the file...'
            }
        });
        fileHeaders()
        .then(results => {
            parent.setState({
                columns: results,
                loading: {
                    bool: false,
                    msg: ''
                },
                stepTwo: true,
                stepThree: false,
                finished: false
            });
        })
        .catch((err) => {
            parent.setState({
                error: true,
                errorMsg: err.message
            })
        })
    }

    render() {
        return (
            <div className="container">
                <h3>
                    <Label>Let's get started.</Label>
                </h3>
                <div className="mt-20">
                    <Image src={ImageSrc} />
                </div>
                <div className="mt-20">
                    <Button 
                        onClick={this.readFile}
                        bsStyle="primary"
                    >Get headers from worldcities.csv</Button>
                </div>
            </div>
        )
    }
}