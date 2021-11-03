import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {SERVER_MAIN_URL} from '../../config'
import Avatar2 from "../../images/avatars/02.png";
import Avatar3 from "../../images/avatars/03.png";
import Avatar4 from "../../images/avatars/04.png";
import Avatar5 from "../../images/avatars/05.png";
import Avatar6 from "../../images/avatars/06.png";



class HolderCardEfranc extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    
    this.state= {
        gahHolder : [],
        efrancHolder : [],
        
        gahHolderFlag : false,
        recordsFlag : false,
        sumAmount : 0, 
    }
    let number = 0;
  }
  getUsers(){
    axios
      .get(`${SERVER_MAIN_URL}/record/`)
      .then((response) => {
        this.setState({ records: response.data, recordsFlag : true });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGahHolders () {
    axios
    .get(`${SERVER_MAIN_URL}/holder/gah`)
    .then((response) => {
      this.setState({
        gahHolder : response.data,
        gahHolderFlag : true
      });
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  getEfrancHolders () {
    axios
    .get(`${SERVER_MAIN_URL}/holder/efranc`)
    .then((response) => {
      this.setState({
        efrancHolder : response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  efrancHolderList() {
    if(this.state.efrancHolder){
        let efrancHolderArr = this.state.efrancHolder;
        efrancHolderArr.sort((a,b) => {
            return b.amount - a.amount;
        })
        return efrancHolderArr.map((item, idx) => {
            if(idx < 5) {
                let index = this.props.users.findIndex(raw => raw.name == item.name);
                return (
                    <div className="" key = {idx}>
                        <img src={`${SERVER_MAIN_URL}/${this.props.users[index].photoName}`} className="img-fluid avatar avatar-50px avatar-rounded" alt="img36" style={{display:'inline'}}/>
                        <p style={{padding:10, display:'inline', color:'#1eff12', fontSize:16}}>{item.name}</p>
                        <p style={{padding:10, display:'inline', color : 'grey', fontSize:12}}>({Number(item.amount).toFixed(5)})</p>
                    </div>
                );
            }
          });

    }
    
  }

  componentDidMount () {
    // this.getUsers();
    this.getEfrancHolders();
  }

  // This method will delete a record based on the method
  

  // This following section will display the table with the records of individuals.
  render() {
    return (
        <div>
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-header d-flex justify-content-between flex-wrap">
                        <div className="header-title">
                            <h4 className="card-title">Top E-FRANC token Holders</h4>          
                        </div>
                    </div>
                    <div className="card-body">
                        <div className= "d-grid grid-cols-1 gap-card" style = {{paddingBottom: 30}}>
                            {
                               this.efrancHolderList() 
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

HolderCardEfranc.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(HolderCardEfranc);