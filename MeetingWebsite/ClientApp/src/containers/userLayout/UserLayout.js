import React, { Component, Suspense } from 'react';
import { Button } from 'reactstrap';
import UserNavBar from './UserNavBar'
import UserProfile from '../../components/Users/UserProfile/Profile'
class UserLayout extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <UserProfile></UserProfile>
            </div>
         );
    }
}
 
export default UserLayout;