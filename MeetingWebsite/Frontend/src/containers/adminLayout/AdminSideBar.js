import React, {Suspense} from 'react';

class Sidebar extends React.Component {

linkOnClick = () => {
  document.documentElement.classList.remove("nav-open");
};

  render() {
    return (
      <div className="sidebar">
      <div className="sidebar-wrapper" ref="sidebar">     
        </div>
        </div>
    );
  }
}

export default Sidebar;
