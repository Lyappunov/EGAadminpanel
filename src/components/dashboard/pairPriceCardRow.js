import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PairPriceCard from "./pairPriceCard";
import CoinImage from '../../images/EgaCion.png'
import {SERVER_MAIN_URL} from '../../config'


class PairPriceCardRow extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state = { records: [] };
    
    this.state = {
        btcega : '',
        usdtega : '',
        bnbega : '',
        egamos : ''
    };
    this.logo = CoinImage;

  }

  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/currentpairprice/1`)
      .then((response) => {
        
        this.setState({
            btcega: response.data[0].ega_btc,
            usdtega: response.data[0].ega_usd,
            bnbega: response.data[0].ega_bnb,
            egamos: response.data[0].ega_mos
        });
        console.log(this.state.usdtega);
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
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'BTC/EGA'
                                pairPrice = {this.state.btcega}
                                smallText = {'1 BTC = ' + 1/this.state.btcega + ' EGA'}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'USDT/EGA'
                                pairPrice = {this.state.usdtega}
                                smallText = {'1 USDT = ' + 1/this.state.usdtega + ' EGA'}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'BNB/EGA'
                                pairPrice = {this.state.bnbega}
                                smallText = {'1 BNB = ' + 1/this.state.bnbega + ' EGA'}
                            />
                        </div>
                        <div className="col-md-3">
                            <PairPriceCard 
                                cardLogo = {this.logo}
                                pairName = 'MOS/EGA'
                                pairPrice = {this.state.egamos}
                                smallText = {'1 MOS = ' + 1/this.state.ega + ' EGA'}
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