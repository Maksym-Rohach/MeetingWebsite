import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import "assets/scss/black-dashboard-react.scss";
import "assets/css/black-dashboard-react.css";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import 'font-awesome/css/font-awesome.min.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const AdminLayout = React.lazy(() => import('./containers/adminLayout/AdminLayout'));
const UserLayout = React.lazy(() => import('./containers/userLayout'));

// Pages
const AdminUsers = React.lazy(() => import('./components/admin/Users'));
const Login = React.lazy(() => import('./components/pages/login'));
const Home = React.lazy(() => import('./components/pages/Home'));
const Girls = React.lazy(() => import('./components/Girls'));
const Boys = React.lazy(() => import('./components/boys'));
const Register = React.lazy(() => import('./components/pages/register'));
const Forgot_Password = React.lazy(() => import('./components/pages/forgot_password'));


class App extends Component {

    render() {
      console.log("hi")
      return (
        <Router>
            <React.Suspense fallback={loading()}>
                <Switch>
                    <Route path="/login" name="Login" render={props => <Login {...props} />} />
                    <Route path="/register" name="Register" render={props => <Register {...props} />} />
                    <Route path="/admin" name="Admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/user" name="User" render={props => <UserLayout {...props} />} /> 
                    
                    <Route path="/girls" name="Girls" render={props => <Girls {...props} />} />
                                     
                    <Route path="/users" name="AdminUsers" render={props => <AdminUsers {...props} />} />                    
                    <Route path="/boys" name="Boys" render={props => <Boys {...props} />} />
                    <Route exact path="/" name="Home" render={props => <Home {...props} />} />
                    <Route path="/forgot_password" name="Forgot_Password" render={props => <Forgot_Password {...props} />} />
                </Switch>
                </React.Suspense>
      </Router>
    );
  }
}

export default App;