import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config'



class PairPriceCard extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
   
    this.state= {
        cardLogo : '',
        pairName : '',
        pairPrice : '',
        small_txt : ''
    }
    if(props.title) this.state={
        title : props.title,
        cardLogo : props.cardLogo,
        pairName : props.pairName,
        pairPrice : props.pairPrice
    }
  }

  
  

  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
      <div>
          <div className="card shining-card">
            <div className="card-body"> 
            {
                this.props.title?
                (<span className="text-primary-price" style={{fontSize:18}}>{this.state.title}<br/></span>):
                (<img src={this.props.cardLogo} width="25%" alt="img60"/>)
            }                   
            <div style={{textAlign:'center'}}>     
                <span className="fs-5 me-2">{this.props.pairName}</span>
                {
                    this.props.title?(
                        <svg width="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.7729 9.30504V6.27304C15.7729 4.18904 14.0839 2.50004 12.0009 2.50004C9.91694 2.49104 8.21994 4.17204 8.21094 6.25604V6.27304V9.30504" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M16.7422 21.0004H7.25778C4.90569 21.0004 3 19.0954 3 16.7454V11.2294C3 8.87937 4.90569 6.97437 7.25778 6.97437H16.7422C19.0943 6.97437 21 8.87937 21 11.2294V16.7454C21 19.0954 19.0943 21.0004 16.7422 21.0004Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>                                
                        </svg>                            
                    ):(
                        <svg width="36" height="35" viewBox="0 0 36 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.86124 21.6224L11.2734 16.8577C11.6095 16.6417 12.041 16.6447 12.3718 16.8655L18.9661 21.2663C19.2968 21.4871 19.7283 21.4901 20.0644 21.2741L27.875 16.2534" stroke="#BFBFBF" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M26.7847 13.3246L31.6677 14.0197L30.4485 18.7565L26.7847 13.3246ZM30.2822 19.4024C30.2823 19.4023 30.2823 19.4021 30.2824 19.402L30.2822 19.4024ZM31.9991 14.0669L31.9995 14.0669L32.0418 13.7699L31.9995 14.0669C31.9994 14.0669 31.9993 14.0669 31.9991 14.0669Z" fill="#BFBFBF" stroke="#BFBFBF"/>
                        </svg>
                    )
                }                            
                <div className="pt-3">
                    <h4 className="counter" style={{visibility:'visible'}}>{this.props.pairPrice}</h4>
                    {
                        !this.props.title?(
                            <div className="pt-3">
                                <small>
                                   {this.props.smallText} 
                                </small>
                            </div>
                        ):(null)
                    }
                    
                </div>
            </div>
            </div>            
        </div>
      </div>
    );
  }
}

PairPriceCard.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(PairPriceCard);