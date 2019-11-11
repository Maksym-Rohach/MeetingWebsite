import React, { Component } from 'react';
class Footer extends Component {
    render() {
        return (
            <React.Fragment>
                <footer className="footer text-center p-4 ">
                    <div className="container">
                        <p className="text-muted mb-0 text-light"> Made with <i className="fa fa-heart heart text-danger"></i> by Creative Tim  </p>
                    </div>
                </footer>
            </React.Fragment>
        );
    }
}
export default Footer;