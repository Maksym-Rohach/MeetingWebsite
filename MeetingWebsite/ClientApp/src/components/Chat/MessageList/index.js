import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
import { connect } from 'react-redux';
import get from "lodash.get";
import * as getListActions from '../chat/reducer';


class MessageList extends React.Component{
  constructor(props) {
    super(props);
    console.log("Active recip in list")
    console.log(localStorage.getItem("ActiveRecipient"))
    this.scroll = this.scroll.bind(this);
    this.onClick = this.onClick.bind(this);
    this.state={
      isMessagesSaved:false,
      LoadedMessages:[],
      IsAllMessagesLoaded:false,
      isLoadedPrevius:false,
      tmpMessageCount:20,
      FirstScroll:false
    }
  }
  componentDidUpdate(){
    if(this.props.listMessages.messages){
      console.log("income list in update method" );
      console.log(this.props.listMessages.messages);

    this.state.objDiv = document.getElementById("content");
    if(!this.state.FirstScroll)
    {
      console.log("HIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIHIH")
      this.state.FirstScroll=true;
      this.state.objDiv.scrollTop=this.state.objDiv.clientHeight;
      this.state.objDiv.addEventListener("scroll", this.scroll);
    }
  }
  }

scroll(){

if(this.state.objDiv.scrollTop==0)
{
  if(this.props.listMessages.messages.length==0)
  {
    this.state.IsAllMessagesLoaded=true;
    console.log("i am here 111")
    console.log("My messages:")
    console.log(this.props.listMessages.messages)
  }
  if(!this.state.IsAllMessagesLoaded)
  {

  console.log("I SET PREVIEW:")
  console.log(this.state.isLoadedPrevius)
  console.log("i am call backend and my from="+this.state.tmpMessageCount)
  this.props.getMessages({
    "From":this.state.tmpMessageCount,
    "Count":20,
      "chat": {
      "SenderId":localStorage.getItem("MYID"),
      "RecipientId":localStorage.getItem("ActiveRecipient")
      }});
      this.state.isLoadedPrevius=false;
      this.state.tmpMessageCount+=20;
    console.log(this.state.tmpMessageCount)
  this.state.isMessagesSaved=false;
    }
}

}
componentDidMount(){
  this.state.FirstScroll=false;
  this.state.tmpMessageCount=20;
  this.props.getMessages({
    "From":0,
    "Count":20,
      "chat": {
      "SenderId":localStorage.getItem("MYID"),
      "RecipientId":localStorage.getItem("ActiveRecipient")
      }});

    //   if(objDiv.scrollTop==0)
    //   {
    // console.log(objDiv.clientHeight)
    // console.log("i am 0")
  
    //   }
  
  
    
}
sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
getMessages  () {
  var arr=[];
  console.log("I AM IN GET MESSAGE AND MY ARRAY:")
  console.log(this.state.LoadedMessages)
  console.log("MY PREVIEW:")
  console.log(this.state.isLoadedPrevius)
  console.log("MY INCOME ARRAY")
  console.log(this.props.listMessages.messages)
  if(this.props.listMessages.messages!=undefined&&this.props.listMessages.messages.length!=0&&!this.state.isLoadedPrevius)
  {
    console.log("I AM IN")
    
    this.state.isLoadedPrevius=true;
    Array.prototype.push.apply(arr,this.props.listMessages.messages);
    Array.prototype.push.apply(arr,this.state.LoadedMessages);
    this.setState({LoadedMessages:arr})
    
  }
  else{
    Array.prototype.push.apply(arr,this.state.LoadedMessages);

  }
  console.log("MY END ARRAY");
  console.log(this.state.LoadedMessages)
  console.log("MY END PREVIEW:")
  console.log(this.state.isLoadedPrevius)
    return arr;
}
renderMessages () {
  console.log("i am in first")
  console.log(this.state.LoadedMessages)
  var messages=this.getMessages();
  
  console.log("i am in second")
  console.log(this.state.LoadedMessages);
  let i = 0;

  let messageCount = messages.length;
  let tempMessages = [];
  while (i < messageCount) {
    let previous = messages[i - 1];
    let current = messages[i];
    let next = messages[i + 1];
    let isMine = current.senderId == localStorage.getItem("MYID");
    let currentMoment = moment(current.dateCreate);
    let prevBySameAuthor = false;
    let nextBySameAuthor = false;
    let startsSequence = true;
    let endsSequence = true;
    let showTimestamp = true;
    //console.log()
    //new Date().toTimeString
    //console.log("data1:   "+new Date(Date.now()).toUTCString())
    if (previous) {
      let previousMoment = moment(previous.dateCreate);
      let previousDuration = moment.duration(currentMoment.diff(previousMoment));
      prevBySameAuthor = previous.senderId === current.senderId;
      //console.log(previous.dateCreate)
      if (prevBySameAuthor && previousDuration.as('hours') < 1) {
        startsSequence = false;
      }

      if (previousDuration.as('hours') < 1) {
        showTimestamp = false;
      }
    }

    if (next) {
      let nextMoment = moment(next.dateCreate);
      let nextDuration = moment.duration(nextMoment.diff(currentMoment));
      nextBySameAuthor = next.senderId === current.senderId;

      if (nextBySameAuthor && nextDuration.as('hours') < 1) {
        endsSequence = false;
      }
    }

    tempMessages.push(
      <Message
        key={i}
        isMine={isMine}
        startsSequence={startsSequence}
        endsSequence={endsSequence}
        showTimestamp={showTimestamp}
        data={current}
      />
    );

    // Proceed to the next message.
    i += 1;
  }

  return tempMessages;
}
onClick(){
  console.log(this.state.LoadedMessages)

}
render() {

      return(
      <div className="message-list" onClick={this.onClick}>


        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose />
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(MessageList);