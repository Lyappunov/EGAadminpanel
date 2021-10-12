import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config'

class ApiKeyCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state= {
        bscscan : ''
    }
    this.apiKeySubmit = this.apiKeySubmit.bind(this);
  }
  onChangeApiKey = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/apikey`)
      .then((response) => {
        this.setState({
            bscscan: response.data[0].bscscan
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  apiKeySubmit(e) {
    e.preventDefault();
    const newApiKey = {
        bscscan: this.state.bscscan
    }; 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/apikeyupdate/${this.state.id}`,
        newApiKey
      )
      .then((res) => {
          alert('API key successfully updated!')
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
                            <form onSubmit={this.apiKeySubmit} style={{width:'100%'}}>
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <div className="row">
                                            <div className="col-lg-3" >
                                                <span style={{float:'right',display:'flex',  alignItems:'center', height:'100%', paddingBottom:'1.5rem'}}>BSCscan API Key</span>
                                            </div>
                                            <div className="col-lg-9">
                                                <div className="form-floating mb-4">
                                                    <input type="text" className="form-control" id="bscscan" onChange={this.onChangeApiKey} value={this.state.bscscan}/>
                                                </div>
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

ApiKeyCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(ApiKeyCard);