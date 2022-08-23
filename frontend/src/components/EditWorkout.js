import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import ErrorModal from "../components/UI/ErrorModal";

const EditWorkout = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  let location = useLocation("");
  let { _id, _title, _load, _reps } = location.state;

  useEffect(() => {
    // const getData = async () => {
    //   let _response = await fetch(`api/workouts/${_id}`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //let res = await _response.json();
    // if (!_response.ok) {
    //   setError({
    //     title: "Error",
    //     message: res.error,
    //   });
    // console.log(res.error);
    //} else {
    //console.log(res);

    // setTitle(res.title);
    // setLoad(res.load);
    // setReps(res.reps);

    //dispatch({ type: "SINGLE_WORKOUT", payload: res });
    //}
    //};
    //getData();
    setTitle(_title);
    setLoad(_load);
    setReps(_reps);
  }, [_id, _title, _load, _reps]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Call update
    var workout = { title, load, reps };
    const response = await fetch(`/api/workouts/${_id}`, {
      method: "PATCH",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError({
        title: "Error",
        message: json.error,
      });
      //console.log(json.error);
      setEmptyFields(json.emptyFields);
    } else {
      setTitle("");
      setLoad("");
      setReps("");
      // console.log(json);
      setError({
        title: "Update workout",
        message: "Workout updated successfully",
      });
      setEmptyFields([]);
      //setError(null);
      // console.log("Workout Updated", json);
      dispatch({ type: "UPDATE_WORKOUT", payload: json });
    }
  };
  const errorHandler = () => {
    setError(null);
    navigate("/");
  };
  return (
    <div style={{ width: "50%", alignContent: "center", margin: "0 auto" }}>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <form className="create" onSubmit={handleSubmit}>
        <h3>Edit Workout</h3>
        <label>Exercise Title:</label>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (in kg):</label>
        <input
          required
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          required
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        <button className={!reps ? "noHover" : ""} disabled={!reps}>
          Update workout
        </button>
        <button
          onClick={() => {
            navigate("/");
          }}
          style={{ marginLeft: "16px" }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditWorkout;
