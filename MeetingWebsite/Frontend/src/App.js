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
const Register = React.lazy(() => import('./components/pages/register'));

class App extends Component {

    render() {
      return (
        <Router>
            <React.Suspense fallback={loading()}>
                <Switch>
                    <Route path="/login" name="Login" render={props => <Login {...props} />} />
                    <Route path="/register" name="Register" render={props => <Register {...props} />} />
                    <Route path="/admin" name="Admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/user" name="User" render={props => <UserLayout {...props} />} /> 
                    <Route path="/users" name="AdminUsers" render={props => <AdminUsers {...props} />} />                     
                </Switch>
                </React.Suspense>
      </Router>
    );
  }
}

export default App;
