import React, {Component} from 'react';
import {
  Input,
  Button,
} from 'antd';
import Header from '../../components/Header';


interface AppProps {
  value: string;
}
interface AppState {
  count: number;

}
class ClassComponentDemo extends React.Component<any , any>{
  constructor(props: any){
    super(props);
    // const childRef = React.createRef();
    this.onRef = this.onRef.bind(this);
    this.state = {
      name: 'xiaoh'
    };
  }
  public child: any;
  onRef(ref:any){

    this.child = ref;

}
  inputChange = (e:any) => {
    console.log(e.target.value)
    this.setState({
      name: e.target.value
    })
  }
  handleClick() {
    console.log(this.state.name)
  }
  parentFunc(e: any) {
    console.log('父组件方法被调用，传来值：',e)
  }
  handleChildFunc() {
    this.child.testFunc()
  }
  render(){
    const {name} = this.state
    return (
      <div className="class-dmeo">
        <Header/>
        我是父组件{this.state.name}
        <Input value={this.state.name} onChange={(e)=>{this.inputChange(e)}}/>
        <Button onClick={() => this.handleClick()}>订阅</Button>
        <Button onClick={() => this.handleChildFunc()}>handleChildFunc</Button>

        <Child onRef={this.onRef} value={this.state.name} parentFunc={(e: any)=>{this.parentFunc(e)}}></Child>
      </div>
    )
  }
}

class Child extends React.Component<any , any> {
  constructor(props: any){
    super(props)
    this.props.onRef(this);
    this.state = {
      newName: this.props.value
    }
  }

  
  inputChange = (e:any) => {
    console.log(e.target.value)
    this.setState({
      newName: e.target.value
    })
  }

  handleOk() {
    console.log(2)
    this.props.parentFunc(this.state.newName)
  }
  testFunc(){
    console.log('111')
  }
  render(){
    return (
      <div className="class-dmeo">
        从父组件值：{this.props.value}

        我是子组件
        <Input value={this.state.newName} onChange={(e)=>{this.inputChange(e)}}/>
        <Button onClick={() => this.handleOk()}>确定</Button>
      </div>
    )
  }
}

export default ClassComponentDemo;
