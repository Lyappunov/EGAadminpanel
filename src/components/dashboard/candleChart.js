import React, { Component } from "react";

import PropTypes from "prop-types";
import {connect} from "react-redux";
import './style.scss';
import TradingViewChart from '../tradingView';
import { options } from '../tradingView/tv'

class CandleChart extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor() {
    super();
    this.state = {
        ...options,
      }
  }


  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
      
    return (
        <div className="col-lg-12" style={{marginTop:30}}>
            <div className="card">
                <div className="card-header d-flex justify-content-between flex-wrap">
                    <div className="header-title">
                        <h4 className="card-title mb-2">Market Overview</h4>
                        <p className="mb-0">Pictorial monthly analytics of market.</p>          
                    </div>
                    
                </div>
                
                <div className="card-body">
                    <div className="trading-chart">
                        <TradingViewChart cOptions={this.state} />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

CandleChart.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(CandleChart);