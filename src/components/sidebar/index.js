import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import SideHeader from './sideHeader';
import SideBody from './sideBody';
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
import sideHeader from "./sideHeader";
 
// Here, we display our Navbar
class Sidebar extends Component {
    render() {
        return (
            <div>
                <aside className="sidebar sidebar-default navs-rounded " style={{maxWidth:'13%'}}>
                    <SideHeader/>
                    <SideBody />
                </aside> 
            </div>
        );
    }
};
 
Sidebar.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(Sidebar);