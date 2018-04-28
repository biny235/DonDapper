import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line, cart }) => {
  if (!line || !product) {
    return null;
  }
  return (
    <div className='orderrow'>
      <div className='orderitem'>{product.name}</div>
      <div className='orderitem'>{product.price}</div>
      {!cart && <div className='orderitem'>{line.quantity}</div>}
      {!cart && <div className='orderitem'>{line.quantity * product.price}</div>}
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
