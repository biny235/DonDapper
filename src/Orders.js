import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LineItem from './LineItem';

const Order = (props) => {
  
  const { user, products, order, lineItems, id } = props;
  console.log(lineItems)
  return (
    <div>
      <h3>Order ID: {order && order.id}</h3>
        <table>
          <tbody>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total</th>
            </tr>
            {lineItems && lineItems.map(lineItem => <LineItem key={lineItem.id} line={lineItem}/>) }
          </tbody>
        </table>
    </div>
  );
};

const mapStateToProps = ({ user, orders, products,  loading }, { id }) => {
  const order = orders && id && orders.find(order => order.id === id);
  const lineItems = order && order.lineItems
  return { user, order, products, lineItems };
};

export default connect(mapStateToProps)(Order);