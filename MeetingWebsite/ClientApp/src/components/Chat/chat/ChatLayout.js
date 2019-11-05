
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
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from './reducer';
import MessageList from '../MessageList/index'
class ChatLayout extends React.Component {
  constructor(props) {
    super(props);
    this.GetMessagesList = this.GetMessagesList.bind(this);

  }
  componentDidMount(){
    var i = this.GetMessagesList("a1167217-20c9-4ab6-96ab-5d5d75291afb", "09bc180c-2c73-4fd4-8141-07e86b09235f", 0, 100);
    console.log("isdfuygfisdhfsdfyghkuygbsdfuygshyukfgsygu:  "+i)

  }
  GetMessagesList(userID, RecipientID, from, count){
    this.props.getMessages({
        "From":from,
        "Count":count,
          "chat": {
          "SenderId":userID,
          "RecipientId":RecipientID
          }});
          console.log(this.props.isListLoading)
          console.log(this.props.listMessages)
          if(this.props.isListLoading)
          {
            return this.props.listMessages;
          }
          return false;
  }
  render() {
    return (
      <>
      <div className=" content">
        <div className="ChatLayout">
        <MessageList />
        </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    listMessages: get(state, "messages.list.data"),
    isListLoading: get(state, "messages.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: filter => {
      dispatch(getListActions.getMessages(filter));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatLayout);