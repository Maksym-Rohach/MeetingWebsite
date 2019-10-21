import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Users extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="animated fadeIn">            
            <p>
                  <Button size="sm" className="btn-facebook btn-brand mr-1 mb-1"><i className="fa fa-facebook"></i><span>Facebook</span></Button>
                  <Button size="sm" className="btn-twitter btn-brand mr-1 mb-1"><i className="fa fa-twitter"></i><span>Twitter</span></Button>
                  <Button size="sm" className="btn-linkedin btn-brand mr-1 mb-1"><i className="fa fa-linkedin"></i><span>LinkedIn</span></Button>
                  <Button size="sm" className="btn-flickr btn-brand mr-1 mb-1"><i className="fa fa-flickr"></i><span>Flickr</span></Button>
                  <Button size="sm" className="btn-tumblr btn-brand mr-1 mb-1"><i className="fa fa-tumblr"></i><span>Tumblr</span></Button>
                  <Button size="sm" className="btn-xing btn-brand mr-1 mb-1"><i className="fa fa-xing"></i><span>Xing</span></Button>      
          </p>
          </div>
         );
    }
}
 
export default Users;