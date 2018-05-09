import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { editOrder, createOrUpdateProduct } from './store';
import ProductForm from './ProductForm';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      productId: null
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    const { history, user } = nextProps;
    if (!user.admin) history.push('/');
  }
  componenDidMount() {
    const { history, user } = this.props;
    // if (!user && !user.admin) history.push('/')
  }

  onChange(order) {
    order.shipped = !order.shipped;
    this.props.editOrder(order);
  }
  onClick(productId) {
    this.setState({ showForm: true, productId: productId });
  }

  render() {
    const { orders, categories, products, createOrUpdateProduct, user } = this.props;
    const { onChange, onClick, create } = this;
    const { showForm, productId } = this.state;
    return !user.admin ?  (null) 
    :
    (
      <div>
        <h1>All Orders</h1>
        <div>
          <h3>Order ID</h3>
        </div>
        {orders.length &&
          orders.map(order => (
            <div key={order.id}>
              <Link to={`/orders/${order.id}`}> {order.id}</Link>
              <div>
                <label className="switch">
                  <input
                    checked={order.shipped}
                    type="checkbox"
                    datatype="toggle"
                    onChange={() => onChange(order)}
                  />
                  <span className="slider" />
                </label>
              </div>
            </div>
          ))}
        <h1>Products By Category</h1>
        {categories.map(category => {
          return (
            <div key={category.id}>
              <h2>{category.name}</h2>
              {products.map(product => {
                if (product.categoryId === category.id) {
                  return (
                    <button
                      key={product.id}
                      onClick={() => onClick(product.id)}
                    >
                      {product.name}
                    </button>
                  );
                }
              })}
            </div>
          );
        })}
        <br />
        {showForm && <ProductForm productId={productId} />}
        <br />
        <div>
          <button onClick={() => onClick(null)}>Add New Product</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ user, orders, products, categories }) => {
  return {
    user,
    orders,
    categories,
    products
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editOrder: order => {
      dispatch(editOrder(order));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
