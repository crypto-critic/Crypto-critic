import React from 'react'

export default class ChangeRenderer extends React.Component {
    // did you know that React passes props to your component constructor??
    constructor(props) {
        super(props);
        // from here you can access any of the props!
        // console.log('The value is ' + props.value);
        // we can even call grid API functions, if that was useful
        // props.api.selectAll();
    }

    render() {
        // or access props using 'this'
        return (
        <span>
        {
            this.props.value > 0 ?
            <div style={{color: '#39ac39'}}>+{this.props.value.toFixed(2)}%</div> :
            <div style={{color: '#e63900'}}>{this.props.value.toFixed(2)}%</div>
        }
        </span>);
    }
}
