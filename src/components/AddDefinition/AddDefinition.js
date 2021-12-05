import { useState } from "react";
import classes from "./AddDefinition.module.css";
import Search from "./Search";
import Save from "./Save";

const AddDefinition = () => {
  const [showForm, setShowForm] = useState(false);

if(!showForm) {
    return (
        <div className="row my-3">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Add a new OHLC definition and its correponding OHLC feeder</h5>
            <button
              className={`btn btn-outline-success btn-lg ${classes.saveButton}`}
              onClick={() => setShowForm(true)}
            >
              Show form
            </button>
          </div>
        </div>
      </div>
    )
} else {
    return (
      <>
        <Search />
        <Save closeFormHandler={() => setShowForm(false)} />
      </>
    );
}

};

export default AddDefinition;
