import React, { Component } from "react";
// This will require to npm install axios
import axios from 'axios';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import SideBar from "./sidebar"
import HeaderBar from "./headerbar"
import {SERVER_MAIN_URL} from '../config'

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.phonenumber}</td>
    <td>{props.record.date}</td>
    <td>
      <Link to={"/edit/" + props.record._id}>Edit</Link> |
      <a
        href="#"
        onClick={() => {
            confirmAlert({
              title: 'Confirm to delete User',
              message: 'Are you sure to delete this user?',
              buttons: [
                {
                  label: 'Yes',
                  onClick: () => {
                    props.deleteToken(props.record._id);
                    window.location.href = '/list'
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
);

class RecordList extends Component {
  // This is the constructor that shall store our data retrieved from the database
  constructor(props) {
    super(props);
    this.deleteRecord = this.deleteRecord.bind(this);
    this.state = { records: [] };
    this.getData = this.getData.bind(this);
    this.state = {
        currentRecord: {
            name: '',
            phonenumber: '',
            password: ''
        }
    };

  }

  // This method will get the data from the database.
  componentDidMount() {
    this.getData();
  }

  componentWillReceiveProps(nextProps) {
    this.getData()
}

  getData(){
    axios
      .get(`${SERVER_MAIN_URL}/record/`)
      .then((response) => {
        console.log('****************', response.data)
        this.setState({ records: response.data });
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
    if(this.state.records){
        return this.state.records.map((currentrecord) => {
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
                            <div className="card-header">
                                <h4 className="card-title text-white">User List</h4>
                            </div>
                            <div className="d-flex mt-3 ms-4 me-4 justify-content-between">
                                <table className="table table-striped" style={{ marginTop: 20 }}>
                                    <thead>
                                        <tr>
                                        <th>Full Name</th>
                                        <th>Phone Number</th>
                                        <th>Entry Date</th>
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

RecordList.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(RecordList);