import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUser, logout } from './store';

class LoginForm extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSubmit() {
    this.props.fetchUser(this.state);
  }

  onSignOut() {
    const { path, history } = this.props;
    this.props.logout(path, history);
  }

  render() {
    const { user } = this.props;
    const { onChange, onSubmit, onSignOut } = this;
    if (user.name) {
      return (
        <div>
          <button className="btn btn-danger" type="reset" onClick={onSignOut}>
            Sign Out
          </button>
        </div>
      );
    }
    return (
      <div className="form-inline">
        <input className="form-control" onChange={onChange} name="email" type="email" />
        <input className="form-control" onChange={onChange} name="password" type="password" />
        <button className="btn btn-success" type="submit" onClick={onSubmit}>
          Sign In
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: user => {
      dispatch(fetchUser(user));
    },
    logout: (path, history) => dispatch(logout(path, history, dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
