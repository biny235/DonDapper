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
  onClick(addressId){
    const {editOrder, orderId} = this.props
    this.props.editOrder({id: orderId, addressId})
  }

  render() {
    const { addresses } = this.props.user;
    const { value } = this.state;
    const { toggle, onClick } = this;
    return (

        <Dropdown isOpen={this.state.dropdownOpen} toggle={toggle}>
          <DropdownToggle > 
            Choose an Address
          </DropdownToggle>
          <DropdownMenu>
            {addresses && addresses.map(address => (
                <span key={address.id} value={address.id} onClick={()=>onClick(address.id)}>
                  {address.fullAddress}
                </span>
              ))
            }
            <span onClick={()=>onClick(null)}>Add an Address</span>
          </DropdownMenu>
        </Dropdown>
    );
  }
}

const mapStateToProps = ({ user }) => {

  return {
    user
  };

};

const mapDispatchToProps = dispatch =>{

  return{
    editOrder: order => dispatch(editOrder(order))
  }
}

export default connect(mapStateToProps)(AddressDropdown);
