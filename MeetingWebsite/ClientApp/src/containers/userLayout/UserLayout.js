import React from "react";
import { Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import UserNavBar from "./UserNavBar";
import UserSideBar from "./UserSideBar";

import routes from "../../routes/UserRoutes/UserRoutes";

import logo from "assets/img/react-logo.png";

var ps;

class UserLayout extends React.Component {
  constructor(props) {
    super(props);
    console.log(routes)
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.documentElement.className += " perfect-scrollbar-off";
      document.documentElement.classList.remove("perfect-scrollbar-on");
    }
  }
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
      if (prop.layout === "/user") {
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
  scroll = (e)=>{
    var objDiv = document.getElementById("content");
if(objDiv.scrollTop==0)
{
  console.log("i am 0")

}



}
  render() {
    return (
      <>
        <div className="wrapper">
          <UserSideBar
            {...this.props}
            routes={routes}
            bgColor={this.state.backgroundColor}
            logo={{
              innerLink: "../",
              text: "Main",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
            
          />
          <div  onScroll={(e)=>this.scroll(e)}
          id="content"
            className="main-panel"
            ref="mainPanel"
            data={this.state.backgroundColor}
          >
            <UserNavBar
              {...this.props}
              brandText={this.getBrandText(this.props.location.pathname)}
              toggleSidebar={this.toggleSidebar}
              sidebarOpened={this.state.sidebarOpened}
              HeaderPanerStyle="ChatStyle"
            />
            <Switch>{this.getRoutes(routes)}</Switch>
          </div>
        </div>
      </>
    );
  }
}


export default UserLayout;