import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { createOrUpdateUser } from './store';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: props.user.firstName || '',
        lastName: props.user.lastName || '',
        email: props.user.email || '',
        password: props.user.password || '',
      },
      inputEdited: {},
      errors: ''
    };
    this.onChange = this.onChange.bind(this);
    this.setErrors = this.setErrors.bind(this);
    this.clearErrors = this.clearErrors.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { firstName, lastName, email, password } = user;
    if (user.firstName !== this.state.user) {
      this.setState({
        user: { firstName, lastName, email, password }
      });
    }
  }

  onChange(ev) {
    const { name, value } = ev.target;
    const { inputEdited } = this.state;
    let { user } = this.state;
    inputEdited[name] = true;
    user = Object.assign({}, user, { [name]: value });
    this.setState({ user, errors: '' });
  }

  onSubmit(id) {
    const user = Object.assign({}, { id }, this.state.user);
    this.props.createOrUpdateUser(user)
      .catch(err => {
        this.setErrors(err.response.data, user);
      });
    this.setState({ inputEdited: {} });
  }

  setErrors(err, user) {
    if (!user.id) this.setState({ user: {} });
    this.setState({ errors: err });
  }

  clearErrors() {
    this.setState({ errors: '', inputEdited: {} });
  }

  render() {
    const { user } = this.props;
    const { inputEdited, errors } = this.state;
    const { firstName, lastName, email, password } = this.state.user;
    const { onChange, onSubmit } = this;
    const fields = { firstName: 'First Name', lastName: 'Last Name', email: 'E-mail', password: 'Password' };
    const emptyFields = Object.keys(fields).filter(field => !this.state.user[field] && inputEdited[field]);
    return (
      <div>
        {
          !!errors &&
          <Alert color="info" toggle={this.clearErrors}>
            {errors}
          </Alert>
        }
        {
          !!emptyFields.length &&
          <Alert color="info" toggle={this.clearErrors}>
            {`${emptyFields.map(field => fields[field]).join(', ')} cannot be empty`}
          </Alert>
        }
        <div>
          <input
            className="form-control"
            name="firstName"
            placeholder="First Name"
            value={firstName || ''}
            onChange={onChange}
          />
          <input
            className="form-control"
            name="lastName"
            placeholder="Last Name"
            value={lastName || ''}
            onChange={onChange}
          />
          <input
            className="form-control"
            name="email"
            placeholder="E-mail"
            value={email || ''}
            onChange={onChange}
          />
          {!user.id ? <input
            className="form-control"
            type="password"
            name="password"
            placeholder="Password"
            value={password || ''}
            onChange={onChange}
          /> :
            null
          }
          <button type="submit" className="btn btn-success" style={{ "width": "100%" }} onClick={() => onSubmit(user.id)} disabled={emptyFields.length}>
            {user.id ? 'Update' : 'Create'}
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

const mapDispatchToProps = dispatch => {
  return {
    createOrUpdateUser: user => dispatch(createOrUpdateUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
