import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';
import { deleteLineItem, editLineItem, editOrder, fetchCart } from './store';

class Cart extends React.Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev, id) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.props.editLineItem(change, id);
  }

  onDelete(ev, id) {
    ev.preventDefault();
    this.props.deleteLineItem(id);
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
              <div className='orderheader'>Item</div>
              <div className='orderheader'>Price</div>
              {lineItems.map(lineItem => (
                <div key={lineItem.id}>
                  <LineItem line={lineItem} cart={true} />
                  <form>
                    <label>Quantity</label>
                    <input onChange={(ev) => onChange(ev, lineItem.id)} name='quantity' value={lineItem.quantity} type='number' step='1' />
                  </form>
                  <button type='submit' onClick={(ev) => onDelete(ev, lineItem)}>Remove from Cart</button>
                </div>
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
    deleteLineItem: (id) => dispatch(deleteLineItem(id)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id)),
    editOrder: (order, id) => dispatch(editOrder(order, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
