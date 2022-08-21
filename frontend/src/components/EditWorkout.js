import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const EditWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  var location = useLocation();

  console.log(location.search);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = { title, load, reps };
    const response = await fetch("/api/workouts", {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      //   setError({
      //     title: "Error",
      //     message: json.error,
      //   });
      console.log(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      console.log(json);
      //   setError({
      //     title: "New workout",
      //     message: "New workout added successfully",
      //   });
      setEmptyFields([]);
      //setError(null);
      console.log("New workout added", json);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };
  return (
    <div style={{ width: "50%", alignContent: "center", margin: "0 auto" }}>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>
        <label>Exercise Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button className={!reps ? "noHover" : ""} disabled={!reps}>
          Update workout
        </button>
      </form>
    </div>
  );
};

export default EditWorkout;
