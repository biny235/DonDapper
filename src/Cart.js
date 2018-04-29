import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';
import { editOrder, fetchCart } from './store';

class Cart extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, user } = this.props;
    this.props.editOrder({ status: 'order' }, cart.id);
  }

  render() {
    const { cart, lineItems } = this.props;
    const { onChange, onDelete, onSubmit } = this;
    return (
      <div>
        <h1>Cart</h1>
        <h3>{!cart.id && 'Please sign in.'}</h3>
        {
          cart.id && (
            <div className='order'>
              <div>Item</div>
              <div>Price</div>
              <div>Quantity</div>
              <div>Total</div>
              {lineItems.map(lineItem => (
                  <LineItem key={lineItem.id} line={lineItem} cart={true} />
              ))}
            </div>
          )
        }
        {cart.id && <button type='submit' disabled={!lineItems.length} onClick={onSubmit}>Check Out</button>}
      </div>
    );
  }
}

const mapStateToProps = ({ cart, lineItems, user }) => {
  return {
    cart, lineItems, user
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    editOrder: (order, id) => dispatch(editOrder(order, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
