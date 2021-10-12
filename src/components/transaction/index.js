import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import SideBar from "../sidebar"
import HeaderBar from "../headerbar"
import {SERVER_MAIN_URL} from '../../config'
import '../../common.css'

const Record = (props) => {
    let walletaddress = props.record.walletAddress[0];
    
    let address = walletaddress.slice(0,6) +'...'+ walletaddress.slice(-4);
    return (
  <tr >
    <td>{props.record.personName}</td>
    <td>{props.record.phoneNumber}</td>
    <td>{address}</td>
    <td>{props.record.tranDate}</td>
    <td>{props.record.tokenName}</td>
    <td className={props.record.tranType=='SELL'?'text-danger':'text-success'}>{props.record.tranType}</td>
    <td className={props.record.tranType=='SELL'?'text-danger':'text-success'}>{props.record.amount}</td>
    
  </tr>
)};

class Transaction extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.state = { 
      records: [],
      transaction:[]
    };
    this.getUserData = this.getUserData.bind(this);
  }


  // This method will get the data from the database.
  componentDidMount() {
    this.getUserData();
    this.getTransaction();
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
    if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  getUserData(){
    axios
      .get(`${SERVER_MAIN_URL}/record`)
      .then((response) => {
        this.setState({records: response.data});
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getTransaction(){
    axios
      .get(`${SERVER_MAIN_URL}/transaction`)
      .then((response) => {
        this.setState({transaction: response.data});
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
    if(this.state.transaction){
        return this.state.transaction.map((currentrecord) => {
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
                                        <th>Person</th>
                                        <th>Phone Number</th>
                                        <th>Wallet Address</th>
                                        <th>Transaction Date</th>
                                        <th>Token Name</th>
                                        <th>Transaction Type</th>
                                        <th>Amount</th>
                                        
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

Transaction.propTypes = {
    
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Transaction);
