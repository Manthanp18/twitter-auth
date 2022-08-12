import React from "react";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/client";

import axios from "axios";
import { useRouter } from "next/router";
function dashboard(session) {
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
      <div className="flex flex-col mx-96 h-screen">
        <form onSubmit={handleSubmit}>
          <h2 className="mt-10 text-2xl px-40 tracking-widest mb-9">
            Tweet Thread Working
          </h2>
          {formValues.map((element, index) => (
            <div>
              {/* <label>Bucket Item</label> */}
              <textarea
                className="border-b-2 block h-32 w-full my-1 text-lg outline-none"
                placeholder="Enter your bucketlist item"
                type="textarea"
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

        <button onClick={() => signOut()}>Sign out</button>
      </div>
    </div>
  );
}

export default dashboard;
