import React from 'react';
import { connect } from 'react-redux';

const Cart = () => {
  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

const mapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

export default connect(mapStateToProps)(Cart);
