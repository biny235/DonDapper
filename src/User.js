import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

const User = ({ user, products, userOrders, lineItems }) => {
  return (
    <div>
      <h1>Account</h1>
      <h2>{user.name}</h2>
      <h3>{!user.name ? 'Please sign in.' : 'Orders'}</h3>
      {userOrders.map(order => (
        <div key={order.id}>
          <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link>
        </div>
      ))}
      <UserForm user={user} />
    </div>
  );
};

const mapStateToProps = ({ user, orders, products, lineItems }) => {
  const userOrders = orders && orders.filter(order => order.userId === user.id);
  return { user, userOrders, products, lineItems };
};

export default connect(mapStateToProps)(User);
