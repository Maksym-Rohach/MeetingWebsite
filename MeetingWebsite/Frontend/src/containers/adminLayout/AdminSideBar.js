import React, {Suspense} from 'react';
import { Nav } from "reactstrap";
import { NavLink, Link } from "react-router-dom";

// nodejs library to set properties for components
// import {
//     AppSidebar,
//     AppSidebarFooter,
//     AppSidebarForm,
//     AppSidebarHeader,
//     AppSidebarMinimizer,
//     AppSidebarNav2 as AppSidebarNav,
//   } from '@coreui/react';

// import navigation from '../../navs/AdminNavs/_adminNavs';
// // routes config
// import * as router from 'react-router-dom';

// // reactstrap components

// var ps;

class Sidebar extends React.Component {
  
linkOnClick = () => {
  document.documentElement.classList.remove("nav-open");
};

  render() {
    return (
      <div className="sidebar">
      <div className="sidebar-wrapper" ref="sidebar">
      <Nav>
        Hello1
        </Nav>
        <Nav>
        Hello2
        </Nav>
        <Link>
        Link1
        </Link>
        <Link>
        Link2
        </Link>
        </div>
        </div>
    );
  }
}

export default Sidebar;
