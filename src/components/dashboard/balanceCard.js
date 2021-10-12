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
            const decimal = 16;
            const bigValue = new BigNumber(response.data.egaBalance);
            const bigTokenDecimal = this.generateBigUnit(decimal);
            const bigHumanValue = bigValue.dividedBy(
                new BigNumber(1).dividedBy(bigTokenDecimal)
            );
            let balance = bigHumanValue;
            let distribute = '';
                console.log('KKKKKKKKKKKKKKKKK', balance )
            axios
                .get(`${SERVER_MAIN_URL}/totalsupply`)
                .then((total)=>{

                    const bigValueTotal = new BigNumber(total.data.totalsupply);
                    const bigTokenDecimalTotal = this.generateBigUnit(decimal);
                    const bigHumanValueTotal = bigValueTotal.dividedBy(
                        new BigNumber(1).dividedBy(bigTokenDecimalTotal)
                    );
                    distribute = Number(bigHumanValueTotal) - Number(balance)

                    this.setState({
                        balance : balance.toFixed(5),
                        distribute : distribute.toFixed(5),
                        totalSupply : bigHumanValueTotal.toFixed(5)
                    });
                    console.log('LLLLLLLLLLLLLLLLLLLLLLLL', distribute)
                })
            
            
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This following section will display the table with the records of individuals.
  render() {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', this.state.totalSupply)
    return (
      <div style={{marginTop:30}}>
          <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <PairPriceCard
                                title = 'EGA' 
                                pairName = {'Total Supply'}
                                pairPrice = {this.state.totalSupply}
                            />
                        </div>
                        <div className="col-md-4">
                            <PairPriceCard
                                title = 'EGA' 
                                pairName = {'Distributed token'}
                                pairPrice = {this.state.distribute}
                            />
                        </div>
                        <div className="col-md-4">
                            <PairPriceCard 
                                title = 'EGA'
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