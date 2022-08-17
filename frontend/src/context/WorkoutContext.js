import { createContext } from "react";

export const WorkoutsContext = createContext();

export const WorkoutsContextProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(workoutsReducer, {
  //   workouts: null,
  // });

  // dispatch({ type: "SET_WORKOUTS", payload: [{}, {}] });
  return <WorkoutsContext.Provider>{children}</WorkoutsContext.Provider>;
};
