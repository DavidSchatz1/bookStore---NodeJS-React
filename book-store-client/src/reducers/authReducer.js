export const initialAuthState = {
  user: null,
  isAdmin: false,
};

export function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAdmin: action.payload.isAdmin || false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAdmin: false,
      };

    case 'UPDATE_USER_INFO':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };

      case 'DELETE_ACCOUNT':
      return {
        ...state,
        user: null,
        isAdmin: false,
      };

    default:
      return state;
  }
}
