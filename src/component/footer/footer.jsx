import React, { Component } from 'react'
import { Input, Menu } from 'semantic-ui-react'

export default class Footer extends Component {
  state = {}

  Aboutus = (e, { name }) => {
      this.setState({ activeItem: name });
      window.location.assign('/about-us');
    }
    Listing = (e, { name }) => {
        this.setState({ activeItem: name });
        window.location.assign('/listing');
      }

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Menu.Item
          name='About Us'
          active={activeItem === 'About Us'}
          onClick={this.Aboutus}
        />
        <Menu.Item
          name='Listing'
          active={activeItem === 'Listing'}
          onClick={this.Listing}
        />
      </Menu>
    )
  }
}