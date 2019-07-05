import _ from 'lodash'
import React, { Component } from 'react';
import 'styling/semantic.less';
// import 'semantic-ui-less/semantic.less'; 
import {Grid, Header, Segment ,Label, Icon, Search} from 'semantic-ui-react'
var axios = require('axios');
async function src() {
  var b = await axios.get('/api/coins');
  var a = b.data;
  var c = a.map(o=>{
    return {
      id: o.id,
      title: o.basedata.name,
      description: (
        <div><a href={`/coins/${o.id}`}>
        {/* <Label>
          <Icon name='heart' color='red'/> {o.totalvote}
        </Label>
        <p>{o.about}</p> */}
        </a>
        </div>
      ),
      image: `/public/img/coin/${o._id.toLowerCase()}.png`,
      price: o.marketdata.price.USD.toFixed(2) + ' USD'
    }
  });
  return c;
  console.log(c);
}
export default class Sa extends React.Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = function(){this.setState({ isLoading: false, results: [], value: '' })}

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.title });
    //this.props.selectCoin(result.id);
  }

  handleSearchChange = (e, { value }) => {
    console.log(value);
    this.setState({ isLoading: true, value })

    setTimeout(async () => {
      var source = await src();
      //console.log(source);
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
          <Search
            icon=''
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            results={results}
            value={value}
            {...this.props}
          />
    )
  }
}
