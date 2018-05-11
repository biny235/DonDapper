import React, { Component } from 'react';
import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { editOrder } from './store';
import axios from 'axios';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
import Autocomplete from './Autocomplete';
import Order from './Order';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      editing: false
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onSubmit(token) {
    const { cart, user, total, history } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    // axios.post(`/api/email/send`, email).then(res => res.data);
    this.props.editOrder({ id: cart.id, status: 'order' }, history);
    const charge = {
      amount: total * 100,
      currency: 'usd',
      description: `order ID: ${cart.id}`,
      source: token.id,
      receipt_email: user.email
    };
    axios.post(`/api/stripe/pay`, charge).then(res => res.data);
  }

  onEdit() {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  render() {
    const { onSubmit, onEdit } = this;
    const { user, cart, address, lineItems, total } = this.props;
    const { editing } = this.state;
    if (!user.id) return (null);
    return (
      <div className='checkout'>
        <div>
          <h1>Review Order</h1>
          <Order cart={cart} cartLineItems={lineItems} />
        </div>
        <div>
          <AddressDropdown />
          {!cart.addressId ? <Autocomplete cart={cart} /> : (
            editing ?
              <AddressForm cart={cart} onEdit={onEdit} />
              :
              <div>
                <div>{address.fullAddress}</div>
                <button onClick={onEdit}>Edit</button>
              </div>
          )}
          <StripeCheckout
            name='Payment'
            description='Please review your order'
            panelLabel='Place Order - '
            amount={total * 100}
            currency='USD'
            email={user.email}
            disabled={!cart.addressId}
            token={onSubmit}
            stripeKey='pk_test_t4Gsi41KZkmzWDyxcwcFMHhp'
          >
            <button type='submit' className='btn btn-success'>Check Out</button>
          </StripeCheckout>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user, lineItems, products }) => {
  const address = user.addresses && user.addresses.find(address => address.id === cart.addressId);
  const total =
    lineItems &&
    lineItems.reduce((quantity, line) => {
      const product = products.find(product => product.id === line.productId);
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
