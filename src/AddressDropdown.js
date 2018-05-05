import React, { Component } from 'react';
import { connect } from 'react-redux';
import { editOrder } from './store';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class AddressDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }
  onClick(addressId) {
    const { editOrder, orderId } = this.props;
    const order = { id: orderId, addressId };
    console.log(order);
    //this.props.editOrder(order)
  }

  render() {
    const { addresses } = this.props;
    const { value } = this.state;
    const { toggle, onClick } = this;
    return (

      <Dropdown isOpen={this.state.dropdownOpen} toggle={toggle}>
        <DropdownToggle >
          Choose an Address
          </DropdownToggle>
        <DropdownMenu>
          {addresses.map(address => (
            <DropdownItem key={address.id} onClick={() => onClick(address.id)}>
              {address.fullAddress}
            </DropdownItem>
          ))
          }
          <DropdownItem key={null} onClick={() => onClick(null)}>Add an Address</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
}

const mapStateToProps = ({ user }) => {
  let { addresses } = user;
  addresses = addresses || [];
  return {
    addresses
  };
};

const mapDispatchToProps = dispatch => {

  return {
    editOrder: order => dispatch(editOrder(order))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddressDropdown);
