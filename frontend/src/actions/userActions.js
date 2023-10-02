import axios from "axios"

export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_LOGIN_REQUEST',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      )
  
      dispatch({
        type: 'USER_LOGIN_SUCCESS',
        payload: data,
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_LOGIN_FAIL',
        payload:error.message
      })
    }
  }


  export const logout=()=>(dispatch)=>{

    localStorage.removeItem('userInfo');
    dispatch({
      type:"USER_LOGOUT"
    })

    dispatch({
      type:'ORDER_LIST_MY_RESET'
    })

    dispatch({
      type:'USER_LIST_RESET'
    })

  }




  export const register = (name,email, password) => async (dispatch) => {
    try {
      dispatch({
        type: 'USER_REGISTER_REQUEST',
      })
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
  
      const { data } = await axios.post(
        '/api/users',
        {name, email, password },
        config
      )
  
      dispatch({
        type: 'USER_REGISTER_SUCCESS',
        payload: data,
      })

      dispatch({
        type:'USER_LOGIN_SUCCESS',
        payload:data
      })
  
      localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
      dispatch({
        type: 'USER_RESGISTER_FAIL',
        payload:error.message
      })
    }
  }



  export const listUsers = () => async (dispatch,getState) => {
    try {
      dispatch({
        type: 'USER_LIST_REQUEST',
      })

      const {userLogin:{userInfo}}=getState();

  
      const config = {
        headers: {
          Authorization:`Bearer ${userInfo.token}`
        },
      }
  
      const {data}=await axios.get('/api/users',config)
      
  
      dispatch({
        type: 'USER_LIST_SUCCESS',
        payload: data,
      })
  
    } catch (error) {
      dispatch({
        type: 'USER_LIST_FAIL',
        payload:error.message
      })
    }
  }
