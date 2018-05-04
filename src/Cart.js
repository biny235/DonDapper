import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LineItem from './LineItem';
import { editOrder, fetchCart } from './store';
import OrderAdressDropdown from './OrderAdressDropdown';

const Cart = (props)=>{
  const { cart, lineItems, total } = props;
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
          {lineItems.length ? lineItems.map(lineItem => (
            <LineItem key={lineItem.id} line={lineItem} cart={true} />
          )) : <div className="line-item">Please Add Something to Your Cart</div>}
          {lineItems.length ? (
            <Link
              to={'/checkout'}
              className="btn btn-success"
            >
              Check Out
            </Link>
          )
          :
          <button
              disabled={!lineItems.length}
              className="btn btn-success"
            >
              Check Out
            </button>
        }
          <div className="order-total">Total:</div>
          <div>$ {total}</div>
          
        </div>
      )}
    </div>
  );
}


const mapStateToProps = ({ cart, lineItems, user, products }) => {
  const total =
    lineItems &&
    lineItems.reduce((total, line) => {
      const product = products.find(_product => _product.id === line.productId);
      return (total += product.price * line.quantity);
    }, 0);
  return {
    cart,
    lineItems,
    user,
    total
  };
};

export default connect(mapStateToProps)(Cart);
