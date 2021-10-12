import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PairPriceCard from "./pairPriceCard";
import CoinImage from '../../images/EgaCion.png'


class PairPriceCardRow extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state = { records: [] };
    
    this.state = {
        distribute : '32095319.00000',
        balance : '967904681.00000'
    };
    this.logo = CoinImage;

  }


  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div style={{marginTop:30}}>
          <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3">
                            <PairPriceCard
                                title = 'EGA' 
                                pairName = {'Distributed token'}
                                pairPrice = {this.state.distribute}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                title = 'EGA'
                                pairName = 'Wallet Balance'
                                pairPrice = {this.state.balance}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard
                                title = 'MOS' 
                                pairName = {'Distributed token'}
                                pairPrice = {this.state.distribute}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                title = 'MOS'
                                pairName = 'Wallet Balance'
                                pairPrice = {this.state.balance}
                            />
                        </div>
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

PairPriceCardRow.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(PairPriceCardRow);