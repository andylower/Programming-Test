import React, { Component } from 'react';
import { Jumbotron, MenuItem } from 'react-bootstrap';

// import style
import './style/main.css';

// import error/success alerts and loading spinner
import Error from './components/feedback/error';
import Success from './components/feedback/success';
import Loading from './components/loading';

// import steps
import StepOne from './components/steps/one';
import StepTwo from './components/steps/two';
import StepThree from './components/steps/three';
import Download from './components/steps/finished';

// import functions
import { generateFile } from './functions';

class App extends Component {

  state = {
    rows: [],
    columns: [],
    stepTwo: false,
    stepThree: false,
    finished: false,
    error: false,
    errorMsg: '',
    loading: {
      bool: false,
      msg: ''
    },
    cityLabel: '',
    popLabel: '',
    blanks: "1",
    zeros: "1",
    success: false,
    showReport: false,
    stats: []
  }

  resetLoading = () => {
    this.setState({
      loading: {
        bool: false,
        msg: ''
      }
    });
  }

  resetOptions = () => {
    this.setState({
      stepTwo: false,
      stepThree: false,
      finished: false,
      cityLabel: '',
      popLabel: '',
      success: false,
      blanks: "1"
    });
  }

  downloadStats = () => {
    this.resetOptions();
    this.setState({
      loading: {
        bool: true,
        msg: "We're running the numbers and preparing your file..."
      }
    });
    var { popLabel, cityLabel, blanks, zeros } = this.state;
    if (popLabel && cityLabel) {
      var query = `city=${cityLabel}&pop=${popLabel}&remove=${blanks}&zeros=${zeros}`;
      generateFile(query)
      .then((result) => {
        if (!result.message) {
          this.resetLoading();
          this.resetOptions();
          this.setState({
            success: true,
            showReport: true,
            stats: result
          });
        } else {
          this.resetLoading();
          this.setState({
            error: true,
            errorMsg: result.message
          });
          this.resetOptions();
        }
      })
      .catch((err) => {
        this.resetLoading();
        this.setState({
          error: true,
          errorMsg: err.message
        });
      });
    } else {
      this.resetLoading();
      this.setState({
        error: true,
        errorMsg: "Please specify the city and population columns in step 2 and 3."
      });
    }
  }

  handleChange = (ref, value) => {
    var id = (ref === "city") ? "cityLabel" : "popLabel";
    var step = (ref === "city") ? "stepThree" : "finished";
    this.setState({
        [id]: value,
        [step]: true
    });
  }

  render() {

    const { 
      error, columns, stepTwo, stepThree, finished, 
      errorMsg, loading, cityLabel, popLabel, success,
      stats
    } = this.state;

    //Build column options once as use in step 2 and 3
    const cityOptions = columns.map((col, i) => {
      return (
        <MenuItem 
          key={i} 
          eventKey={col}
          onSelect={(val) => this.handleChange("city", val)}
        >
          {col}
        </MenuItem>
      )
    });

    const popOptions = columns.map((col, i) => {
      return (
        <MenuItem 
          key={i} 
          eventKey={col}
          onSelect={(val) => this.handleChange("pop", val)}
        >
          {col}
        </MenuItem>
      )
    });

    return (
      <div>
        <Jumbotron>
          <div className="container text-center">
            <h1>Population Report Generator</h1>
            <p>
              Download a simple report to show the average population and the smallest and largest cities.
            </p>
          </div>
        </Jumbotron>
        {loading.bool && <Loading loading={loading}/> }
        {!loading.bool &&
          <div>
            {error ? <Error message={errorMsg}/> : null}
            {success ? <Success stats={stats} action={this.resetOptions}/> : null}
            {!success ? <StepOne parent={this} /> : null}
            {stepTwo ? <StepTwo options={cityOptions} label={cityLabel}/> : null}
            {stepThree ? <StepThree options={popOptions} label={popLabel}/> : null}
            {finished ? <Download parent={this} action={this.downloadStats}/> : null}
          </div>
        }
      </div>
    );
  }
}

export default App;
