import React, { Component } from 'react';
import { deleteLineItem, editLineItem } from './store';
import { connect } from 'react-redux';

class LineItem extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      quantity: this.props.line.quantity || 1
    }
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  onChange(ev, id) {
    const { line } = this.props;
    line[ev.target.name] = ev.target.value * 1;
    this.props.editLineItem(line, id);
    this.setState({quantity: ev.target.value * 1})
  }

  onDelete(ev, id) {
    ev.preventDefault();
    this.props.deleteLineItem(id);
  }

  render() {
    const { line, product, cart } = this.props;
    const { onChange, onDelete } = this;
    const { quantity } = line;
    if (!line || !product) {
      return null;
    }
    return (
      <div className="line-item order-line">
        <div>
          {product.name}
          <div className="product-description-text">{product.description}</div>
        </div>
        <div>$ {product.price}</div>
        {!cart ? (
          <div>{line.quantity}</div>
        ) : (
          <form>
            <input
              className="order-qty"
              onChange={ev => onChange(ev, line.id)}
              name="quantity"
              value={quantity}
              type="number"
              step="1"
              min="1"
            />
          </form>
        )}
        <div>$ {line.quantity * product.price}</div>
        {cart && (
          <button
            className="btn btn-link"
            type="submit"
            onClick={ev => onDelete(ev, line)}
          >
            &#10060;
          </button>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteLineItem: id => dispatch(deleteLineItem(id)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id))
  };
};

const mapStateToProps = ({ products }, { line, cart }) => {
  const product =
    products && products.find(product => line.productId === product.id);
  return {
    product,
    cart
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);
