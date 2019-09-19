import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;


// Containers
const AdminLayout = React.lazy(() => import('./containers/adminLayout'));
const UserLayout = React.lazy(() => import('./containers/userLayout'));


// Pages
//const Login = React.lazy(() => import('./components/Pages/Login'));

class App extends Component {

    render() {
      return (
        <Router>
            <React.Suspense fallback={loading()}>
                <Switch>
                    <Route path="/admin" name="Admin" render={props => <AdminLayout {...props} />} />
                    <Route path="/user" name="User" render={props => <UserLayout {...props} />} />                   
                </Switch>
                </React.Suspense>
      </Router>
    );
  }
}

export default App;
