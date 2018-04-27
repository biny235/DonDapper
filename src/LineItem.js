import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line }) =>{
  console.log(line)
  if(!line || !product){
    return null
  }
  return( 
    <div className="order order-line">
        <div >{ product.name }</div>
        <div >{ product.price }</div>
        <div >{ line.quantity }</div>
        <div >{ line.quantity * product.price }</div>
    </div>
  )
}

const mapStateToProps = ({products}, { line }) =>{
  const product = products && products.find(product => line.productId === product.id)
  return{
    product
  }
}

export default connect(mapStateToProps)(LineItem);