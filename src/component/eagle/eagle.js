import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chartUser"
import UserCard from "../userCard/userCard"
@connect(
  state => state.chartuser,
  {getUserList}
)
class Eagle extends Component {

  componentDidMount () {
    this.props.getUserList("boss")
  }

  render() {
    return <UserCard userList={this.props.userList} />;
  }
}

export default Eagle;