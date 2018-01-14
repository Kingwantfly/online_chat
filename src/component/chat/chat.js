import React, { Component } from "react";
import { List, InputItem, NavBar, Icon, Grid } from "antd-mobile";
import { connect } from "react-redux";
import { getMsgList, sendMsg, recvMsg, readMsg } from "../../redux/chat";
import { getChatId } from "../../util";
// import QueueAnim from "rc-queue-anim";

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg, readMsg}
)
class Chat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      text: "",
      msg: [],
      showEmoji: false
    }
  }
  componentDidMount() {
    if (!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  componentWillUnmount() {
    const to = this.props.match.params.user;
    this.props.readMsg(to);
  }
  fixCarousel () {
    setTimeout(function() {
      window.dispatchEvent(new Event("resize"));
    },0)
  } 
  handleSubmit () {
    const from = this.props.user._id;
    const to = this.props.match.params.user;
    const msg = this.state.text;
    this.props.sendMsg({from, to, msg});
    this.setState({
      text: ""
    })
  }
  render () {
    const emoji = "😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾"
                  .split(" ").filter(v => v).map(v=> ({text:v}));
    const userid = this.props.match.params.user;
    const Item = List.Item;
    const users = this.props.chat.users; 
    if (!users[userid]) {
      return null;
    }
    const chatid = getChatId(userid, this.props.user._id);
    const chatmsgs = this.props.chat.chatmsg.filter(v=> v.chatid === chatid);
    
    return(
      <div id="chat-page">
        <NavBar 
          className="chat-nav-header"
          mode="dark"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          {users[userid].name}
        </NavBar>
          {/* <QueueAnim dely={100}> */}
          {chatmsgs.map(v => {
            const avatar = require(`../img/${users[v.from].avatar}.png`)
            return v.from === userid  ? (
              <List key={v._id}>
                <Item thumb={avatar}>{v.content}</Item>
              </List>
            ) : (
              <List key={v._id}>
                <Item 
                  extra={<img src={avatar} alt="头像" />}
                  className="chat-me"
                >{v.content}</Item>
              </List>
            )
          })}
          {/* </QueueAnim> */}
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              onChange={ v=> {
                this.setState({ text: v})
              }}
              extra={
                <div>
                  <span 
                    style={{marginRight: 15}}
                    onClick={()=> {
                      this.setState({
                        showEmoji: !this.state.showEmoji
                      })
                      this.fixCarousel()
                    }}
                  >😁</span>
                  <span onClick={() =>this.handleSubmit()}>发送</span>
                </div>
              }
            />
          </List>
          {this.state.showEmoji ? (
            <Grid 
              data={emoji}
              columnNum={9}
              isCarousel={true}
              carouselMaxRow={4}
              onClick={el => {
                this.setState({
                  text: this.state.text+el.text
                })
              }}
            />
          ) : null}
        </div>
      </div>
    )
  }
}

export default Chat;