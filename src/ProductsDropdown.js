import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { connect } from 'react-redux';

class ProductsDropdown extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  onClick(id) {
    if (location.hash === '#/products'){
      const element = document.getElementById(id);
      element ? element.scrollIntoView() : null
    }
  }

  render() {
    const { categories} = this.props;
    const { handleChange } = this;

    return (
      <Dropdown className="nav-link" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="remove-all" caret>
          Products
        </DropdownToggle>
        <DropdownMenu>
          {categories.map(category => {
                return (
                  <DropdownItem key={category.id} onClick={()=>{this.onClick(category.id)}}>
                    {location.hash === '#/products' ?
                    (<div> {category.name} </div>)
                    :
                    (<Link className="remove-all" to={{ pathname: '/products', state: { id: category.id } }} >
                      {category.name}
                    </Link>)}
                  </DropdownItem>
                );
              })}
            <DropdownItem>
              <Link className="remove-all" to={'/products'}>
                Shop All
              </Link>
            </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

const mapStateToProps = ({ categories })=>{
  return{
    categories
  }
}

export default connect(mapStateToProps)(ProductsDropdown)
