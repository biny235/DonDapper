import React from 'react';
<<<<<<< HEAD
import { connect } from 'react-redux';

const Cart = () => {
  return (
    <div />
  );
};

const mapStateToProps = ({ cart }) => {
  return {
    cart
  };
};

export default connect(mapStateToProps)(Cart);
=======
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
>>>>>>> aj
