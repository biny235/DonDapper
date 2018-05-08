import React from 'react';
import { connect } from 'react-redux';
import AddressDropdown from './AddressDropdown';
import { editOrder } from './store';
import axios from 'axios';

class Checkout extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    const { onSubmit } = this;
    const { user, cart } = this.props;
    return (
      <div>
        <h1>Checkout</h1>
        {!user.id ? <div>Please sign in.</div> :
          <div>
            <AddressDropdown />
          </div>}
        {user.id && <button type="submit" onClick={onSubmit} disabled={!cart.addressId}>
          Check Out
        </button>}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user }) => {
  return {
    cart,
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (order, history) => dispatch(editOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
