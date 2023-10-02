import axios from "axios";

export const listProducts=()=>async(dispatch)=>{

    try{

        dispatch({type:'PRODUCT_LIST_REQUEST'});

        const res=await axios.get('/api/products');

        dispatch({type:'PRODUCT_LIST_SUCCESS' ,
            payload:res.data
    })
    }
    catch(e){

        dispatch({type:'PRODUCT_LIST_FAIL',
            payload:e.message
        })

    }
}



export const listProductDetails=(id)=>async(dispatch)=>{

    try{

        dispatch({type:'PRODUCT_DETAILS_REQUEST'});

        const res=await axios.get(`/api/products/${id}`);

        dispatch({type:'PRODUCT_DETAILS_SUCCESS' ,
            payload:res.data
    })


    }
    catch(e){

        dispatch({type:'PRODUCT_DETAILS_FAIL',
            payload:e.message
        })

    }


}





export const deleteProduct = (id) => async (dispatch,getState) => {
    try {
      dispatch({
        type: 'PRODUCT_DELETE_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
        await axios.delete(`/api/products/${id}`,config)
  
      dispatch({
        type: 'PRODUCT_DELETE_SUCCESS',
      })
    
    }
  
    catch(e){
  
        dispatch({
            type: 'PRODUCT_DELETE_FAIL',
            payload: e.message,
          })
  
    }
  
  }
  
  


  
export const addProduct = (product) => async (dispatch,getState) => {
    try {
      dispatch({
        type: 'PRODUCT_ADD_REQUEST',
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
        await axios.post(`/api/products`,product,config)
  
      dispatch({
        type: 'PRODUCT_ADD_SUCCESS',
      })
    
    }
  
    catch(e){
  
        dispatch({
            type: 'PRODUCT_ADD_FAIL',
            payload: e.message,
          })
  
    }
  
  }
  
  
    


