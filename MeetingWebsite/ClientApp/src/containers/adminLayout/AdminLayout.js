import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import AdminNavbar from "./AdminNavBar";
import AdminSideBar from "./AdminSideBar";
import { Container, Row } from 'reactstrap';
import { logout } from '../../components/pages/login/reducer';
import get from 'lodash.get';
import { connect } from 'react-redux';
import routes from "../../routes/AdminRoutes/AdminRoutes";
import logo from "assets/img/react-logo.png";
import PropTypes from 'prop-types';

var ps;

class AdminLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }

  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
  }

  // componentDidMount() {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     document.documentElement.className += " perfect-scrollbar-on";
  //     document.documentElement.classList.remove("perfect-scrollbar-off");
  //     ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
  //     let tables = document.querySelectorAll(".table-responsive");
  //     for (let i = 0; i < tables.length; i++) {
  //       ps = new PerfectScrollbar(tables[i]);
  //     }
  //   }
  // }
  // componentWillUnmount() {
  //   if (navigator.platform.indexOf("Win") > -1) {
  //     ps.destroy();
  //     document.documentElement.className += " perfect-scrollbar-off";
  //     document.documentElement.classList.remove("perfect-scrollbar-on");
  //   }
  // }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      if (navigator.platform.indexOf("Win") > -1) {
        let tables = document.querySelectorAll(".table-responsive");
        for (let i = 0; i < tables.length; i++) {
          ps = new PerfectScrollbar(tables[i]); 
        }
      }
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }
  // this function opens and closes the sidebar on small devices
  toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  handleBgClick = color => {
    this.setState({ backgroundColor: color });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  render() {

    const { login } = this.props;

    let isAccess = false;

    if(login.isAuthenticated)
    {
      const { roles } = login.user;
      for (let i = 0; i < roles.length; i++) {
        if (roles[i] === 'Admin')
          isAccess = true;
      }
    }
    const content = (
     <React.Fragment>
      <div className="wrapper">
        <AdminSideBar
          {...this.props}
          routes={routes}
          bgColor={this.state.backgroundColor}
          logo={{
            outterLink: "https://www.creative-tim.com/",
            text: "Creative Tim",
            imgSrc: logo
          }}
          toggleSidebar={this.toggleSidebar}
        />
        <div
          className="main-panel"
          ref="mainPanel"
          data={this.state.backgroundColor}
        >
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
            toggleSidebar={this.toggleSidebar}
            sidebarOpened={this.state.sidebarOpened}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
        </div>
      </div>
      </React.Fragment> 
    )
    return (
      isAccess ? content
        : <Redirect to="/login" />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    login: get(state, 'login')
  };
}

AdminLayout.propTypes =
  {
    logout: PropTypes.func.isRequired,
    login: PropTypes.object.isRequired
  }

export default connect(mapStateToProps, { logout })(AdminLayout);

