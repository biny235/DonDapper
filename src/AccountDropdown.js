import React from 'react';
import LoginModal from './LoginModal';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class AccountDropdown extends React.Component {
  constructor() {
    super();
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
    const { path, history } = this.props;
    return (
      <Dropdown className="nav-link" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="remove-all" caret>
          Account
        </DropdownToggle>
        <DropdownMenu className="account-dropdown">
          <LoginModal path={path} history={history} />
        </DropdownMenu>
      </Dropdown>
    );
  }
}
