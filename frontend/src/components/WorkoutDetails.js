import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import DeleteDialog from "../components/UI/DeleteDialog";
import Moment from "moment";
import { Link } from "react-router-dom";

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
      <p>{Moment(workout.createdAt).format("YYYY-MM-DD hh:mm:ss")}</p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        Delete
      </span>

      <div id="edit">
        {" "}
        <Link
          className="material-symbols-outlined"
          to="/editworkout"
          state={{
            _id: workout._id,
            _title: workout.title,
            _load: workout.load,
            _reps: workout.reps,
          }}
          // to={{
          //   pathname: "editworkout",
          //   state: { id: workout._id },
          // }}
        >
          Edit
        </Link>
      </div>
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
