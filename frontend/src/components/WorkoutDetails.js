import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteDialog from "../components/UI/DeleteDialog";

const WorkoutDetails = ({ workout, showModal }) => {
  const { dispatch } = useWorkoutsContext();
  const [showBox, setShowBox] = useState(null);

  const handleDelete = () => {
    showConfirmDialog();
  };
  //Alert box
  const showConfirmDialog = () => {
    setShowBox({
      title: "Delete",
      message: "Are you sure you want to delete this workout?",
    });
  };
  const deleteHandler = async (choose) => {
    if (choose) {
      const response = await fetch("api/workouts/" + workout._id, {
        method: "DELETE",
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "DELETE_WORKOUT", payload: json });
        showModal();
      }
    } else {
      setShowBox(null);
    }
  };

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load}
      </p>
      <p>
        <strong>Reps:</strong> {workout.reps}
      </p>
      <p>{workout.createdAt}</p>
      <span onClick={handleDelete}>Delete</span>
      {showBox && (
        <DeleteDialog
          title={showBox.title}
          message={showBox.message}
          onDialog={deleteHandler}
        />
      )}
    </div>
  );
};

export default WorkoutDetails;
