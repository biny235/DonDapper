import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from './store';

<<<<<<< HEAD
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

=======
class LoginForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
>>>>>>> aj
  // componentWillReceiveProps({ user }){
  //   if(user !== this.state.user){
  //     this.setState({ user })
  //   }
  // }
<<<<<<< HEAD

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSubmit(ev) {
    this.props.handleSubmit(this.state);
  }

  render() {
    const { user } = this.props;
    const { onChange, onSubmit } = this;
    if (user.name) {
      return null;
    }
    return (
      <div>
        <input onChange={onChange} name='email' type='email' />
        <input onChange={onChange} name='password' type='password' />
        <button onClick={onSubmit}>Submit</button>
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
    handleSubmit: user => dispatch(fetchUser(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
=======
  onChange(ev){
    const change = {};
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }
  onSubmit(ev){
    this.props.handleSubmit(this.state)
  }


  render(){
    const { user } = this.props
    const { onChange, onSubmit } = this;
    if(user.name){
      return null
    }
    return(
      <div>
        <input onChange={ onChange } name='email' type='email' />
        <input onChange={ onChange } name='password' type='password' />
        <button onClick={ onSubmit }>Submit</button>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) =>{
  return{
    user
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    handleSubmit: user => dispatch(fetchUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
>>>>>>> aj
