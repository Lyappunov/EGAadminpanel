import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
import SideBar from "../sidebar"
import HeaderBar from "../headerbar"
import {SERVER_MAIN_URL} from '../../config'
 
class TokenEdit extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.state = {
        tokenname: "",
        tokensymbol: "",
        tokentype: "",
        tokenaddress: "",
        totalsupply: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/tokens/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
            tokenname: response.data.tokenname,
            tokensymbol: response.data.tokensymbol,
            tokentype: response.data.tokentype,
            tokenaddress: response.data.tokenaddress,
            totalsupply: response.data.totalsupply,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
 
  // These methods will update the state properties.
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    editClose() {
        window.location.href='/tokens'
    }
  // This function will handle the submission.
  handleSubmit(e) {
    e.preventDefault();
    const newEditedToken = {
        tokenname: this.state.tokenname,
        tokensymbol: this.state.tokensymbol,
        tokentype: this.state.tokentype,
        tokenaddress: this.state.tokenaddress,
        totalsupply: this.state.totalsupply,
    };
    console.log(newEditedToken);
 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/tokenupdate/${this.props.match.params.id}`,
        newEditedToken
      )
      .then((res) => {
          alert('Token successfully updated!')
          window.location.href = '/tokens'
        });
 
  }
 
  // This following section will display the update-form that takes the input from the user to update the data.
  render() {
    return (
        <div>
            <SideBar />
            <HeaderBar />
            <div className="container-fluid content-inner pb-0" style={{paddingLeft:'14%'}}>
                <div className="row">
                    <div className="col-sm-10">
                        <div className="card" style={{paddingBottom:35}}>
                            <div className="card-header">
                                <h4 className="card-title text-white">Update Token {this.state.name}</h4>
                            </div>
                            <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                                <form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                                    <div className="modal-content">
                                        
                                        <div className="modal-body">
                                        
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control" id="tokenname" placeholder="Token Name" onChange={this.onChange} value={this.state.tokenname}/>
                                                <label>Token Name</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control" id="tokensymbol" placeholder="Token Symbol" onChange={this.onChange} value={this.state.tokensymbol}/>
                                                <label>Token Symbol</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control" id="tokentype" placeholder="Token Type" onChange={this.onChange} value={this.state.tokentype}/>
                                                <label>Token type</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control" id="tokenaddress" placeholder="Token Address" onChange={this.onChange} value={this.state.tokenaddress}/>
                                                <label>Token Address</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input type="text" className="form-control" id="totalsupply" placeholder="Totalsupply" onChange={this.onChange} value={this.state.totalsupply}/>
                                                <label>Total Supply</label>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" onClick={this.editClose}>Close</button>
                                            <button type="submit" className="btn btn-primary">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    );
  }
}
 
// You can get access to the history object's properties and the closest <Route>'s match via the withRouter
// higher-order component. This makes it easier for us to edit our records.
 
export default withRouter(TokenEdit);