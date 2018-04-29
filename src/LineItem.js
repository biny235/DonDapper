import React from 'react';
import { deleteLineItem, editLineItem,} from './store';
import { connect } from 'react-redux';

// 

class LineItem extends React.Component{
  constructor(props){
    super(props)
    this.onChange = this.onChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
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
  render(){
    const {line, product, cart} = this.props;
    const {onChange, onDelete} = this;
    if (!line || !product) {
      return null;
    }
    return (
      <div className='order order-line'>
        <div>
          {product.name}
          <div className="product-description-text">{product.description}</div>
        </div>
        <div>$ {product.price}</div>
        {!cart ? <div >{line.quantity}</div> : (
          <form>
            <input className="order-qty" onChange={(ev) => onChange(ev, line.id)} name='quantity' value={line.quantity} type='number' step='1' />
          </form>
        ) }
        <div>$ {line.quantity * product.price}</div>
        {cart && <button className="btn" type='submit' onClick={(ev) => onDelete(ev, line)}>&#10060;</button>}
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteLineItem: (id) => dispatch(deleteLineItem(id)),
    editLineItem: (lineItem, id) => dispatch(editLineItem(lineItem, id)),
  };
};


const mapStateToProps = ({ products }, { line, cart }) => {
  const product = products && products.find(product => line.productId === product.id);
  return {
    product, cart
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LineItem);
