import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line }) =>{
  console.log(line)
  if(!line || !product){
    return null
  }
  return( 
      <div className='orderrow'>
        <div className='orderitem'>{ product.name }</div>
        <div className='orderitem'>{ product.price }</div>
        <div className='orderitem'>{ line.quantity }</div>
        <div className='orderitem'>{ line.quantity * product.price }</div>
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