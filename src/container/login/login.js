import React, { Component } from "react";
import Logo from "../../component/logo/logo"
import { List, InputItem, WhiteSpace, WingBlank, Button  } from "antd-mobile";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../redux/user";
import FormComp from "../../component/heightComponent/heightComponent";
// import { bindActionCreators } from "redux";

@connect(
  state => state.user,
  {login}
)
@FormComp  //高阶组件用法
class Login extends Component {
  constructor (props) {
    super(props);
    // this.state = {
    //   user: "",
    //   pwd: ""
    // }
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleRegister () {
    console.log("props", this.props);
    this.props.history.push("./register")
  }
  // handleChange (key, val) {
  //   this.setState({
  //     [key]: val
  //   })
  // }
  handleLogin () {
    this.props.login(this.props.state);
  }
  render() {
    return (
      <div>
        {this.props.redirectTo&& this.props.redirectTo !== "/login" ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
            <InputItem
              onChange = {v => this.props.handleChange('user', v)}
            >用户名
            </InputItem>
            <InputItem
              onChange = {v => this.props.handleChange('pwd', v)}
              type='password'
            >密码
            </InputItem>
          </List>
          <WhiteSpace />
          <Button 
            type='primary'
            onClick={this.handleLogin}
          >登陆</Button>
          <WhiteSpace />
          <Button type='primary' onClick={this.handleRegister}>注册</Button>
        </WingBlank>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     user: state.user
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({login},dispatch)
//   }
// }
// export default connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;