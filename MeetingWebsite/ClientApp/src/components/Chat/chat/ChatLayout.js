
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
import { Provider } from 'react-redux';
class ChatLayout extends React.Component {
  constructor(props) {
    super(props);
    console.log("!!!!!!!!!!!!!!!!!!!!!!I AM CREATED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  }

  render() {
    console.log("I AM IN RENDER")
    return (
      <>
        <div className="content">
        <div className="ChatLayout">
        <MessageList  />
        </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
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