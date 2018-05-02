import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

export default class Autocomplete extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      predictions: []
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev){
    ev.target.value.length === 0 ? 
      this.setState({predictions: []})
      :
      ev.target.value.length > 5 ?
        axios.post('/google/getpredictions', {input: ev.target.value})
        .then(res => res.data)
        .then(predictions => {
          console.log(predictions)
          this.setState({predictions})
        })
        :
        null
  }
  onClick(placeId){
    axios.post('/google/getplace', {query: placeId})
      .then(res =>console.log(res.data))
      .catch(err => console.log(err))
  }

  render(){
    const { predictions } = this.state;
    const { onChange, onClick } = this;
    return(
      <div>
        <input onChange={onChange}/>
        <ul>
          {predictions.length ? predictions.map(pred =>(
            <li key={pred.place_id} onClick={()=>onClick(pred.place_id)}>{pred.description}</li>
          )) : null}
        </ul>
      </div>
    )
  }


}

