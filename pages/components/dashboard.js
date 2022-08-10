import React from "react";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import axios from "axios";
import { useRouter } from "next/router";
function dashboard() {
  const [statuses, setStatuses] = useState();
  const [formValues, setFormValues] = useState([{ bucketitem: "" }]);

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };

  let addFormFields = () => {
    setFormValues([...formValues, { bucketitem: "" }]);
  };

  let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log(formValues);
      if (formValues[0].bucketitem === "") {
        alert("It can't be null");
        return;
      }
      const result = await axios
        .post("/api/twitter/thread", formValues)
        .then((res) => res.json());
    } catch (error) {
      alert("Opps! There is an error");
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Tweet Thread Working</h2>
          {formValues.map((element, index) => (
            <div key={index}>
              {/* <label>Bucket Item</label> */}
              <input
                placeholder="Enter your bucketlist item"
                type="text"
                name="bucketitem"
                value={element.bucketitem || ""}
                onChange={(e) => handleChange(index, e)}
              />

              {index ? (
                <button type="button" onClick={() => removeFormFields(index)}>
                  Remove
                </button>
              ) : null}
            </div>
          ))}
          <div>
            <button type="button" onClick={() => addFormFields()}>
              Add Item
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default dashboard;
