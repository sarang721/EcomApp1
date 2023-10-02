 const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
      case 'USER_LOGIN_REQUEST':
        return { loading: true }
      case 'USER_LOGIN_SUCCESS':
        return { loading: false, userInfo: action.payload }
      case 'USER_LOGIN_FAIL':
        return { loading: false, error: action.payload }
      case 'USER_LOGOUT':
        return {}
      default:
        return state
    }
  }



   const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
      case 'USER_REGISTER_REQUEST':
        return { loading: true }
      case 'USER_REGISTER_SUCCESS':
        return { loading: false, userInfo: action.payload }
      case 'USER_REGISTER_FAIL':
        return { loading: false, error: action.payload }
      
      default:
        return state
    }
  }



   const userListReducer = (state = {users:[]}, action) => {
    switch (action.type) {
      case 'USER_LIST_REQUEST':
        return { loading: true }
      case 'USER_LIST_SUCCESS':
        return { loading: false, users: action.payload }
      case 'USER_LIST_FAIL':
        return { loading: false, error: action.payload }

        case 'USER_LIST_RESET':
        return {}
      
      default:
        return state
    }
  }

  export {userLoginReducer,userRegisterReducer,userListReducer};
