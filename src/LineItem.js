import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line, cart }) => {
  if (!line || !product) {
    return null;
  }
  return (
    <div className='order order-line'>
      <div >{product.name}</div>
      <div >{product.price}</div>
      {!cart && <div >{line.quantity}</div>}
      {!cart && <div >{line.quantity * product.price}</div>}
    </div>
  );
};

const mapStateToProps = ({ products }, { line, cart }) => {
  const product = products && products.find(product => line.productId === product.id);
  return {
    product, cart
  };
};

export default connect(mapStateToProps)(LineItem);
