import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './store';
import { connect } from 'react-redux';

class PasswordChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: '',
      newPassword: '',
      inputEdited: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const { inputEdited } = this.state;
    inputEdited[name] = true;
    this.setState({ [name]: value, inputEdited });
  }

  onSubmit(id) {
    const { newPassword } = this.state;
    const user = Object.assign({}, { id }, { password: newPassword });
    this.props.createOrUpdateUser(user);
    this.props.onUpdate();
  }

  render() {
    const { user } = this.props;
    const { oldPassword, newPassword, inputEdited } = this.state;
    const { onChange, onSubmit } = this;
    const passwordCorrect = oldPassword === user.password;
    return (
      <div>
        <div>
          <input
            className="form-control"
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={onChange}
          />
          <input
            className="form-control"
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={onChange}
          />
          {!passwordCorrect && inputEdited.oldPassword && <Alert color="info">Old Password is incorrect</Alert>}
          {passwordCorrect && inputEdited.newPassword && !newPassword.length && <Alert color="info">New Password cannot be empty</Alert>}
          <button type="submit" className="btn btn-success" style={{ "width": "100%" }} onClick={() => onSubmit(user.id)} disabled={!passwordCorrect || !newPassword.length}>
            Change
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  user = user || {};
  return { user };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createOrUpdateUser: user => {
      dispatch(createOrUpdateUser(user, history));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChange);
