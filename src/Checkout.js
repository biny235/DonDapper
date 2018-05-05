import React from 'react';
import AddressDropdown from './AddressDropdown';
import AddressForm from './AddressForm';
import { editOrder } from './store';
import axios from 'axios';

class Checkout extends React.Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    const { cart, user } = this.props;
    const email = {
      from: '"Grace Shopper" <grace@shopper.com>',
      to: user.email,
      subject: 'Order Confirmed',
      text: `Hi, ${user.firstName}. Your order ID is ${cart.id}.`
    };
    axios.post(`/api/email/send`, email)
      .then(res => res.data);
    this.props.editOrder({ status: 'order' }, cart.id);
  }

  render() {
    const order = { id: 1, addressId: 3 };
    return (
      <div>
        <div>
          <AddressDropdown orderId={order.id} />
        </div>
        <div>
          <AddressForm addressId={order.addressId} />
        </div>
      </div>
    );
  }
}

export default Checkout;
