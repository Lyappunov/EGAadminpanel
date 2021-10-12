import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "../../common.css";
import avatar from "../../images/06.png"
import { logoutUser } from "../../actions/authActions";

 
// Here, we display our Navbar
class HeaderBar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
  render() {
    const { user } = this.props.auth;
    console.log('My name is ', user);
  return (
    <div>
        <div className="position-relative" style={{paddingLeft:'13%'}}>
            <nav className="nav navbar navbar-expand-lg navbar-light iq-navbar border-bottom" style={{minHeight:85}}>
                <div className="container-fluid navbar-inner">
                    <a href="/" className="navbar-brand">
                    </a>
                    <div className="sidebar-toggle" data-toggle="sidebar" data-active="true">
                        <i className="icon">
                        <svg width="20px" height="20px" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                        </svg>
                        </i>
                    </div>
                    <h4 className="title">
                        ADMIN PANEL
                    </h4>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">
                            <span className="navbar-toggler-bar bar1 mt-2"></span>
                            <span className="navbar-toggler-bar bar2"></span>
                            <span className="navbar-toggler-bar bar3"></span>
                        </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto navbar-list mb-2 mb-lg-0 align-items-center">
                            <li className="nav-item dropdown">
                                <a href="#"  className="nav-link" id="notification-drop" data-bs-toggle="dropdown" >
                                    <svg width="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 17.8476C17.6392 17.8476 20.2481 17.1242 20.5 14.2205C20.5 11.3188 18.6812 11.5054 18.6812 7.94511C18.6812 5.16414 16.0452 2 12 2C7.95477 2 5.31885 5.16414 5.31885 7.94511C5.31885 11.5054 3.5 11.3188 3.5 14.2205C3.75295 17.1352 6.36177 17.8476 12 17.8476Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M14.3889 20.8572C13.0247 22.3719 10.8967 22.3899 9.51953 20.8572" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>                            
                                    <span className="bg-danger dots"></span>
                                </a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={avatar} alt="User-Profile" className="img-fluid avatar avatar-50 avatar-rounded"/>
                                    <div className="caption ms-3 ">
                                        <h6 className="mb-0 caption-title">{user.name}</h6>
                                        <p className="mb-0 caption-sub-title">Super Admin</p>
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                    <li className="border-0"><a className="dropdown-item" href="/list">Profile</a></li>
                                    <li className="border-0"><a className="dropdown-item" href="/list">Privacy Setting</a></li>
                                    <li className="border-0"><hr className="m-0 dropdown-divider"/></li>
                                    <li className="border-0"><a className="dropdown-item" href="#" onClick={this.onLogoutClick}>Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    </div>
  );
  }
};
 
HeaderBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(HeaderBar);