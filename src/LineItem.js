import React from 'react';
import { connect } from 'react-redux';

const LineItem = ({ product, line }) =>{
  console.log(line)
  if(!line || !product){
    return null
  }
  return( 
      <tr>
        <td>{ product.name }</td>
        <td>{ product.price }</td>
        <td>{ line.quantity }</td>
        <td>{ line.quantity * product.price }</td>
      </tr>
  )
}

const mapStateToProps = ({products}, { line }) =>{
  const product = products && products.find(product => line.productId === product.id)
  return{
    product
  }
}

export default connect(mapStateToProps)(LineItem);