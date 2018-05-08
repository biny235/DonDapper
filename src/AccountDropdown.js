import React from 'react';
import LoginModal from './LoginModal';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class AccountDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    return (
      <Dropdown className="nav-link" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="remove-all" caret>
          Account
        </DropdownToggle>
        <DropdownMenu className="account-dropdown">
          <LoginModal />
        </DropdownMenu>
      </Dropdown>
    );
  }
}
