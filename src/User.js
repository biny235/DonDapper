import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const User = ({ user, userOrders, lineItems }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      {
        userOrders.map(order => (
          <div key={order.id}>
            <Link to={`/orders/${order.id}`}>
              {order.id}
            </Link>
            <ul>
              {lineItems.filter(lineItem => lineItem.orderId === order.id).map(lineItem => (
                <ul key={lineItem.id}>{lineItem.name}</ul>
              ))}
            </ul>
          </div>
        ))
      }
    </div>
  );
};


const mapStateToProps = ({ users, orders, lineItems }, { id }) => {
  const user = users.find(user => user.id === id);
  const userOrders = orders.filter(order => order.userId === id);
  return { user, userOrders, lineItems };
};

export default connect(mapStateToProps)(User);
