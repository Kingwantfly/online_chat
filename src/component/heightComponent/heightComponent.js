import React, { Component } from "react";

//高阶组件
export default function FormComp (Comp){
  return class WrappComp extends Component {

    constructor (props) {
      super(props);
      this.state = {

      }
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange (key, val) {
      this.setState({
        [key]: val
      })
    }

    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props} />
    }
  }
}