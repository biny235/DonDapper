import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './store';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSubmit(ev) {
    ev.preventDefault();
    this.props.fetchUser(this.state);
    this.setState({
      email: '',
      password: ''
    });
  }

  render() {
    const { user } = this.props;
    const { onChange, onSubmit } = this;
    if (user.name) {
      return (
        <div>
          <button onClick={onSubmit}>Sign Out</button>
        </div>
      );
    }
    return (
      <div>
        <input onChange={onChange} name='email' type='email' />
        <input onChange={onChange} name='password' type='password' />
        <button onClick={onSubmit}>Sign In</button>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUser: user => dispatch(fetchUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
