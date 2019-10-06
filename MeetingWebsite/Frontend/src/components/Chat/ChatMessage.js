/*!

=========================================================
* Black Dashboard React v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from 'react';
import {Button} from 'reactstrap'
import { Badge, Card, CardBody, CardHeader, Col, Row } from 'reactstrap';

class ChatMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        isOwn:props.isOwn,
        Text:props.Text
    }
  }
  render() {

    
    return (
      <>
      <li className= {this.state.isOwn?'OwnChatMessage':'IncomeChatMessage'}><span>{this.state.Text}</span></li>
      </>
    );
  }
}
{/* <i className="cui-magnifying-glass icons font-2xl d-block mt-4"></i> */}
export default ChatMessage;