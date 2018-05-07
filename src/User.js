import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserForm from './UserForm';
import OrderRow from './OrderRow';
import LoginModal from './LoginModal';
import Order from './Order';

class User extends Component {
  constructor() {
    super();
    this.state = {
      showOrder: false,
      orderId: null
    };
    this.onClick = this.onClick.bind(this);
    this.hide = this.hide.bind(this);
  }
  onClick(orderId) {
    this.setState({ showOrder: true, orderId })
    window.scrollTo(0, 345)
  }
  hide(){
    window.scrollTo(0, 0)
    this.setState({ showOrder: false, orderId: null })
  }

  render() {
    const { user, orders } = this.props;
    const { showOrder, orderId } = this.state;
    const { onClick, hide } = this;
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
              <span onClick={()=>onClick(order.id)} key={order.id}>
                <OrderRow order={order} />
              </span>
              )
            )}
        </div>
        <div className="user-form">
          <h3>Update Info</h3>
          <UserForm />
        </div>
        {showOrder && orderId ? (
          <div id="order" className="account-order" >
            <div className="close" onClick={hide}>Hide</div>
            <Order id={orderId} />
          </div>
          ): (
            null
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ user, orders }) => {
  orders = orders && orders.filter(order => order.userId === user.id)
  return { user, orders };
};

export default connect(mapStateToProps)(User);
