import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Avatar2 from "../../images/avatars/02.png";
import Avatar3 from "../../images/avatars/03.png";
import Avatar4 from "../../images/avatars/04.png";
import Avatar5 from "../../images/avatars/05.png";
import Avatar6 from "../../images/avatars/06.png";



class HolderCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state= {
        cardLogo : props.cardLogo,
        pairName : props.pairName,
        pairPrice : props.pairPrice
    }
    if(props.title) this.state={
        title : props.title,
        cardLogo : props.cardLogo,
        pairName : props.pairName,
        pairPrice : props.pairPrice
    }
  }

  

  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
        <div>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between flex-wrap">
                        <div className="header-title">
                            <h4 className="card-title">Top Holders (5)</h4>          
                        </div>
                    </div>
                    <div className="card-body">
                        <div className= "d-grid grid-cols-5 gap-card mb-4">
                            <div className="">
                                <img src={Avatar2} className="img-fluid avatar avatar-30px avatar-rounded" alt="img36"/>
                            </div>
                            <div className="">
                                <img src={Avatar3} className="img-fluid avatar avatar-30px avatar-rounded" alt="img37"/>
                            </div>
                            <div className="">
                                <img src={Avatar4} className="img-fluid avatar avatar-30px avatar-rounded" alt="img38"/>
                            </div>
                            <div className="">
                                <img src={Avatar5} className="img-fluid avatar avatar-30px avatar-rounded" alt="img39"/>
                            </div>
                            <div className="">
                                <img src={Avatar6} className="img-fluid avatar avatar-30px avatar-rounded" alt="img40"/>
                            </div>
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text" id="basic-addon3">Amount</span>
                            <input type="text" className="form-control col-lg-8" placeholder="126.5" aria-label="Recipient's username" aria-describedby="basic-addon3"/>
                        </div>  
                        <div className="d-grid grid-cols-1 gap-card justify-content-between">
                            <div>
                                <button type="button" className="btn btn-primary w-100">
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.74074 8.25926L2 6.7037L16 1M8.74074 8.25926L10.8148 15L16 1M8.74074 8.25926L16 1" stroke="white"/>
                                    </svg>
                                    <span className="ms-2">Transfer Now</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

HolderCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(HolderCard);