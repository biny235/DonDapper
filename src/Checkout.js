import React from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
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
    this.onEdit = this.onEdit.bind(this);
  }

  onSubmit(token) {
    const { cart, user, history } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    // axios.post(`/api/email/send`, email).then(res => res.data);
    this.props.editOrder({ id: cart.id, status: 'order' }, history);
    axios.post(`/api/stripe/pay`, { stripeToken: token.id }).then(res => res.data);
  }

  onEdit() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  render() {
    const { onSubmit, onEdit } = this;
    const { user, cart, address, total } = this.props;
    const { editing } = this.state;
    return (
      <div>
        <h1>Review Order</h1>
        {!user.id ? (
          <div>Please sign in.</div>
        ) : (
            <div>
              ~ ORDER INFO GOES HERE ~
              <AddressDropdown />
            </div>
          )}
        {!cart.addressId ? <Autocomplete cart={cart} /> : (
          editing ?
            <AddressForm cart={cart} onEdit={onEdit} />
            :
            <div>
              <div>{address.fullAddress}</div>
              <button onClick={onEdit}>Edit</button>
            </div>
        )}
        {user.id &&
          <StripeCheckout
            name="Payment"
            description="Please review your order"
            panelLabel="Check Out - "
            amount={total * 100}
            currency="USD"
            email={user.email}
            disabled={!cart.addressId}
            token={onSubmit}
            stripeKey="pk_test_t4Gsi41KZkmzWDyxcwcFMHhp"
          />}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user, lineItems, products }) => {
  const address = user.addresses && user.addresses.find(address => address.id === cart.addressId);
  const total =
    lineItems &&
    lineItems.reduce((quantity, line) => {
      const product = products.find(_product => _product.id === line.productId);
      quantity += product.price * line.quantity;
      return quantity;
    }, 0);
  return {
    cart,
    user,
    address,
    total
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: (order, history) => dispatch(editOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
