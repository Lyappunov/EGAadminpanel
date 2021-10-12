import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SideBar from "../sidebar"
import HeaderBar from "../headerbar"
import {SERVER_MAIN_URL} from '../../config'
import '../../common.css'
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { addToken } from "../../actions/tokenActions";

const Record = (props) => {
  let tokenaddress = props.record.tokenaddress;
    
  let address = tokenaddress.slice(0,6) +'...'+ tokenaddress.slice(-4);
  return (
  <tr>
    <td>{props.record.tokenname}</td>
    <td>{props.record.tokensymbol}</td>
    <td>{address}</td>
    <td>{props.record.tokentype}</td>
    <td>{props.record.totalsupply}</td>
    <td>{props.record.totalsupply - 9679.04681}</td>
    <td>{9679.04681}</td>
    <td>
      <Link to={"/tokenedit/" + props.record._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
          confirmAlert({
            title: 'Confirm to delete token',
            message: 'Are you sure to delete this token?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  props.deleteToken(props.record._id);
                  window.location.href = '/tokens'
                }
              },
              {
                label: 'No',
                onClick: () => {}
              }
            ],
            overlayClassName: "overlay-custom-class-name"
          });
         
        }}
      >
        Delete
      </a>
    </td>
  </tr>
)};

class Tokens extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteToken = this.deleteToken.bind(this);
    this.state = { 
      records: [],
      openModal : false,
      errors: {}
    };
    this.getData = this.getData.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onClickHandle(e){
    e.preventDefault();
    this.setState({...this.state, openModal : true});
  }

  onCloseModal() {
    this.setState({...this.state, openModal : false});
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit(e){
    e.preventDefault();
   
    const newToken = {
        tokenname: this.state.tokenname,
        tokensymbol:this.state.tokensymbol,
        tokenaddress: this.state.tokenaddress,
        tokentype: this.state.tokentype,
        totalsupply: this.state.totalsupply
      };
      this.props.addToken(newToken);
  }
  // This method will get the data from the database.
  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  getData(){
    axios
      .get(`${SERVER_MAIN_URL}/tokens`)
      .then((response) => {
        this.setState({records: response.data, openModal:false});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteToken(id) {
    axios.delete(`${SERVER_MAIN_URL}/tokendelete/${id}`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    if(this.state.records){
        return this.state.records.map((currentrecord) => {
            return (
              <Record
                record={currentrecord}
                deleteToken={this.deleteToken}
                key={currentrecord._id}
              />
            );
          });
    }
    
  }

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
          <SideBar />
          <HeaderBar />
          <div className="container-fluid content-inner pb-0" style={{paddingLeft:'14%'}}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header" style={{paddingRight:70}}>
                                <h4 className="card-title text-white">Our Token</h4>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModalFullscreen" style={{float:'right'}} onClick={this.onClickHandle}>
                                  Add Token
                              </button>
                            </div>
                            <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                        <th>Name</th>
                                        <th>Symbol</th>
                                        <th>Address</th>
                                        <th>TokenType</th>
                                        <th>Total Supply</th>
                                        <th>Distributes</th>
                                        <th>Balance</th>
                                        <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>{this.recordList()}</tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
          </div>

          <Modal open={this.state.openModal} onClose={this.onCloseModal}>
            <div tabIndex="-1" aria-labelledby="exampleModalCenteredScrollableTitle" aria-hidden="false">
              <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <form onSubmit={this.handleSubmit} style={{width:'100%'}}>
                  <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Token</h5>
                        <button type="button" className="btn-close btn-close-white" aria-label="Close" onClick={this.onCloseModal}></button>
                    </div>
                    <div className="modal-body">
                      
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="tokenname" placeholder="Token Name" onChange={this.onChange}/>
                            <label>Token Name</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="tokensymbol" placeholder="Token Symbol" onChange={this.onChange}/>
                            <label>Token Symbol</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="tokentype" placeholder="Token Type" onChange={this.onChange}/>
                            <label>Token type</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="tokenaddress" placeholder="Token Address" onChange={this.onChange}/>
                            <label>Token Address</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="totalsupply" placeholder="Totalsupply" onChange={this.onChange}/>
                            <label>Total Supply</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onCloseModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
          </Modal>

      </div>
    );
  }
}

Tokens.propTypes = {
    addToken: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps,
    { addToken }
)(Tokens);
