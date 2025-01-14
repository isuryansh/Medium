import { Link } from "react-router-dom";

export const AppBar = () => {
  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link to={"/blogs"}>
        <div className="flex flex-col justify-center cursor-pointer text-xl font font-semibold pt-2 pl-6">
          Medium
        </div>
      </Link>
      <div className="flex flex-row gap-8 mr-4">
        <Link to={`/publish`}>
          <button
            className="rounded-lg bg-green-600 mt-1 py-1 px-4 border border-transparent text-center text-base text-white transition-all shadow-md hover:shadow-lg focus:bg-green-700 focus:shadow-none active:bg-green-700 hover:bg-green-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
            type="button"
          >
            Publish
          </button>
        </Link>
        <div className="pt-2 cursor-pointer ">
          <Link to={"/signin"}>
            <button onClick={logout}>Logout</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const logout = async () => {
  localStorage.removeItem("token");
};
