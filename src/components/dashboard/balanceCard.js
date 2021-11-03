import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import BigNumber from 'bignumber.js'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PairPriceCard from "./pairPriceCard";
import CoinImage from '../../images/EgaCion.png';
import {SERVER_MAIN_URL} from '../../config';


class BalanceCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state = { records: [] };
    
    this.state = {
        distribute : '',
        balance : '',
        totalSupply : '',
    };
    this.logo = CoinImage;

  }

  generateBigUnit (tokenDecimalInt){
    // string
    const unit = new Array(tokenDecimalInt - 1).fill(0).join("");
    const smallestUnitString = `0.${unit}1`;
    return new BigNumber(smallestUnitString);
  };

  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/egabalance`)
      .then((response) => {
          let balance = Number(response.data);
            axios
                .get(`${SERVER_MAIN_URL}/totalsupply`)
                .then((total)=>{

                    let totalSupply = Number(total.data.gah);
                    
                    let distribute = totalSupply - balance ;

                    this.setState({
                        balance : balance.toFixed(5),
                        distribute : distribute.toFixed(5),
                        totalSupply : totalSupply.toFixed(5)
                    });
                })
            
            
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div style={{marginTop:30}}>
          <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <PairPriceCard
                                title = 'GAH' 
                                pairName = {'Total Supply'}
                                pairPrice = {this.state.totalSupply}
                            />
                        </div>
                        <div className="col-md-4">
                            <PairPriceCard
                                title = 'GAH' 
                                pairName = {'Distributed token'}
                                pairPrice = {this.state.distribute}
                            />
                        </div>
                        <div className="col-md-4">
                            <PairPriceCard 
                                title = 'GAH'
                                pairName = 'Token Balance'
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

BalanceCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(BalanceCard);