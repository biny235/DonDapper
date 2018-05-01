import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import UserForm from './UserForm';


class LoginModal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
    this.onChange = this.onChange.bind(this)
  }
  onChange(slideIndex){
    this.setState({slideIndex})
  }
  

  render() {
    const { slideIndex } = this.state;
    const { user } = this.props;
    const { onChange } = this;
    console.log(slideIndex)
    return (

      <div>
        <div>
          {!user.id && 

            (<span>
              <button onClick={()=>onChange(0)} >Login</button>
              <button onClick={()=>onChange(1)} >Sign Up</button>
              </span>
            )}
        </div>
        {
        slideIndex === 0 ? 
          <LoginForm />
          :
          user.id ? 
            null
            :
            <UserForm />
        }
      </div>
    )
  }
}

const mapStateToProps = ({user})=>{
  return{
    user
  }
}

export default connect(mapStateToProps)(LoginModal)
