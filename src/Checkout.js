import React from 'react';
import { connect } from 'react-redux';
import { editOrder } from './store';
import axios from 'axios';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
import Autocomplete from './Autocomplete';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.edit = this.edit.bind(this);
  }

  onSubmit() {
    const { cart, user, history } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    // axios.post(`/api/email/send`, email).then(res => res.data);
    cart.addressId
      ? this.props.editOrder({ id: cart.id, status: 'order' }, history)
      : this.props.editOrder(
        { id: cart.id, status: 'order', addressId: user.addresses[0].id },
        history
      );
  }
  edit() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  render() {
    const { onSubmit, edit } = this;
    const { user, cart, address } = this.props;
    const { editing } = this.state;
    return (
      <div>
        <h1>Checkout</h1>
        {!user.id ? (
          <div>Please sign in.</div>
        ) : (
            <div>
              <AddressDropdown />
            </div>
          )}
        {!cart.addressId ? <Autocomplete cart={cart} /> : (
          editing ?
            <AddressForm cart={cart} edit={edit} />
            :
            <div>
              <div>{address.fullAddress}</div>
              <button onClick={edit}>Edit</button>
            </div>
        )}
        {user.id && (
          <button type="submit" onClick={onSubmit} disabled={!cart.addressId}>
            Check Out
          </button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => {
  const address = user.addresses && user.addresses.find(address => address.id === cart.addressId)
  return {
    cart,
    user,
    address
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: (order, history) => dispatch(editOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
