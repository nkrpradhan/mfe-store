import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import counterSlice, { increment, clear } from "../features/counterSlice";
// import userSlice, { setGlobalUser } from "../features/userSlice";
import userSlice, {
  setGlobalUser,
  logoutUser,
  fetchUser,
} from "../features/userSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
  },
});

export function CounterStore() {
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return {
    count,
    increment: () => dispatch(increment()),
    clear: () => dispatch(clear()),
  };
}

// export function LoginStore() {
//   const user = useSelector((state) => state.user.user);

//   const dispatch = useDispatch();
//   return {
//     user,
//     setUser: (user) => dispatch(setGlobalUser(user)),
//   };
// }
export function LoginStore() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return {
    user,
    postUser: (userDetails) => dispatch(fetchUser(userDetails)),
    setUser: (user) => dispatch(setGlobalUser(user)),
    logoutUser: () => dispatch(logoutUser()),
  };
}
export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
