import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./BlogsCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 w-full px-6 py-4 mx-20 my-14 max-w-screen-2xl">
          <div className="col-span-9 pr-8">
            <div className="text-4xl font-semibold">{blog.title}</div>
            <div className="text-slate-600 pt-1 pb-2">12th December 2025</div>
            <div>{blog.content}</div>
          </div>
          <div className="col-span-3 boder border-l-2 border-gray-600 pl-5 ">
            <div className="text-lg text-slate-600">Author</div>
            <div className="flex flex-row pl-2">
              <div className="pt-1.5">
                <Avatar name={blog.author.name} size={"small"} />
              </div>
              <div className="font-semibold text-2xl ml-2">
                {blog.author.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
