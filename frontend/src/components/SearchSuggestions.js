import React from 'react'
import './SearchSuggestion.css'

const CheckoutSteps = (props) => {

    const handleClick = (data)=>{
          props.handleFilter(data)
    }

      return (
      <div >
        {
            props.data.map((data,index)=>{
               return <p key={index} onClick={()=>handleClick(data)} className='searchterm'>{data}</p>
            })  
        }
      </div>
    )
  }
  
  export default CheckoutSteps