import React from "react";
import ReactTable from "react-table/lib";
import 'react-table/react-table.css';
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import 'styling/semantic.less';
import { Button, Icon, Label , Grid, Popup, Flag} from 'semantic-ui-react'
import loadData from './loadData';
import {AppLayout} from '../component/app-layout/app-layout';
import './table-style.css';
import HomeForm from "./home-form";
export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // setTimeout(()=>{
      this.load();
    // }, 500);
    // setInterval(()=>{
      // this.load();
  // }, 60000);
    // this.load();
  }
  load(){
    loadData().then((a)=>{
      console.log(a);
      this.setState({
        data: a
      })
    });
  }
  handleOnclick(id){
    axios.get('/api/vote/update/'+id).then((err, mesage)=>{
      this.load();
    })
  }
  render() {
    const {data} = this.state;
    // const { classes } = this.props;
    loadData().then((a)=>{
      console.log(a);
    })
    console.log(data);
    return (
      data ? <div>aaaa</div>: <div>bb</div>
      // <AppLayout changeBase={(base)=>{
      //   this.setState({
      //     base: base
      //   })
      // }}>
      // {data&&
      // (
      //   <HomeForm
      //   data={data}
      //   base={'USD'}
      //   >
      //   </HomeForm>
      // )}
      // </AppLayout>
    );
  }
}