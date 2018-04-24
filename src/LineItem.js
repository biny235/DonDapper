import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line }) =>{
  console.log(line)
  if(!line || !product){
    return null
  }
  return( 
      <div>
        <div className='orderproduct'>{ product.name }</div>
        <div className='orderprice'>{ product.price }</div>
        <div className='orderqty'>{ line.quantity }</div>
        <div className='ordertotal'>{ line.quantity * product.price }</div>
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