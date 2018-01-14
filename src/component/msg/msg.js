import React, { Component } from "react";
import { connect } from "react-redux";
import { List, Badge } from "antd-mobile";
@connect(
  state => state
)
class Msg extends Component {
  // 按照聊天用户分组，根据chatid

  getLast (arr) {
    return arr[arr.length -1];
  }
  render() {
    console.log(this.props)
    const Item = List.Item;
    const Brief  = Item.Brief;
    const userid = this.props.user._id;
    const userInfo = this.props.chat.users;
    console.log("userid", this.props.user);
    const msgGroup = {};
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid] = msgGroup[v.chatid] || [];
      msgGroup[v.chatid].push(v);
    });
    console.log("msg",msgGroup);
    console.log("userInfo", userInfo);
    const chatList = Object.values(msgGroup).sort((a,b)=> {
      const a_last = this.getLast(a).create_time;
      const b_last = this.getLast(b).create_time;
      return b_last - a_last;
    });
    console.log("chatList", chatList);
    return(
      <div>
        {chatList.map(v=> {
          const unreadNum = v.filter(v=> !v.read&&userid===v.to).length;
          const lastItem = this.getLast(v);
          const targetId = v[0].from === userid? v[0].to : v[0].from;
          console.log("v",v);
          console.log("targetID", targetId)
          const name = userInfo[targetId] && userInfo[targetId].name;
          const avatar = userInfo[targetId] ? userInfo[targetId].avatar : "boy";
          return (
        <List
          key={lastItem._id}
        >
          <Item
            extra={<Badge text={unreadNum} />}
            thumb={require(`../img/${avatar}.png`)}
            arrow="horizontal"
            onClick={() => this.props.history.push(`/chat/${targetId}`)}
          >
            {lastItem.content}
            <Brief>{name}</Brief>
          </Item>
        </List>
        )})}
      </div>
    )
  }
}

export default Msg;