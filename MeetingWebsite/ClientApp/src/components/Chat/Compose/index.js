import React from 'react';
import './Compose.css';
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from './reduser';
class Compose extends React.Component{
  constructor(props) {
    super(props);
    this.MessageField=React.createRef();
    console.log('state  '+this.state)
    console.log('props:  '+this.props)
  }
  SendClick(){
    console.log(this.MessageField.Text);
    return;

    this.sendMessages({        
        "Text":this.MessageField.Text,
        "RecipientId":this.props.RecipID,
        "SenderId":this.props.MyID
    })


  }


  render() {
    //var x = jwt.decode(localStorage.jwttoken)
    //console.log(x)
    return (
      <div className="compose">
        <button className="SendMess">send</button>
        <button className="StickName">stick</button>
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
        />

        {
          this.props.rightItems
        }
      </div>
    );
}




}

const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    res: get(state, "sendMessage.list.data"),
    isMessagesLoaded: get(state, "sendMessage.list.loading"),  
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessages: filter => {
      dispatch(getListActions.sendMessages(filter));
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Compose);