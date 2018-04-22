import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Order = ({ user, products, order, lineItems }) => {
  return (
    <div>
      <h1>My Account</h1>
      <h2>Order ID: {order && order.id}</h2>
      {
        order && (
          <div>
            <ul>
              {lineItems.filter(lineItem => lineItem.orderId === order.id).map(lineItem => (
                <li key={lineItem.id}>
                  <Link to={`/orders/${order.id}`}>
                    {products.find(product => product.id === lineItem.productId).name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      }
    </div>
  );
};


const mapStateToProps = ({ user, orders, products, lineItems }, { id }) => {
  const order = orders && orders.find(order => order.id === id);
  return { user, order, products, lineItems };
};

export default connect(mapStateToProps)(Order);
