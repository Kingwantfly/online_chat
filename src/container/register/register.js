import React, { Component } from "react";
import { List, InputItem, WhiteSpace, WingBlank, Button, Radio  } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Logo from "../../component/logo/logo"
import { register } from "../../redux/user"
import FormComp from "../../component/heightComponent/heightComponent";
// import { bindActionCreators } from "redux";   //绑定dispatch和actionCreator

@connect(
  state => state.user,
  {register}
)
@FormComp

class Register extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   user: "",
    //   pwd: "",
    //   checkpwd: "",
    //   type: "eagle" //或者boss
    // }
    this.handleRegister = this.handleRegister.bind(this);
  }
  componentDidMount () {
    //给type一个默认值
    this.props.handleChange("type", "eagle");
  }
  // handleChange (key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }
  handleRegister () {
    console.log(this.state);
    this.props.register(this.props.state);
  }
  render() {
    console.log('user', this.props);
    const RadioItem = Radio.RadioItem;
    
    return (
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo } /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange = {v => this.props.handleChange('user', v)}
            >
              用户名
            </InputItem>
            <InputItem
              onChange = {v => this.props.handleChange('pwd', v)}
              type='password'
            >密码
            </InputItem>
            <InputItem
              onChange = {v => this.props.handleChange('checkpwd', v)}
              type='password'
            >确认密码
            </InputItem>
            <WhiteSpace />
            <RadioItem 
              checked={this.props.state.type === 'eagle'}
              onChange={() => this.props.handleChange('type', 'eagle')}
            >
              求职
            </RadioItem>
            <RadioItem 
              checked={this.props.state.type === 'boss'}
              onChange={() => this.props.handleChange('type', 'boss')}              
            >
              招聘
            </RadioItem>
          </List>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

export default Register;

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({register},dispatch)
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Register);