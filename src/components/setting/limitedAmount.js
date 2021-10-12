import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config'



class LimitedAmount extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state= {
        saleMAX : '',
        buyMIN : '',
        id : ''
    }
    this.limitedAmountSubmit = this.limitedAmountSubmit.bind(this);
  }
  onChangeLimitedAmount = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/limitamount`)
      .then((response) => {
        this.setState({
            saleMAX: response.data[0].saleMAX,
            buyMIN: response.data[0].buyMIN,
            id: response.data[0]._id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  limitedAmountSubmit(e) {
    e.preventDefault();
    const newTokenPrice = {
        saleMAX: this.state.saleMAX,
        buyMIN: this.state.buyMIN
    }; 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/limitamountupdate/${this.state.id}`,
        newTokenPrice
      )
      .then((res) => {
          alert('Limited Amount successfully updated!')
        });
 
  }
  render() {
    return (
        <div>
            <div className="row">
                <div className="col-sm-12" style={{margin:'auto'}}>
                    <div className="card" style={{paddingBottom:35}}>
                        <div className="card-header">
                            <h4 className="card-title text-white">Limited Amount</h4>
                        </div>
                        <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                            <form onSubmit={this.limitedAmountSubmit} style={{width:'100%'}}>
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <span style={{float:'right',display:'flex',  alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>Sale Maximum Amount</span>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-floating mb-4">
                                                    <input type="text" className="form-control" id="saleMAX" onChange={this.onChangeLimitedAmount} value={this.state.saleMAX}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <span style={{display:'flex',  alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>USD</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <span style={{float:'right',display:'flex', alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>Buy Minimum Amount</span>
                                            </div>
                                            <div className="col-lg-5">
                                                <div className="form-floating mb-4">
                                                    <input type="text" className="form-control" id="buyMIN" onChange={this.onChangeLimitedAmount} value={this.state.buyMIN}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <span style={{display:'flex', alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>EGA</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Save</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
              </div>          
        </div>
    );
  }
}

LimitedAmount.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(LimitedAmount);