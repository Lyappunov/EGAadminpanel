import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config'



class TokenPriceCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state= {
        ega : '',
        mos : '',
        id : '',
        calculatedPrice : '',
        displayPrice:''
    }
    this.tokenPriceSubmit = this.tokenPriceSubmit.bind(this);
  }
  onChangeTokenPrice = e => {
    this.setState({ [e.target.id]: e.target.value });
    if(e.target.id == 'ega'){
        this.setState({displayPrice : (Number(this.state.calculatedPrice) + Number(e.target.value))})
    }
  };

  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/tokenprice`)
      .then((response) => {
        this.setState({
            ega: response.data[0].ega,
            mos: response.data[0].mos,
            id: response.data[0]._id,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${SERVER_MAIN_URL}/egaprice`)
      .then((res)=>{
          this.setState({calculatedPrice: res.data, displayPrice : Number(res.data) + Number(this.state.ega)})
      })
  }

  tokenPriceSubmit(e) {
    e.preventDefault();
    const newTokenPrice = {
        ega: this.state.ega,
        mos: this.state.mos
    }; 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/tokenpriceupdate/${this.state.id}`,
        newTokenPrice
      )
      .then((res) => {
          alert('Token Price successfully updated!')
        });
 
  }
  render() {
    return (
        <div>
            <div className="row">
                <div className="col-sm-12" style={{margin:'auto'}}>
                    <div className="card" style={{paddingBottom:35}}>
                        <div className="card-header">
                            <h4 className="card-title text-white">Token Price</h4>
                        </div>
                        <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                            <form onSubmit={this.tokenPriceSubmit} style={{width:'100%'}}>
                                <div className="modal-content">
                                    <div className="modal-header" style={{display:'block'}}>
                                    
                                        <span>Calculated Ega Coin price : &nbsp;&nbsp;&nbsp;
                                            {this.state.calculatedPrice == ''?
                                            (<div className="spinner-border text-primary" role="status" style={{width:'1rem', height:'1rem'}}> </div>):
                                            (<span style={{color:'yellow', fontSize:22}}>{this.state.calculatedPrice}</span>)}   
                                        </span>
                                        <br/><br/>
                                        <span>Ega Coin price to display : &nbsp;&nbsp;&nbsp;
                                            {this.state.calculatedPrice == ''?
                                            (<div className="spinner-border text-primary" role="status" style={{width:'1rem',height:'1rem'}}> </div>):
                                            (<span style={{color:'green', fontSize:22}}>{(this.state.displayPrice).toFixed(11)}</span>)}   
                                        </span>
                                    </div>
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-4" >
                                                <span style={{float:'right',display:'flex',  alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>EGA Coin</span>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="ega" onChange={this.onChangeTokenPrice} value={this.state.ega}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <span style={{display:'flex',  alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>USD</span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <span style={{float:'right',display:'flex', alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>MOS Token</span>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" id="mos" onChange={this.onChangeTokenPrice} value={this.state.mos}/>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <span style={{display:'flex', alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>EUR</span>
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

TokenPriceCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(TokenPriceCard);