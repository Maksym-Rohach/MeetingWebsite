import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import UserSideBar from "./UserSideBar";
import { connect, Provider } from "react-redux";
import get from "lodash.get";
import * as getListActions from './reducer';
import logo from "assets/img/react-logo.png";
import ChatLayout from "../../components/Chat/chat/ChatLayout";
import UserProfile from "../../components/Users/UserProfile/UserProfile";
import a from "../../components/Users/UserProfile/UserProfile";
import UserNavBar from "../../components/pages/Home/NavBar"
import { logout } from '../../components/pages/login/reducer';
var ps;

class UserLayout extends React.Component {
  constructor(props) {
    super(props);

    localStorage.setItem("MYID", "b43a0d4b-4f0a-48b7-823e-8edcfde33b72")
    this.props.routes.chats=[ ]
    this.state = {
      backgroundColor: "blue",
      sidebarOpened:
        document.documentElement.className.indexOf("nav-open") !== -1
    };
    this.props.getChats(
      {
        "UserID":localStorage.getItem("MYID")
      })
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
    //routes.push({path:"/profile", key:"profile"})
    console.log(routes)
    var isprofilepushed=false;
    return routes.map((prop, key) => {
      if (prop.layout === "/user") {
        console.log(prop.layout + "/"+prop.recipientId)

        return(
          <Route
          path={prop.layout + "/"+prop.recipientId}
          component={ChatLayout}
          key={key}></Route> 
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
    for (let i = 0; i < this.props.routes.chats.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          this.props.routes.chats[i].layout + this.props.routes.chats[i].path
        ) !== -1
      ) {
        return this.props.routes.chats[i].name;
      }
    }
    return "Brand";
  };
  scrollTo(param){
    if(param==="bottom")
    {
        var objDiv = document.getElementById("content");      
        objDiv.scrollTop=objDiv.clientHeight
        return;
    }
    objDiv.scrollTop=param;

  }
  signOut(e) {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/login');
}
  render() {
    const { login } = this.props;

        let isAccess = false;

        if (login.isAuthenticated) {
            const { roles } = login.user;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === 'User')
                    isAccess = true;
            }
        }
    var content = (
      <React.Fragment>

        <div className="wrapper">
          <UserSideBar
            MyID={localStorage.getItem("MYID")}
            ActiveRecipient={localStorage.getItem("ActiveRecipient")}
            {...this.props}
            routes={this.props.routes.chats}
            bgColor={this.state.backgroundColor}
            logo={{
              innerLink: "../",
              text: "Main",
              imgSrc: logo
            }}
            toggleSidebar={this.toggleSidebar}
            
          />{console.log("Hi")}
          <div  
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
            <Switch key="switch">{this.getRoutes(this.props.routes.chats)}<Route
            path="/user/profile"
            component={UserProfile}
            key="profile"></Route></Switch>
          </div>
        </div>
      </React.Fragment>
    )
    return isAccess?(content):(<Redirect to="/login" />)
  //);
  }
}
const mapStateToProps = state => {
  return {
    login: get(state, 'login'),
    routes: get(state, "chats.list.data"),
    isListLoading: get(state, "chats.list.loading"), 
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getChats: filter => {
      dispatch(getListActions.getChats(filter));
    },
    informBack: filter => {
      dispatch(getListActions.informBack(filter));
    }
  }
}
export default  connect(mapStateToProps, mapDispatchToProps)(UserLayout);;