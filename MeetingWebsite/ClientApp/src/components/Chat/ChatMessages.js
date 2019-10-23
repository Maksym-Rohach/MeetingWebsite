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
import Message from './ChatMessage'
class ChatMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [{Text:"sadfhsdsafhfhdfshfdsahklhfdlhdsajkjh",isOwn:true},{Text:"no",isOwn:false},{Text:"own",isOwn:true},{Text:"no",isOwn:false}]
    };
  }
  render() {

    const messagesList=this.state.messages;
      const messages=messagesList.map((item)=>{
          return(
            <Message Text={item.Text} isOwn={item.isOwn}></Message>

          )


      }
      
      
      );
    return (
      <>
        <ul className="ChatMessages">
            {messages}
        </ul>
      </>
    );
  }
}
{/* <i className="cui-magnifying-glass icons font-2xl d-block mt-4"></i> */}
export default ChatMessages;