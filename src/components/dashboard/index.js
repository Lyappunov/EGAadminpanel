import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../sidebar";
import HeaderBar from "../headerbar";
import {SERVER_MAIN_URL} from '../../config';
// import PriceLongcard from './priceLongcard'
import PairePriceCardRow from './pairPriceCardRow';
import BalanceCard from './balanceCard';
import CandleChart from './candleChart';
import HolderCard from './holderCard';
import HolderCardEfranc from './holderCardEfranc';
import EarningCard from './earningCard';



class Dashboard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    
    this.state = { 
        users: [],
        usersFlag : false
    };
    this.state = {
        currentRecord: {
            name: '',
            phonenumber: '',
            password: ''
        }
    };

  }

  getUsers(){
    axios
      .get(`${SERVER_MAIN_URL}/record/`)
      .then((response) => {
        this.setState({ users: response.data, usersFlag : true});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

 componentDidMount(){
     this.getUsers();
 }
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
          <SideBar />
          <HeaderBar />
          <div className="container-fluid content-inner pb-0" style={{paddingLeft:'14%'}}>
              {/* <PriceLongcard/> */}
              <PairePriceCardRow />
              <CandleChart />
              <BalanceCard />
              <div className='row'>
                  <div className='col-lg-6'>
                      {this.state.usersFlag == true && (
                        <HolderCard users={this.state.users}/>
                      )}
                      
                  </div>
                  <div className='col-lg-6'>
                    {this.state.usersFlag ==  true && (
                        <HolderCardEfranc users={this.state.users}/>
                      )}
                  </div>
              </div>
          </div>
          
      </div>
    );
  }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Dashboard);