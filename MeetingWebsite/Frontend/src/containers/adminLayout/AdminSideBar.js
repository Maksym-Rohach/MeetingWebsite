import React, {Suspense} from 'react';
// nodejs library to set properties for components
import {
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';

import navigation from '../../navs/AdminNavs/_adminNavs';
// routes config
import * as router from 'react-router-dom';

// reactstrap components

var ps;

class Sidebar extends React.Component {
  render() {
    return (
        <AppSidebar fixed display="lg">
        <AppSidebarHeader />
        <AppSidebarForm />
        <Suspense>
        <AppSidebarNav navConfig={navigation} {...this.props} router={router}/>
        </Suspense>
        <AppSidebarFooter />
        <AppSidebarMinimizer />
      </AppSidebar>
    );
  }
}

export default Sidebar;
