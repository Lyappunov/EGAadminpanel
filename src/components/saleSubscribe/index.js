import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import SideBar from "../sidebar"
import HeaderBar from "../headerbar"
import {SERVER_MAIN_URL} from '../../config'
import '../../common.css'

const Record = (props) => {
    let walletaddress = props.record.walletAddress;
    
    let address = walletaddress.slice(0,6) +'...'+ walletaddress.slice(-4);
    return (
  <tr >
    <td>{props.record.subscribeDate}</td>
    <td>{props.record.subscriber}</td>
    <td>{address}</td>
    <td>{props.record.tokenName}</td>
    <td>{props.record.amount}</td>
    <td>{Number(props.record.usdPrice).toFixed(2)} USD ( {Number(props.record.eurPrice).toFixed(2)} EUR)</td>
    <td>{props.record.paymentKind}</td>
    <td>
      <a
        href="#"
        onClick={() => {
            confirmAlert({
              title: 'Confirm to Pay',
              message: 'Are you sure to pay?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    // props.deleteToken(props.record._id);
                    window.location.href = '/subscribe'
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
        Pay | 
      </a>
      <a
        href="#"
        onClick={() => {
            confirmAlert({
              title: 'Confirm to Reserve',
              message: 'Are you sure to reserve?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    // props.deleteToken(props.record._id);
                    window.location.href = '/subscribe'
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
        &nbsp; Reserve
      </a>
    </td>    
  </tr>
)};

class SaleSubscribe extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { 
      records: [],
      subscribeData:[]
    };
    this.getSubscribeData = this.getSubscribeData.bind(this);
  }


  // This method will get the data from the database.
  componentDidMount() {
    this.getSubscribeData();
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  getSubscribeData(){
    axios
      .get(`${SERVER_MAIN_URL}/subscribe`)
      .then((response) => {
        this.setState({subscribeData: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // This method will delete a record based on the method
  deleteRecord(id) {
    axios.delete(`${SERVER_MAIN_URL}/${id}`).then((response) => {
      console.log(response.data);
    });

    this.setState({
      record: this.state.records.filter((el) => el._id !== id),
    });
  }

  // This method will map out the users on the table
  recordList() {
    if(this.state.subscribeData){
        return this.state.subscribeData.map((currentrecord) => {
            return (
              <Record
                record={currentrecord}
                deleteRecord={this.deleteRecord}
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
                                <h4 className="card-title text-white">Transaction List</h4>
                            </div>
                            <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                        <th>Date</th>
                                        <th>Subscriber</th>
                                        <th>Wallet</th>
                                        <th>Token</th>
                                        <th>Amount</th>
                                        <th>Price</th>
                                        <th>PayMethod</th>
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

          

      </div>
    );
  }
}

SaleSubscribe.propTypes = {
    
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(SaleSubscribe);
