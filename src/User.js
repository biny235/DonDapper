import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import OrderRow from './OrderRow';
import LoginModal from './LoginModal';

class User extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
    this.click = this.click.bind(this);
  }
  click() {
    this.setState({ showForm: true });
  }
  componentWillReceiveProps(nextProps) {
    !nextProps.user.id && this.setState({ showForm: false });
  }
  render() {
    const { user, orders } = this.props;
    const { showForm } = this.state;
    if(!user.id){
      return(
        <div>
          <h1>Please Sign In</h1>
          <div className="account-login">
            <LoginModal />
          </div>
        </div>
      )   
    }
    return (
      <div className="account">
        <h2 className="user">{user.name}</h2>
        <div className="orders">
          <h3>Orders</h3>
            <div className="order-row">
              <div>ID</div> 
              <div>Shipped</div> 
              <div>Total</div> 
            </div>
          {orders.map(order => (
                <OrderRow order={order} key={order.id} />
              )
            )}
        </div>
        <div className="user-form">
          <h3>Update Info</h3>
          <UserForm />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  orders = orders && orders.filter(order => order.userId === user.id)
  return { user, orders };
};

export default connect(mapStateToProps)(User);
