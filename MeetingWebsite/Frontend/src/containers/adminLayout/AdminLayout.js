import React, { Component,Suspense} from 'react';


const AdminNavBar = React.lazy(() => import('./AdminNavBar'));
const AppSidebar = React.lazy(() => import('./AdminSideBar'));

class AdminLayout extends Component {
    state = {  }
    render() { 
        return ( 
              <>
        <div className="wrapper">
          <AdminNavBar/>
          <AppSidebar/>
          </div>
      </>
         );
    }
}
 
export default AdminLayout;