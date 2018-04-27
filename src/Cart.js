import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';

const Cart = ({ cart, lineItems }) => {
  return (
    <div>
      <h1>Cart</h1>
      <h3>{!cart.id && 'Please sign in.'}</h3>
      {
        cart.id && (<div className='order'>
          <div>Item</div>
          <div>Price</div>
          <div>Qty</div>
          <div>Total</div>
          {lineItems && lineItems.map(lineItem => <LineItem key={lineItem.id} line={lineItem} />)}
        </div>)
      }
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  const lineItems = cart && cart.lineItems;
  return {
    cart, lineItems
  };
};

export default connect(mapStateToProps)(Cart);
