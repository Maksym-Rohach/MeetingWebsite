import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './instruments/css/palette.css';
import { catchClause } from '@babel/types';
import logo from './instruments/img/logo.jpg';
import { connect } from 'tls';
import { logout } from '../login/reducer';
import { withRouter } from 'react-router-dom';


class Header extends Component {

    render() {

      const { isAuthenticated } = this.props.login;
      console.log("this.props.login", this.props);

      const logoutLink = (
        <NavItem className="align-items-center p-2 float-right">
          <Link to="#/" onClick={e => this.props.onLogout(e)}
            className="social-link rounded-circle text-white mr-5 ">
            Вихід
          </Link>
        </NavItem>
      );

      const loginLink = (
        <NavItem className="align-items-center p-2 float-right">
          <Link to="/login"
            className="social-link rounded-circle text-white mr-5 " >
            Вхід
             </Link>
        </NavItem>
      );
      const registerLink = (
        <NavItem className="align-items-center p-2 float-right">
              <Link to="/register" className="social-link rounded-circle text-white mr-5 "> Реєстрація</Link>
            </NavItem>
      );


        return (
          <React.Fragment>

            <Nav pills className="navbar navbar-expand-lg bg-black shadow fixed-top font-weight-bold text-uppercase d-flex">
              <NavItem className="mr-auto float-left">
                <Link to="/#" className="mr-5 "><img alt="bobik" className="img-fluid" src={logo} style={{ width: 40, height: 40 }} /> </Link>
              </NavItem>
              <NavItem className="mr-auto float-left">
                <Link to="/girls" className="social-link rounded-circle text-white mr-5 ">Дівчата</Link>
              </NavItem>
              <NavItem className="mr-auto float-left">
                <Link to="/boys" className="social-link rounded-circle text-white mr-5 "> Хлопці</Link>
              </NavItem>
            


              {/* {isAuthenticated ? userLink : null} */}
              {isAuthenticated ? logoutLink : loginLink}
              {!isAuthenticated ? registerLink : null}
               
            </Nav>


          </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
  console.log("mapStateToProps=======", state);
  return {
    login: state.login
  };
}

export default Header;
//export default withRouter(connect( mapStateToProps, null, { logout })(Header));