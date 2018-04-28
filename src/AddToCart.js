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

  onSubmit(ev) {
    ev.preventDefault();
    const { cart, product, lineItem } = this.props;
    if (!lineItem) {
      this.props.addLineItem({
        quantity: this.state.quantity * 1,
        orderId: cart.id,
        productId: product.id
      });
    }
    else {
      const quantity = (this.state.quantity * 1) + (lineItem.quantity * 1);
      this.props.editLineItem({ quantity }, lineItem.id);
    }
    this.setState({
      quantity: 1
    });
  }

  render() {
    const { onChange, onSubmit } = this;
    const { quantity } = this.state;
    const { cart } = this.props;
    return (
      <div>
        <form>
          <input onChange={onChange} name='quantity' value={quantity} type='number' step='1' />
          <button type='submit' disabled={!cart.id} onClick={onSubmit}>Add to Cart</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ cart, user, lineItems }, { product }) => {
  const lineItem = lineItems && lineItems.find(lineItem => lineItem.productId === product.id);
  return {
    cart, product, user, lineItem
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addLineItem: (lineItem) => dispatch(addLineItem(lineItem, history)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);
