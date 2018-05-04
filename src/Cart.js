import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';
import { editOrder, fetchCart } from './store';
import UserAddresses from './UserAddresses';

class Cart extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, history } = this.props;
    cart.status = 'order';
    this.props.editOrder(cart, history);
  }

  render() {
    const { cart, lineItems, total } = this.props;
    const { onChange, onDelete, onSubmit } = this;
    return (
      <div>
        <h1>Cart</h1>
        <h3>{!cart.id && 'Please sign in.'}</h3>
        {cart.id && (
          <div className="order">
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
            <div>
              <UserAddresses onSubmit={onSubmit} />
            </div>
          </div>
        )}
      </div>
    );
  }
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editOrder: order => dispatch(editOrder(order, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
