import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../features/user";

export default function EditUser(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users.value);
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const [emailNotValid, setEmailNotValid] = useState(false);

  const userid = props.id;
  const user = allUsers.find((user) => user.id === parseInt(userid));
  const [updatedUser, setUpdatedUser] = useState({
    id: user.id,
    name: "",
    email: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const data = {
      ...updatedUser,
      name: nameInputRef.current.value,
      email: emailInputRef.current.value
    };
    
    dispatch(updateUser(data));
    router.push("/");
  };

  return (
    <div className=" w-screen">
      <div className="flex justify-center">
        <div className="w-[96%]">
          <h1 className="  text-3xl font-bold mt-12">Dashboard</h1>
        </div>
      </div>
      <div className="flex justify-center mt-12">
        <div className=" w-[96%] md:w-full shadow-2xl rounded-xl h-96">
          <div className="flex justify-between mt-4 mx-4">
            <div className=" font-semibold">
              <h3>Form</h3>
            </div>
          </div>
          <div className=" border-[1px] border-solid border-gray-300 mt-4"></div>
          <div className="flex items-end flex-col mt-16">
            <div className="w-[80%] flex justify-end mr-24">
              <label htmlFor="name" className="mr-24">
                Name
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user.name}
                required
                className=" outline-1 outline w-[60%] max-w-2xl shadow focus:outline-none focus:shadow-lg shadow-gray-100 outline-gray-300 py-3 px-4 rounded"
                ref={nameInputRef}
                // onChange={(e) => {
                //   setUpdatedUser({
                //     ...updatedUser,
                //     name: e.target.value,
                //   });
                // }}
              />
            </div>
            <div className="w-[80%] flex justify-end mr-24 mt-8">
              <label htmlFor="email" className=" mr-24">
                Email
              </label>
              <input
                type="email"
                name="email"
                defaultValue={user.email}
                required
                className=" outline-1 outline w-[60%] shadow focus:outline-none focus:shadow-lg shadow-gray-100 max-w-2xl outline-gray-300 py-3 px-4 rounded "
                ref={emailInputRef}
                // onChange={(e) => {
                //   setUpdatedUser({ ...updatedUser, email: e.target.value });
                // }}
              />
            </div>
            {/* {emailNotValid && (
              <div className=" text-red-600 text-xs font-thin text-center mr-24 mt-1">
                Email already exists
              </div>
            )} */}
            <div className=" w-[10%] flex space-x-8 justify-end mr-24 mt-8">
              <button
                className="outline outline-red-500 outline-1 text-red-500 px-8 py-2 rounded"
                onClick={() => {
                  router.push("/");
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-green-600 px-8 py-2 text-white rounded"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const userid = context.params.id;

  return {
    props: {
      id: userid,
    },
  };
}
