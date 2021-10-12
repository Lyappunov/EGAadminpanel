import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import CircleChart from '../../images/circlechart.png'



class EarningCard extends Component {
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

  componentDidMount(){
    const script = document.createElement("script");
    script.async = true;
    script.src = "./libs.min.js";
    script.onload = () => this.scriptLoaded();
  }

  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
        <div>
            <div className="col-md-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between flex-wrap">
                    <div className="header-title">
                        <h4 className="card-title">Earnings</h4>            
                    </div>   
                    <div className="dropdown">
                        <a href="#" className="btn btn-soft-secondary btn-sm dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            This Week
                        </a>
                    </div>
                    </div>
                    <div className="card-body">
                    <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <div id="multiple-radialbar-chart" className="col-md-8 col-lg-8 multiple-radialbar-chart" style={{textAlign:'center'}}>
                            <img src={CircleChart} />
                        </div>
                        <div className="d-grid gap col-md-4 col-lg-4">
                            <div className="d-flex align-items-start">
                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#00EC42">
                                <g>
                                    <circle cx="12" cy="12" r="8" fill="#00EC42"></circle>
                                </g>
                                </svg>
                                <div className="ms-3">
                                <span className="text-light">Ega Coin</span>
                                </div>
                            </div>
                            <div className="d-flex align-items-start">
                                <svg className="mt-2" xmlns="http://www.w3.org/2000/svg" width="14" viewBox="0 0 24 24" fill="#FF2E2E">
                                <g>
                                    <circle cx="12" cy="12" r="8" fill="#FF2E2E"></circle>
                                </g>
                                </svg>
                                <div className="ms-3">
                                <span className="text-light">MOS token</span>
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

EarningCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(EarningCard);