import React from 'react';
import { connect } from 'react-redux';


const Products = ({ products }) => {
  return (
    <ul>
      {products.map(product=>{
        return <li key={product.id}>
          {product.name} {product.price}
          <img src={product.imageUrl} />
        </li>
      })}
    </ul>
  );
};

const mapStateToProps = ({products})=>{
  return{
    products
  }
}

export default connect(mapStateToProps)(Products);
