import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LineItem from './LineItem';

const Cart = props => {
  const { cart, lineItems, total } = props;
  return (
    <div>
      <h1>Cart</h1>
      <h3>{!cart.id && 'Please sign in.'}</h3>
      {cart.id && lineItems.length ? (
        <div className="order order-container">
          <div>Item</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div>Remove</div>
          {
            lineItems.map(lineItem => (
              <LineItem key={lineItem.id} line={lineItem} cart={true} />
            ))
          }
          <Link to={'/checkout'} className="btn btn-success">Check Out</Link>
          <div className="order-total">Total:</div>
          <div>$ {total}</div>
        </div>
      ) : <div>Your have no items in your cart.</div>}
    </div>
  );
};

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

export default connect(mapStateToProps)(Cart);
