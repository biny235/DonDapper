import React from 'react';
import { connect } from 'react-redux';
import LineItem from './LineItem';

const Order = ({ order, lineItems }) => {
  return (
    <div>
      <h3>Order ID: {order && order.id}</h3>
      <div className='order'>
        <div className='orderheader'>Item</div>
        <div className='orderheader'>Price</div>
        <div className='orderheader'>Qty</div>
        <div className='orderheader'>Total</div>
        {lineItems && lineItems.map(lineItem => <LineItem key={lineItem.id} line={lineItem} />)}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user, orders, products }, { id }) => {
  const order = orders && id && orders.find(order => order.id === id);
  const lineItems = order && order.lineItems;
  return { user, order, products, lineItems };
};

export default connect(mapStateToProps)(Order);
