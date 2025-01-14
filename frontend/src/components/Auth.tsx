import { SignupInput } from "@suryanshvaish45/zod-commons";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_REACT_API_URL;

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${backendUrl}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
        postInput
      );
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error) {
      alert("Error while signing in");
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="text-3xl font-extrabold">
            {type == "signin" ? "Login your Account" : "Create an account"}
          </div>
          <div className="text-slate-400 pt-1">
            {type == "signin"
              ? "Don't have an account"
              : " Already have an account"}
            <Link
              className="pl-2 underline"
              to={type == "signin" ? "/signup" : "/signin"}
            >
              {type == "signin" ? "Create" : "Login"}
            </Link>
          </div>
          <div className="py-5">
            {type == "signup" ? (
              <LabelledPLaceholder
                label="Name"
                placeholder="name"
                onchange={(e) => {
                  setPostInput((c) => ({
                    ...c,
                    name: e.target.value,
                  }));
                }}
              />
            ) : null}
            <LabelledPLaceholder
              label="Email"
              placeholder="Email"
              onchange={(e) => {
                setPostInput((c) => ({
                  ...c,
                  username: e.target.value,
                }));
              }}
            />
            <LabelledPLaceholder
              label="Password"
              type={"password"}
              placeholder="Password"
              onchange={(e) => {
                setPostInput((c) => ({
                  ...c,
                  password: e.target.value,
                }));
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="w-full mt-4 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type == "signup" ? "signup" : "signin"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface InputTypes {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledPLaceholder({
  label,
  placeholder,
  onchange,
  type,
}: InputTypes) {
  return (
    <div className="pt-4">
      <label className="block mb-2 text-sm font-medium text-black">
        {label}
      </label>
      <input
        type={type || "text"}
        id="first_name"
        onChange={onchange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
}
