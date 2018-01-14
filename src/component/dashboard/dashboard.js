import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { NavBar } from 'antd-mobile';
import NavLinkBar from "../navLink/navLink";
import { getMsgList, recvMsg } from "../../redux/chat";
import Boss from "../boss/boss";
import Eagle from "../eagle/eagle";
import User from "../user/user";
import Msg from "../msg/msg";
import QueueAnim from "rc-queue-anim";

@connect(
  state => state,
  {getMsgList, recvMsg}
)

class Dashboard extends Component {
  // componentDidMount() {
  //   if (!this.props.chat.chatmsg.length) {
  //     this.props.getMsgList()
  //     this.props.recvMsg()
  //   }
  // }
  render () {
    const { pathname } = this.props.location;
    const user = this.props.user;
    const navList = [
      {
       path: "/boss",
       text: "精英",
       icon: "boss",
       title: "精英列表",
       component: Boss,
       hide: user.type === "eagle"
      },
      {
        path: "/eagle",
        text: "boss ",
        icon: "job",
        title: "Boss列表",
        component: Eagle,
        hide: user.type === "boss"
      },
      {
        path: "/msg",
        text: "消息 ",
        icon: "msg",
        title: "消息列表",
        component: Msg
      },
      {
        path: "/me",
        text: "我",
        icon: "user",
        title: "个人中心",
        component: User
      }
    ];
    const page = navList.find(v=>v.path===pathname);
    return page ?(
      <div>
        <NavBar mode="dark" className="fixed-header">
          {page.title}
        </NavBar>
        <div style={{marginTop: 45}}>
          <QueueAnim type="scaleX" duration="800">
            <Route key={page.path} path={page.path} component={page.component} />
          </QueueAnim>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    ) : <Redirect to="/msg" />
  }
}

export default Dashboard;