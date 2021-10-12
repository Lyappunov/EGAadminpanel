import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "../../common.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
class SideHeader extends Component {
  render() {
  return (
    <div>
        <div className="sidebar-header d-flex align-items-center justify-content-start">
            <NavLink className="navbar-brand" to="/">
                <img src='../../images/EgaCion.png' style={{width:"50%"}}/>
                <h4 className="logo-title m-0" style={{paddingTop:24}}>EGA</h4>
            </NavLink>
            <div className="sidebar-toggle" data-toggle="sidebar" data-active="true">
                <i className="icon">
                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.25 12.2744L19.25 12.2744" stroke="currentColor" strokeWidth="1.5"></path>
                        <path d="M10.2998 18.2988L4.2498 12.2748L10.2998 6.24976" stroke="currentColor" strokeWidth="1.5"></path>
                    </svg>
                </i>
            </div>
        </div>
    </div>
  );
  }
};
 
SideHeader.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(SideHeader);