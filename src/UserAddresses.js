import React, { Component } from 'react';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DropDownMenu from 'material-ui/DropDownMenu';
import { connect } from 'react-redux';
import { editOrder } from './store';

class UserAddresses extends Component {
  constructor() {
    super();
    this.state = {
      value: -1
    };
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev, index, value) {
    this.setState({ value: value });
  }
  render() {
    const { addresses } = this.props.user;
    const { value } = this.state;
    const { onChange } = this;
    return (
      <MuiThemeProvider>
        <DropDownMenu value={value} onChange={onChange}>
          <MenuItem value={-1} primaryText="Choose an Address" />
          {addresses
            ? addresses.map(address => (
                <MenuItem
                  key={address.id}
                  value={address.id}
                  primaryText={address.name}
                />
              ))
            : null}
        </DropDownMenu>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(UserAddresses);
