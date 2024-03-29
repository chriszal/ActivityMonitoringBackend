import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';
import { useRouter } from 'next/navigation';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const API_LOGIN_ENDPOINT = 'http://localhost:8081/api/login';


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      ...(
        // if payload (user) is provided, then is authenticated
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user
          })
          : ({
            isLoading: false
          })
      )
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

// The role of this context is to propagate authentication state through the App tree.

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const router = useRouter();
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      // const user= window.sessionStorage.getItem('token');
      const user = {
        id: '65784ea81e63bb4d7637641b',
        avatar: '/assets/avatars/avatar-anika-visser.png',
        name: 'Chris Zalachoris',
        email: 'christoszal@gmail.com',
        role:'admin'
      };

      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: user
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(
    () => {
      initialize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  // const signIn = async (email, password) => {
  //   try {
  //     const response = await fetch(API_LOGIN_ENDPOINT, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ email, password })
  //     });

  //     if (!response.ok) {
  //       const { message } = await response.json();
  //       throw new Error(message);
  //     }

  //     const { token } = await response.json();
  //     console.log(token);
  //     try {
  //       window.sessionStorage.setItem('authenticated', 'true');
  //       // Save token to session storage
  //       window.sessionStorage.setItem('token', token);
  //     } catch (err) {
  //       console.error(err);
  //     }


  //     // Decode token to extract user information
  //     const decoded = jwt_decode(token);

  //     dispatch({
  //       type: HANDLERS.SIGN_IN,
  //       payload: decoded
  //     });
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // };

  const signIn = async (email, password) => {
    if (email !== 'christoszal@gmail.com' || password !== '1234') {
      throw new Error('Please check your email and password');
    }

    try {
      window.sessionStorage.setItem('authenticated', 'true');
      
    } catch (err) {
      console.error(err);
    }
    const user = {
      id: '65784ea81e63bb4d7637641b',
      avatar: '/assets/avatars/avatar-anika-visser.png',
      name: 'Chris Zalachoris',
        email: 'christoszal@gmail.com',
      role:'admin'
    };
    if (user.role=="admin") {
      router.push('/admin-dashboard/studies');
    }else{
      router.push('/dashboard');
    }


    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user
    });
    

    
  };

  const signUp = async (email, name, password) => {
    throw new Error('Sign up is not implemented');
  };

  const signOut = () => {
    window.sessionStorage.setItem('authenticated', 'false')
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: {
        ...state.user,
        role: undefined
      }
    });
  };
  

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
