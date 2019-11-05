import React, {useEffect, useState} from 'react';
import Compose from '../Compose';
import ToolbarButton from '../ToolbarButton';
import Message from '../Message';
import moment from 'moment';
import './MessageList.css';
const MY_USER_ID = '09bc180c-2c73-4fd4-8141-07e86b09235f';
class MessageList extends React.Component{

getMessages  () {
  var a= ([
      {
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },{
        id: 1,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 2,
        senderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 3,
        senderId: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 4,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 5,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 6,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 7,
        senderId: 'orange',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 8,
        senderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 9,
        senderId: '09bc180c-2c73-4fd4-8141-07e86b09235f',
        message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
        DateCreate: new Date().getTime()
      },
      {
        id: 10,
        senderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 11,
        senderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
      {
        id: 12,
        senderId: 'orange',
        message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
        DateCreate: new Date().getTime()
      },
    ])
    return a;
}
scroll(){
  //console.log("scroled")

}
renderMessages () {
  var messages=this.getMessages();
  let i = 0;
  if(!messages)
  {
    return (<div></div>)
  }
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
    //new Date().toTimeString
    //console.log("data1:   "+new Date(Date.now()).toUTCString())
    if (previous) {
      let previousMoment = moment(previous.DateCreate);
      let previousDuration = moment.duration(currentMoment.diff(previousMoment));
      prevBySameAuthor = previous.senderId === current.senderId;
      //console.log(previous.DateCreate)
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
render() {

      return(
      <div className="message-list" >


        <div className="message-list-container">{this.renderMessages()}</div>

        <Compose />
      </div>
    );
}
}

export default MessageList;