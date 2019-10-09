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
// import '../../assets/css/ChatFooterStyle'
// import '../../assets/css/ChatHeaderStyles'
// import '../../assets/css/ChatLayoutStyle'
// import '../../assets/css/ChatMessageStyle'
import React from 'react';
import {Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Input,
  FormGroup,
  Label,
  Row
} from 'reactstrap';
import ChatHeader from '../../components/Chat/ChatHeader'
import ChatFooter from '../../components/Chat/ChatFooter'
import ChatMessages from '../../components/Chat/ChatMessages'
class ChatLayout extends React.Component {
  render() {

    
    return (
      <>
      <div className=" content">
        <div className="ChatLayout">
          <Card>
              <CardHeader>
                <ChatHeader></ChatHeader>
              </CardHeader>
              <CardBody>
               
              <ChatMessages></ChatMessages>
              </CardBody>
              <CardFooter>
              <ChatFooter></ChatFooter>
              </CardFooter>
            </Card>
            
        </div>
        </div>
      </>
    );
  }
}

export default ChatLayout;