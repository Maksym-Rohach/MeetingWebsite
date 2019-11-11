import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './instruments/css/palette.css';
import { catchClause } from '@babel/types';
import logo from './instruments/img/logo.jpg';

class NavBar extends Component {

    render() {
        return (
            <React.Fragment>
           
          <Nav pills className="navbar navbar-expand-lg bg-black shadow fixed-top font-weight-bold text-uppercase">
            {/* <div className="collapse navbar-collapse "> */}
            <NavItem>
              <Link to="/#"><img alt="bobik" className="img-fluid" src={logo} style={{ width: 40, height: 40 }} /> </Link>
            </NavItem>
            <NavItem>
              <Link to="" className="social-link rounded-circle text-white mr-3">Дівчата</Link>
            </NavItem>
            <NavItem>
              <Link to="/boys" className="social-link rounded-circle text-white mr-3"> Хлопці</Link>
            </NavItem>
            {/* </div>
            <div className="collapse navbar-collapse justify-content-end" id="navigation"> */}
            <NavItem>
              <Link to="/login" className="social-link rounded-circle text-white mr-3" > Вхід</Link>
            </NavItem>
            <NavItem>
              <Link to="/register" className="social-link rounded-circle text-white mr-3"> Реєстрація</Link>
            </NavItem>
            <NavItem>
              <Link to="/register" className="social-link rounded-circle text-white mr-3"> Вихід</Link>
            </NavItem>
            {/* </div> */}
          </Nav>


</React.Fragment>
        );
    }



}
export default NavBar;