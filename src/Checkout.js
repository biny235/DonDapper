import React from 'react';
import AddressDropdown from './AddressDropdown'
import AddressForm from './AddressForm'

class Checkout extends React.Component{
  

  render(){
    const order = {id: 1, addressId: 3}
    return(
      <div>
        <div>
          <AddressDropdown orderId={order.id}/>
        </div>
        <div>
          <AddressForm addressId={order.addressId}/>
        </div>
      </div>
    )
  }
}

export default Checkout