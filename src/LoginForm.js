import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, logout } from './store';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
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

  onSubmit(ev) {
    this.props.fetchUser(this.state);
    this.setState({
      email: '',
      password: ''
    });
  }
  
  onSignOut(ev){
    this.props.logout()
  }

  render() {
    const { user } = this.props;
    const { onChange, onSubmit, onSignOut } = this;
    if (user.name) {
      return (
        <div>
          <button type='reset' onClick={onSignOut}>Sign Out</button>
        </div>
      );
    }
    return (
      <div>
        <input onChange={onChange} name='email' type='email' />
        <input onChange={onChange} name='password' type='password' />
        <button type='submit' onClick={onSubmit}>Sign In</button>
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
    fetchUser: user => dispatch(fetchUser(user)),
    logout: () => dispatch(logout(dispatch))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
