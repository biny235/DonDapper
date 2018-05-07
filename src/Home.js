import React from 'react';
import { connect } from 'react-redux';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome</h1>
      <h3>Look, feel, and smell like a gentleman.</h3>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStateToProps)(Home);
