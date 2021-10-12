import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import SideBar from "../sidebar";
import HeaderBar from "../headerbar";
import TokenPriceCard from './tokenPriceCard'
import LimitedAmount from "./limitedAmount";
import ApiKeyCard from "./apiKeyCard";




class Setting extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    
    this.state = { records: [] };
    this.state = {
        currentRecord: {
            name: '',
            phonenumber: '',
            password: ''
        }
    };

  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
        <div>
            <SideBar />
            <HeaderBar />
            <div className="container-fluid content-inner pb-0" style={{paddingLeft:'14%'}}>
                <div className="row" style={{margin:'auto'}}>
                    <div className="col-lg-6">
                        <TokenPriceCard/>
                    </div>
                    <div className="col-lg-6">
                        <LimitedAmount/>
                    </div>
                </div>
                <div className="row" style={{margin:'auto'}}>
                    <div className="col-lg-11">
                        <ApiKeyCard />
                    </div>
                </div>
                
            </div> 
        </div>
    );
  }
}

Setting.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Setting);