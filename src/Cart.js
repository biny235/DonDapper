import React from 'react';
import { connect } from 'react-redux'

const Cart = ()=>{

  return(
    <div>
    </div>
  )
}

const mapStateToProps = ({ cart })=>{
  return {
    cart
  }
}

export default connect(mapStateToProps)(Cart);