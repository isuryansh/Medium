import { AppBar } from "../components/AppBar";
import { BlogsCard } from "../components/BlogsCard";
import { useblogs } from "../hooks";

function Blogs() {
  const { loading, blogs } = useblogs();
  if (loading) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center pt-72 text-lg">
          Loading Blogs....
        </div>
      </>
    );
  }

  return (
    <>
      <AppBar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogsCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              publishDate={"9 Jan 2025"}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Blogs;
