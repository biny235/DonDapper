import React, { Component } from 'react';
import UserForm from './UserForm';
import { connect } from 'react-redux';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
    this.click = this.click.bind(this);
  }
  click() {
    this.setState({ showForm: true });
  }
  componentWillMount(nextProps) {
    !nextProps.user.id && this.setState({ showForm: false });
  }

  render() {
    const { showForm } = this.state;
    return (
      <div>
        <h1>Home</h1>
        <p>Welcome to our online store.</p>
        <button onClick={() => this.click()}>
          {window.localStorage.getItem('token') ? 'update user' : 'create user'}
        </button>
        {showForm ? <UserForm /> : null}
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Home);
