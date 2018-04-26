import React from 'react';
import { connect } from 'react-redux';
import { addLineItem, editLineItem } from './store';

class AddToCart extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSubmit() {
    const { lineItem, cart, product } = this.props;
    const quantity = this.state.quantity + Number(lineItem.quantity);
    if (!lineItem) {
      this.props.addLineItem({
        quantity,
        productId: product.id,
        orderId: cart.id
      });
    }
    else {
      this.props.editLineItem({
        quantity
      }, lineItem.id);
    }
    this.setState({
      quantity: 1
    });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { quantity } = this.state;
    return (
      <div>
        <form>
          <input onChange={onChange} name='quantity' value={quantity * 1} type='number' step='1' />
          <button type='submit' onClick={onSubmit}>Add to Cart</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user, lineItems, orders }, { product }) => {
  const lineItem = lineItems && lineItems.find(lineItem => lineItem.productId === product.id);
  const carts = orders && orders.filter(order => order.status === 'cart');
  const cart = carts.find(cart => cart.userId === user.id);
  return {
    lineItem, cart, product
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addLineItem: (lineItem) => dispatch(addLineItem(lineItem)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
