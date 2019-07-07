import React from "react";
import {MenuBar} from './MenuBar';
import './app-layout.css';

export class AppLayout extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
      }

  render(){
      const {children} = this.props;
      return (
        <div className='home-main'>
          <MenuBar/>
          <div className='home-container'>
              {children}
          </div>
        </div>
    );
  }
}
