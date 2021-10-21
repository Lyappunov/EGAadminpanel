import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// We import bootstrap to make our application look better.
import "bootstrap/dist/css/bootstrap.css";
import "../../common.css";
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";
 
// Here, we display our Navbar
class SideBody extends Component {
  render() {
  return (
    <div>
        <div className="sidebar-body p-0 data-scrollbar">
            <div className="collapse navbar-collapse pe-3" id="sidebar">
                <ul className="navbar-nav iq-main-menu">
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/dashboard">
                            <i className="icon">
                                <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.15722 20.7714V17.7047C9.1572 16.9246 9.79312 16.2908 10.581 16.2856H13.4671C14.2587 16.2856 14.9005 16.9209 14.9005 17.7047V17.7047V20.7809C14.9003 21.4432 15.4343 21.9845 16.103 22H18.0271C19.9451 22 21.5 20.4607 21.5 18.5618V18.5618V9.83784C21.4898 9.09083 21.1355 8.38935 20.538 7.93303L13.9577 2.6853C12.8049 1.77157 11.1662 1.77157 10.0134 2.6853L3.46203 7.94256C2.86226 8.39702 2.50739 9.09967 2.5 9.84736V18.5618C2.5 20.4607 4.05488 22 5.97291 22H7.89696C8.58235 22 9.13797 21.4499 9.13797 20.7714V20.7714" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>                            
                            </i>
                            <span className="item-name">Dashboard</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/list">
                            <i className="icon">
                                <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z" stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round"></path></svg>                            
                            </i>
                            <span className="item-name">Users</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        {/* <NavLink className="navbar-brand" to="/transaction"> */}
                        <NavLink className="nav-link" to="/transaction">
                            <i className="icon">
                                <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.9846 21.606C11.9846 21.606 19.6566 19.283 19.6566 12.879C19.6566 6.474 19.9346 5.974 19.3196 5.358C18.7036 4.742 12.9906 2.75 11.9846 2.75C10.9786 2.75 5.26557 4.742 4.65057 5.358C4.03457 5.974 4.31257 6.474 4.31257 12.879C4.31257 19.283 11.9846 21.606 11.9846 21.606Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                    <path d="M9.38574 11.8746L11.2777 13.7696L15.1757 9.86963" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>                            
                            </i>
                            <span className="item-name">Transaction</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        {/* <NavLink className="navbar-brand" to="/token"> */}
                        <NavLink className="nav-link" to="/tokens">
                            <i className="icon">
                            <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M13.1043 4.17701L14.9317 7.82776C15.1108 8.18616 15.4565 8.43467 15.8573 8.49218L19.9453 9.08062C20.9554 9.22644 21.3573 10.4505 20.6263 11.1519L17.6702 13.9924C17.3797 14.2718 17.2474 14.6733 17.3162 15.0676L18.0138 19.0778C18.1856 20.0698 17.1298 20.8267 16.227 20.3574L12.5732 18.4627C12.215 18.2768 11.786 18.2768 11.4268 18.4627L7.773 20.3574C6.87023 20.8267 5.81439 20.0698 5.98724 19.0778L6.68385 15.0676C6.75257 14.6733 6.62033 14.2718 6.32982 13.9924L3.37368 11.1519C2.64272 10.4505 3.04464 9.22644 4.05466 9.08062L8.14265 8.49218C8.54354 8.43467 8.89028 8.18616 9.06937 7.82776L10.8957 4.17701C11.3477 3.27433 12.6523 3.27433 13.1043 4.17701Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>                                
                            </svg>                                                        
                            </i>
                            <span className="item-name">Our Tokens</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        {/* <NavLink className="navbar-brand" to="/token"> */}
                        <NavLink className="nav-link" to="/tokensale">
                            <i className="icon">
                            <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.8397 20.1642V6.54639" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M20.9173 16.0681L16.8395 20.1648L12.7617 16.0681" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M6.91102 3.83276V17.4505" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M2.8335 7.92894L6.91127 3.83228L10.9891 7.92894" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>  
                            </svg>                                                                                   
                            </i>
                            <span className="item-name">Token Sale</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/subscribe">
                            <i className="icon">
                                <svg width="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M11.9849 15.3462C8.11731 15.3462 4.81445 15.931 4.81445 18.2729C4.81445 20.6148 8.09636 21.2205 11.9849 21.2205C15.8525 21.2205 19.1545 20.6348 19.1545 18.2938C19.1545 15.9529 15.8735 15.3462 11.9849 15.3462Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M11.9849 12.0059C14.523 12.0059 16.5801 9.94779 16.5801 7.40969C16.5801 4.8716 14.523 2.81445 11.9849 2.81445C9.44679 2.81445 7.3887 4.8716 7.3887 7.40969C7.38013 9.93922 9.42394 11.9973 11.9525 12.0059H11.9849Z" stroke="currentColor" strokeWidth="1.42857" strokeLinecap="round" strokeLinejoin="round"></path></svg>                            
                            </i>
                            <span className="item-name">Sale Subscribe</span>
                        </NavLink>
                    </li>
                    <li className="nav-item ">
                        {/* <NavLink className="navbar-brand" to="/set"> */}
                        <NavLink className="nav-link" to="/setting">
                            <i className="icon">
                                <svg width="20" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M20.8064 7.62361L20.184 6.54352C19.6574 5.6296 18.4905 5.31432 17.5753 5.83872V5.83872C17.1397 6.09534 16.6198 6.16815 16.1305 6.04109C15.6411 5.91402 15.2224 5.59752 14.9666 5.16137C14.8021 4.88415 14.7137 4.56839 14.7103 4.24604V4.24604C14.7251 3.72922 14.5302 3.2284 14.1698 2.85767C13.8094 2.48694 13.3143 2.27786 12.7973 2.27808H11.5433C11.0367 2.27807 10.5511 2.47991 10.1938 2.83895C9.83644 3.19798 9.63693 3.68459 9.63937 4.19112V4.19112C9.62435 5.23693 8.77224 6.07681 7.72632 6.0767C7.40397 6.07336 7.08821 5.98494 6.81099 5.82041V5.82041C5.89582 5.29601 4.72887 5.61129 4.20229 6.52522L3.5341 7.62361C3.00817 8.53639 3.31916 9.70261 4.22975 10.2323V10.2323C4.82166 10.574 5.18629 11.2056 5.18629 11.8891C5.18629 12.5725 4.82166 13.2041 4.22975 13.5458V13.5458C3.32031 14.0719 3.00898 15.2353 3.5341 16.1454V16.1454L4.16568 17.2346C4.4124 17.6798 4.82636 18.0083 5.31595 18.1474C5.80554 18.2866 6.3304 18.2249 6.77438 17.976V17.976C7.21084 17.7213 7.73094 17.6516 8.2191 17.7822C8.70725 17.9128 9.12299 18.233 9.37392 18.6717C9.53845 18.9489 9.62686 19.2646 9.63021 19.587V19.587C9.63021 20.6435 10.4867 21.5 11.5433 21.5H12.7973C13.8502 21.5001 14.7053 20.6491 14.7103 19.5962V19.5962C14.7079 19.088 14.9086 18.6 15.2679 18.2407C15.6272 17.8814 16.1152 17.6807 16.6233 17.6831C16.9449 17.6917 17.2594 17.7798 17.5387 17.9394V17.9394C18.4515 18.4653 19.6177 18.1544 20.1474 17.2438V17.2438L20.8064 16.1454C21.0615 15.7075 21.1315 15.186 21.001 14.6964C20.8704 14.2067 20.55 13.7894 20.1108 13.5367V13.5367C19.6715 13.284 19.3511 12.8666 19.2206 12.3769C19.09 11.8873 19.16 11.3658 19.4151 10.928C19.581 10.6383 19.8211 10.3982 20.1108 10.2323V10.2323C21.0159 9.70289 21.3262 8.54349 20.8064 7.63277V7.63277V7.62361Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>                                    
                                    <circle cx="12.1747" cy="11.8891" r="2.63616" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"></circle>                                
                                </svg>                            
                            </i>
                            <span className="item-name">Settings</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  );
  }
};
 
SideBody.propTypes = {
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    records: state.records
});

export default connect(
    mapStateToProps
)(SideBody);