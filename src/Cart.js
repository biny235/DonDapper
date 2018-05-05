import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';
import { editOrder } from './store';
import UserAddresses from './UserAddresses';
import axios from 'axios';

class Cart extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, user } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    axios.post(`/api/email/send`, email)
      .then(res => res.data);
    this.props.editOrder({ status: 'order' }, cart.id);
  }

  render() {
    const { cart, lineItems, total } = this.props;
    const { onSubmit } = this;
    return (
      <div>
        <h1>Cart</h1>
        <h3>{!cart.id && 'Please sign in.'}</h3>
        {cart.id && (
          <div className="order order-container">
            <div>Item</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
            <div>Remove</div>
            {lineItems.map(lineItem => (
              <LineItem key={lineItem.id} line={lineItem} cart={true} />
            ))}
            {cart.id && (
              <button
                type="submit"
                disabled={!lineItems.length}
                onClick={onSubmit}
              >
                Check Out
              </button>
            )}
            <div className="order-total">Total:</div>
            <div>$ {total}</div>

          </div>
        )}
        <div>
          <UserAddresses onSubmit={onSubmit} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, lineItems, user, products }) => {
  const total =
    lineItems &&
    lineItems.reduce((quantity, line) => {
      const product = products.find(_product => _product.id === line.productId);
      quantity += product.price * line.quantity;
      return quantity;
    }, 0);
  return {
    cart,
    lineItems,
    user,
    total
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editOrder: (order, id) => dispatch(editOrder(order, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
