import React, { Component,Suspense} from 'react';


const AdminNavBar = React.lazy(() => import('./AdminNavBar'));
const AppSidebar = React.lazy(() => import('./AdminSideBar'));
const AdminTable = React.lazy(() => import('./AdminTable'));
const AdminGrafik = React.lazy(() => import('./AdminGrafik'));


class AdminLayout extends Component {
    state = {  }
    render() { 
        return ( 
              <>
        <div className="wrapper">
          <AdminNavBar/>
          {/* <AppSidebar/> */}
          <AdminTable/>
        <AdminGrafik/> 
          </div>
      </>
         );
    }
}
 
export default AdminLayout;