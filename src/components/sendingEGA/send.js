import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import { withRouter } from "react-router";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import SideBar from "../sidebar"
import HeaderBar from "../headerbar"
import {SERVER_MAIN_URL} from '../../config'
import './index.scss';
 
class Send extends Component {
  // This is the constructor that stores the data.
  constructor(props) {
    super(props);
 
    this.state = {
        name: "",
        walletaddress: "",
        selectedToken:'gah',
        amount:0,
        errors: {}
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeSelectToken = this.handleChangeSelectToken.bind(this)
  }

  getCurrentDate () {
    var today = new Date();
    var thisyear = today.getFullYear();
    var thisMonth = today.getMonth()<9?'0'+(today.getMonth() + 1):(today.getMonth() + 1);
    var thisDay = today.getDate()<10?'0'+(today.getDate()):today.getDate();
    var thisMonthToday = thisyear+'-'+thisMonth+'-'+thisDay;
    var Hours = today.getHours()<10?'0'+today.getHours():today.getHours();
    var Minutes = today.getMinutes()<10?'0'+today.getMinutes():today.getMinutes();
    var Seconds = today.getSeconds()<10?'0'+today.getSeconds():today.getSeconds();
    var time = Hours+ ":" + Minutes + ":" + Seconds;
    var currentDateTime = thisMonthToday + 'T' + time + 'Z';
    return currentDateTime ;
  }

  handleChangeSelectToken (event){
    this.setState({selectedToken : event.target.value});
  }
  // This will get the record based on the id from the database.
  componentDidMount() {
    axios
      .get(`${SERVER_MAIN_URL}/record/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({
          name: response.data.name,
          walletaddress: 'gah-' + response.data._id
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  editClose() {
    window.location.href='/sendingtoken'
  }
 
  // These methods will update the state properties.
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

 
  // This function will handle the submission.
  onSubmit(e) {
    e.preventDefault();
    let sendingDate = this.getCurrentDate();
    const newSendigInfo = {
      name: this.state.name,
      walletaddress: this.state.walletaddress,
      tokenName : this.state.selectedToken,
      sendingDate : sendingDate,
      amount : this.state.amount
    }; 
    // This will send a post request to update the data in the database.
    axios
      .post(
        `${SERVER_MAIN_URL}/record/sendtoken`,
        newSendigInfo
      )
      .then((res) => {
        console.log(res.data);
        window.location.href='/sendingtoken'
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
                  <div className="col-sm-9" style={{margin:'auto'}}>
                      <div className="card" style={{paddingBottom:35}}>
                          <div className="card-header">
                              <h4 className="card-title text-white">Sendign token to {this.state.name}</h4>
                          </div>
                          <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                              <form onSubmit={this.onSubmit} style={{width:'100%'}}>
                                  <div className="modal-content">
                                      <div className="modal-body">
                                          <div className="form-floating mb-4">
                                              <input type="text" className="form-control" id="name" placeholder="User Name" onChange={this.onChange} value={this.state.name}/>
                                              <label>User Name</label>
                                          </div>
                                          <div className="form-floating mb-4">
                                              <input type="text" className="form-control" id="walletaddress" placeholder="To wallet Address" onChange={this.onChange} value={this.state.walletaddress}/>
                                              <label>To Wallet Address</label>
                                          </div>
                                          <div className='textfield'>
                                              <p style={{display:'inline'}}>From Token : </p>
                                              <FormControl sx={{ m: 1, minWidth: 250 }}>
                                                  <Select
                                                      value={this.state.selectedToken}
                                                      onChange={this.handleChangeSelectToken}
                                                      displayEmpty
                                                      inputProps={{ 'aria-label': 'Without label' }}
                                                      
                                                  >
                                                      <MenuItem value=''>
                                                          <em>None</em>
                                                      </MenuItem>
                                                      <MenuItem value={'gah'}>GAH TOKEN</MenuItem>
                                                      <MenuItem value={'efranc'}>E-FRANC</MenuItem>
                                                  </Select>
                                              </FormControl>
                                              <TextField id="amount" type="number" variant="outlined" value={this.state.amount} onChange={this.onChange} min={50}/>
                                              <p style={{display:'inline'}}> &nbsp; {this.state.selectedToken.toUpperCase()}</p>
                                              
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
 
export default withRouter(Send);