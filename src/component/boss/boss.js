import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserList } from "../../redux/chartUser"
import UserCard from "../userCard/userCard"

@connect(
  state => state.chartuser,
  {getUserList}
)
class Boss extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: []
    }
  }

  componentDidMount () {
    this.props.getUserList("eagle")
  }

  render() {
    return <UserCard userList={this.props.userList} />
  }
}

export default Boss;