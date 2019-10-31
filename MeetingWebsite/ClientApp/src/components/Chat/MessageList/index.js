import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import * as getListActions from './reduser';
import get from "lodash.get";
import './MessageList.css';
import { connect } from 'react-redux';
import { array } from 'prop-types';
const MY_USER_ID = '09bc180c-2c73-4fd4-8141-07e86b09235f';
class MessageList extends React.Component{
componentDidMount(){
  console.log("hi")
  this.props.getMessages({
    "From":0,
    "Count":100,
      "chat": {
      "SenderId":"a1167217-20c9-4ab6-96ab-5d5d75291afb",
      "RecipientId":"09bc180c-2c73-4fd4-8141-07e86b09235f"
      }
    }
    )


}
getMessages  () {
  var a= ([
      {
        id: 1,
        SenderId: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 2,
        SenderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 3,
        SenderId: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 4,
        SenderId: 'apple',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 5,
        SenderId: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 6,
        SenderId: 'apple',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 7,
        SenderId: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 8,
        SenderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 9,
        SenderId: 'apple',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 10,
        SenderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 11,
        SenderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 12,
        SenderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
    ])
    console.log(a)
    return this.props.Messages;
}
renderMessages () {
  var messages=this.getMessages();
console.log(messages)
  let i = 0;
  let messageCount = messages.length;
  let tempMessages = [];

  while (i < messageCount) {
    let previous = messages[i - 1];
    let current = messages[i];
    let next = messages[i + 1];
    let isMine = current.senderId == MY_USER_ID;
    let currentMoment = moment(current.DateCreate);
    let prevBySameAuthor = false;
    let nextBySameAuthor = false;
    let startsSequence = true;
    let endsSequence = true;
    let showTimestamp = true;
    if (previous) {
      let previousMoment = moment(previous.DateCreate);
      let previousDuration = moment.duration(currentMoment.diff(previousMoment));
      prevBySameAuthor = previous.SenderId === current.SenderId;
      
      if (prevBySameAuthor && previousDuration.as('hours') < 1) {
        startsSequence = false;
      }

      if (previousDuration.as('hours') < 1) {
        showTimestamp = false;
      }
    }

    if (next) {
      let nextMoment = moment(next.DateCreate);
      let nextDuration = moment.duration(nextMoment.diff(currentMoment));
      nextBySameAuthor = next.SenderId === current.SenderId;

      if (nextBySameAuthor && nextDuration.as('hours') < 1) {
        endsSequence = false;
        console.log('asdadsd')
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
render(props) {

      return(
      <div className="message-list">


        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}/>
      </div>
    );
}
}
const mapStateToProps = state => {
  console.log("State=======", state);
  return {
    Messages: get(state, "messageList.list.data"),
    isMessagesLoaded: get(state, "messageList.list.loading"),  
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