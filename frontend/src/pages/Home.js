import React, { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import ErrorModal from "../components/UI/ErrorModal";

const Home = (props) => {
  const { workouts, dispatch } = useWorkoutsContext();

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  const showModal = () => {
    setError({
      title: "Delete",
      message: "Workout deleted successfully",
    });
  };
  const errorHandler = () => {
    setError(null);
  };
  const handleGetWorkout = () => {};

  return (
    <div className="home">
      <div className="workouts">
        {error && (
          <ErrorModal
            title={error.title}
            message={error.message}
            onConfirm={errorHandler}
          />
        )}
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails
              key={workout._id}
              workout={workout}
              showModal={showModal}
              onMouseDown={handleGetWorkout}
            />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
