import React, { Component } from "react";
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile';
import AvatarSelector from "../../component/avatar/avatarSelector";
import { connect } from "react-redux";
import { update } from "../../redux/user";
import { Redirect } from "react-router-dom";

@connect(
  state => state.user,
  {update}
)

class EagleInfo extends Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "", //职位
      company: "", //公司
      money: "", //薪资
      desc: "",  //职位描述
      avatar: ""  //头像
    }
    this.selectAvatar = this.selectAvatar.bind(this);
  }
  handleChange (key, val) {
    this.setState({
      [key]: val
    })
  }
  selectAvatar (imgName) {
    this.setState({
      avatar: imgName
    })
  }
  render () {
    const path = this.props.location.pathname;
    const redirect = this.props.redirectTo;
    return (
      <div>
        {redirect && redirect !== path ? <Redirect to={this.props.redirectTo} /> : null}
        <NavBar mode="dark">飞鹰完善信息页</NavBar>
        <AvatarSelector 
          selectAvatar={this.selectAvatar}
        />
        <InputItem
          onChange = {v => this.handleChange('title', v)}
        >求职岗位
        </InputItem>
        <TextareaItem
          onChange = {v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='个人简介'
        />
        <Button 
          type="primary"
          onClick={()=>{
            this.props.update(this.state);
          }}
        >保存</Button>
      </div>
    )
  }
}

export default EagleInfo;