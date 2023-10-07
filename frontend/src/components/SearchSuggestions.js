import React from 'react'
import './SearchSuggestion.css'

const CheckoutSteps = ({data}) => {
    console.log(data);
    return (
      <div className=''>
        {
            data.map((data)=>{
               return <p className='searchterm'>{data}</p>
            })  
        }
      </div>
    )
  }
  
  export default CheckoutSteps