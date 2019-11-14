/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import { connect } from "react-redux";
import get from "lodash.get";
import * as getListActions from './reducer';
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav } from "reactstrap";
import './ChatHeaderStyle.css';
import { serverUrl } from "../../config";
var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    if(props.routes[0])
    {
        localStorage.setItem("ActiveRecipient", routes[0].recipientId)
    }

  }

  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };
  newChatLoded =(x, y)=>{
    var obj = document.getElementById(x.recipientId+"unreadCounter")
    localStorage.setItem("ActiveRecipient", x.recipientId)
    if(obj.textContent!="")
    {
    obj.textContent="";
    console.log("i am herreererrrereer!!!!!!!!!!!!")
    console.log(localStorage.getItem("MYID"))
    console.log(localStorage.getItem("ActiveRecipient"))
    this.props.informBack({
  "SenderId":localStorage.getItem("MYID"),
  "RecipientId":localStorage.getItem("ActiveRecipient")

    })
  }
  }
  render() {
    

    const { bgColor, routes, rtlActive, logo } = this.props;
    
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href="/user/profile"
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href="/user/profile"
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            Profile
          </a>
        );
      } else {
        logoImg = (
          <Link
            to="/user/profile"
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to="/user/profile"
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            Profile
          </Link>
        );
      }
    }
    console.log()
    console.log(routes)
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav >
            {routes.map((prop, key) => {
              
              this[prop.recipientId+"unreadCounter"]=React.createRef();
              if (prop.redirect) return null;
              return (
                <li 
                  onClick={()=>this.newChatLoded(prop)}
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    
                    to={prop.layout +"/"+ prop.recipientId}
                    className="nav-link"
                    activeClassName="active"
                  >
                     <img  className="chatavatar"
                                                        alt="..."                                                  
                                                        src={`${serverUrl}${prop.icon}?t=${new Date().getTime()}`}/>
                    <img src="https://game-tournaments.com/media/logo/t13366.png" className="chatavatar"/>
                    {console.log("!!!!!!!!!!!!!!!!!!!!!!!!??????????????")}
                    {console.log(prop.countUnreaded)}
                <p className="NameStyle">{rtlActive ? prop.rtlName : prop.name}</p>{(prop.countUnreaded!=0)?(<p className="CountUnreadedMessages" id={prop.recipientId+"unreadCounter"}>{prop.countUnreaded}</p>):(<p id={prop.recipientId+"unreadCounter"} className="CountUnreadedMessagesDisactive">{""}</p>)}
                  </NavLink>
                </li>
              );
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};
const mapStateToProps = state => {
  return {
    
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    informBack: filter => {
      dispatch(getListActions.informBack(filter));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);