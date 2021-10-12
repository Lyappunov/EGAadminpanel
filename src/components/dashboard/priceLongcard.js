import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import {SERVER_MAIN_URL} from '../../config'
import CoinImage from '../../images/EgaCion.png'



class PriceLongCard extends Component {
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


  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
          <div className="row">
                <div className="col-lg-12">
                    <div className="col-xl-9 d-none d-md-block">
                        <div className="card mb-xl-0">
                            <div className="card-body">
                                <div className="d-flex justify-content-between flex-wrap">
                                    <div className="d-flex" style={{width:"100%"}}>
                                        <img src={CoinImage} className="img-fluid avatar avatar-40 avatar-rounded" alt="img8"/>
                                        <div className="dropdown mt-2 ms-2">
                                            <a href="#" className="text-white" id="dropdownMenuButton4" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span className="mt-2">Ega Coin</span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </a>
                                            <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton4">
                                                <li><a href="#" className="dropdown-item"><img src={CoinImage} className="img-fluid avatar avatar-30 avatar-rounded" alt="img71"/> Ega Coin</a></li>
                                                <li><a href="#" className="dropdown-item"><img src={CoinImage} className="img-fluid avatar avatar-30 avatar-rounded" alt="img72" /> Mos Token</a></li>
                                                
                                            </ul>
                                        </div>
                                        <div className="dropdown mt-2 ms-2">
                                            
                                        </div>
                                        <div  style={{width:'70%'}}>
                                            <div className="d-flex-common justify-content-evenly-common flex-1">
                                                <span className=" text-primary-price">
                                                    37,390.00<br/>
                                                    <small>$37,390.00</small>
                                                </span>
                                                <span className=" text-primary-price">
                                                    129.51+0.8%<br/>
                                                    <small>24th changes</small>
                                                </span>
                                                <span className="text-primary-price" >
                                                    37,440.01<br/>
                                                    <small>24th high</small>
                                                </span>
                                                <span className="text-primary-price">
                                                    37,327.30<br/>
                                                    <small>24th low</small>
                                                </span>
                                                <span className="d-none">
                                                    37,390.00<br/>
                                                    <small>24th volume(BTC)</small>
                                                </span>                     
                                            </div>
                                        </div>
                                        <div className="d-flex-common align-items-center justify-content-between">
                                            <span className="">
                                                <svg width="32" height="32" viewBox="0 0 34 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <rect x="6" width="1" height="53" rx="0.5" fill="white"/>
                                                <rect x="0.5" y="9.5" width="12" height="34" rx="1.5" fill="#202022"/>
                                                <rect x="0.5" y="9.5" width="12" height="34" rx="1.5" stroke="white"/>
                                                <rect x="27" width="1" height="53" rx="0.5" fill="white"/>
                                                <rect x="21.5" y="13.5" width="12" height="25" rx="1.5" fill="#202022"/>
                                                <rect x="21.5" y="13.5" width="12" height="25" rx="1.5" stroke="white"/>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

PriceLongCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(PriceLongCard);