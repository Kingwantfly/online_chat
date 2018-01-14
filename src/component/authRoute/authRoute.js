import { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { loadData } from "../../redux/user"

@connect(
  null,
  {loadData}
)
// 装饰器写法，withRouter包裹组件来获取history等方法
@withRouter
class AuthRoute extends Component {

  componentDidMount () {
    const publicList = ["/login", "/register"];
    const pathname = this.props.location.pathname;
    if (publicList.indexOf(pathname) > -1) {
      return null
    }
    // 获取用户信息
    axios.get('/user/info')
      .then(res => {
        if (res.status === 200) {
          if (res.data.code === 0) {
            // 登录成功，有登录信息
            this.props.loadData(res.data.data);
          } else {
            this.props.history.push('/login');
          }
        }
      })
    // 是否登录
    // 现在的url地址
    // 用户的userType，boss或者eagle
    // 用户是否完善信息（选择头像，个人简介）
  }
  render () {
    return (
      null
    )
  }
}

export default AuthRoute;

// function mapStateToProps(state) {
//   return {
//     state
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({loadData}, dispatch)
//   }
// }
// withRouter包裹组件来获取history等方法
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AuthRoute));
// export default AuthRoute;
