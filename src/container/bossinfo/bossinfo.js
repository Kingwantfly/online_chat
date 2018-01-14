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

class BossInfo extends Component {
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
        <NavBar mode="dark">Boss完善信息页</NavBar>
        <AvatarSelector 
          selectAvatar={this.selectAvatar}
        />
        <InputItem
          onChange = {v => this.handleChange('title', v)}
        >招聘职位
        </InputItem>
        <InputItem
          onChange = {v => this.handleChange('company', v)}
        >公司名称
        </InputItem>
        <InputItem
          onChange = {v => this.handleChange('money', v)}
        >薪资范围
        </InputItem>
        <TextareaItem
          onChange = {v => this.handleChange('desc', v)}
          rows={3}
          autoHeight
          title='职位要求'
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

export default BossInfo;