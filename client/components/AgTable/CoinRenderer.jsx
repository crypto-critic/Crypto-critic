import React from 'react'

export default class CoinRenderer extends React.Component {
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
            <img src={`${this.props.data.image}`} width={20} height={20} /> {this.props.data.name}
        </span>);
    }
}