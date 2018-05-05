import React from 'react';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
import { editOrder } from './store';
//import UserAddresses from './UserAddresses';
import axios from 'axios';
class Checkout extends React.Component {
  constructor() {
    super();

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, user, history } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    axios.post(`/api/email/send`, email).then(res => res.data);
    cart.status = 'order';
    this.props.editOrder(cart, history);
  }

  render() {
    const order = { id: 1, addressId: 3 };
    return (
      <div>
        <div>
          <AddressDropdown orderId={order.id} />
        </div>
      </div>
    );
  }
}

export default Checkout;
