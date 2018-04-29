import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';

const User = ({ user, orders }) => {
  return (
    <div>
      <h1>Account</h1>
      <h2>{user.name}</h2>
      <h3>{!user.name ? 'Please sign in.' : 'Orders'}</h3>
      {orders.map(order => (
        <div key={order.id}>
          <Link to={`/orders/${order.id}`}>Order ID: {order.id}</Link>
        </div>
      ))}
      <UserForm user={user} />
    </div>
  );
};

const mapStateToProps = ({ user, orders }) => {
  return { user, orders };
};

export default connect(mapStateToProps)(User);
