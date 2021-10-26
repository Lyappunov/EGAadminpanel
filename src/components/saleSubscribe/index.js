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

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

const Record = (props) => {
    let walletaddress = props.record.walletAddress;
    
    let address = walletaddress.slice(0,6) +'...'+ walletaddress.slice(-4);

    const CLIENT = {
      sandbox:
        "ARStqa-xTPho6-SAziKCa__unt5sBMDyZocBGBiAOqaTl0Cd6L8838Ud7rf6emO5W0dVsa6HD77gPvxN",
      production:
        "ARBEG9wQuQF0ZsKC9OLBokioEkokiNNv7mjAmv4uqYnI9Bo_5adWcVBdC9m-o0mENSYsuk-45OnPQWTH"
    };
   
    // const CLIENT_ID = CLIENT.production;
    const CLIENT_ID = CLIENT.sandbox;
   const PAYPAL_API_URL = 'https://api-m.sandbox.paypal.com/v1/payments/payouts';


   const sendMoney = (subscribe) => {
     let request_header = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${CLIENT_ID}`
     }
     let request_body = {
      "sender_batch_header": {
        "sender_batch_id": `${subscribe._id}`,
        "recipient_type": "EMAIL",
        "email_subject": "The payout for token sale!",
        "email_message": "You received a payment. Thanks for using our service!"
      },
      "items": [
        {
          "amount": {
            "value": `${Number(subscribe.usdPrice).toFixed(2)}`,
            "currency": "USD"
          },
          "sender_item_id": `${subscribe._id}`,
          "recipient_wallet": "PAYPAL",
          "receiver": `${subscribe.address}`
        }
      ]
     }
     axios
     .post(PAYPAL_API_URL, request_body, {'headers' : request_header})
     .then((res) => {
        treatDatabase(subscribe);
     })
     .catch((err) => {
        console.log(err);
     })
   }

   const treatDatabase = (subscribe) => {
      const newSubscribe = {
        paymentState : 'paid'
      };
      axios
      .post(`${SERVER_MAIN_URL}/subscribeupdate/${subscribe._id}`, newSubscribe)
      .then((response) => {
        const transactionData = {
          personName:subscribe.subscriber,
          address:subscribe.address,
          walletAddress: subscribe.walletAddress,
          tranDate:subscribe.subscribeDate,
          tokenName:subscribe.tokenName,
          tranType:'SELL',
          amount : subscribe.amount,
          price : subscribe.usdPrice + ' USD'
        }
        axios
        .post(`${SERVER_MAIN_URL}/record/tranadd`, transactionData)
        .then((res) => {
            alert('Your payout successfull !');
            window.location.href = '/subscribe';
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong with your payout.');
        })
      })
      .catch((error) => {
        alert(error)
      })
   }
    return (
  <tr >
    <td>{props.record.subscribeDate}</td>
    <td>{props.record.subscriber}</td>
    <td>{address}</td>
    <td>{props.record.tokenName}</td>
    <td>{props.record.amount}</td>
    <td>{Number(props.record.usdPrice).toFixed(2)} USD ( {props.record.paymentKind=='paypal'?Number(props.record.eurPrice).toFixed(2)+"EUR" : props.record.btcPrice + "BTC"})</td>
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
                    if(props.record.paymentKind == 'paypal')
                    sendMoney(props.record);
                    else if(props.record.paymentKind == 'btc')
                    props.openModal( props.record );
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
      subscribeData:[],
      openModal : false,
      senderAddress : '',
      senderPrivateKey : '',
      recipientAddress:'',
      btcAmount:0,
      subscriber:'',
      walletAddress:'',
      tokenName:'',
      subscribeDate:'',
      subscribeId:'',
      tokenAmount:0
    };
    this.getSubscribeData = this.getSubscribeData.bind(this);
    this.onOpenModal = this.onOpenModal.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveSubscribeDatabase = this.saveSubscribeDatabase.bind(this);
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

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value });
  };

  onOpenModal(record){
    this.setState({
      openModal : true,
      btcAmount : record.btcPrice,
      recipientAddress : record.address,
      subscriber:record.subscriber,
      walletAddress:record.walletAddress,
      subscribeDate : record.subscribeDate,
      tokenName : record.tokenName,
      subscribeId: record._id,
      tokenAmount:record.amount
    });
  }

  onCloseModal() {
    this.setState({...this.state, openModal : false});
  }

  handleSubmit(e){
    e.preventDefault();
   
    let sendBTCData = {
      recipientAddress: this.state.recipientAddress,
      senderAddress:this.state.senderAddress,
      senderPrivateKey: this.state.senderPrivateKey,
      amountToSend: this.state.btcAmount
      };
    axios
    .post(`${SERVER_MAIN_URL}/record/sendbitcoin`, sendBTCData)
    .then ((res) => {
      this.saveSubscribeDatabase()
    })
  }

  saveSubscribeDatabase () {
    const newSubscribe = {
      paymentState : 'paid'
    };
    axios
    .post(`${SERVER_MAIN_URL}/subscribeupdate/${this.state.subscribeId}`, newSubscribe)
    .then((response) => {
      const transactionData = {
        personName:this.state.subscriber,
        address:this.state.recipientAddress,
        walletAddress: this.state.walletAddress,
        tranDate:this.state.subscribeDate,
        tokenName:this.state.tokenName,
        tranType:'SELL',
        amount : this.state.tokenAmount,
        price : this.state.btcAmount + ' BTC'
      }
      axios
      .post(`${SERVER_MAIN_URL}/record/tranadd`, transactionData)
      .then((res) => {
          alert('Your payout successfull !');
          window.location.href = '/subscribe';
      })
      .catch((err) => {
          console.log(err);
          alert('Something went wrong with your payout.');
      })
    })
    .catch((error) => {
      alert(error)
    })
 }

  // This method will map out the users on the table
  recordList() {
    if(this.state.subscribeData){
        return this.state.subscribeData.map((currentrecord) => {
            return (
              <Record
                record={currentrecord}
                deleteRecord={this.deleteRecord}
                openModal = {this.onOpenModal}
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
                        <div className="row">
                            <div className='col-lg-12'>
                                <p style={{color:'green'}}>Please input your credential for your BTC wallet</p>
                            </div>
                        </div>
                      
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="senderAddress" placeholder="Wallet Address" onChange={this.onChange}/>
                            <label>Wallet Address</label>
                        </div>
                        <div className="form-floating mb-4">
                            <input type="text" className="form-control" id="senderPrivateKey" placeholder="Private Key" onChange={this.onChange}/>
                            <label>Private Key</label>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={this.onCloseModal}>Close</button>
                        <button type="submit" className="btn btn-primary">Pay( {this.state.btcAmount} BTC )</button>
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
