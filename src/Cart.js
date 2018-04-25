import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';

const Cart = ({ cart, lineItems }) => {
  return (
    <div>
      <h1>Cart</h1>
      {
        cart.id && (<div className='order'>
          <div className='orderheader'>Item</div>
          <div className='orderheader'>Price</div>
          <div className='orderheader'>Qty</div>
          <div className='orderheader'>Total</div>
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
