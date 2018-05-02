import React, { Component } from 'react';
import UserForm from './UserForm';
import { connect } from 'react-redux';

const Home = () => {
  return (
    <div className="home">
      <h1>Home</h1>
      <p>Welcome to our online store.</p>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Home);
