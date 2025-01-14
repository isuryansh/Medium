import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";
import { useblog } from "../hooks";
import { useParams } from "react-router-dom";

export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useblog({
    id: id || "",
  });
  if (loading || !blog) {
    return (
      <>
        <AppBar />
        <div className="flex justify-center pt-72 text-lg">
          Loading Blog....
        </div>
      </>
    );
  }
  return <FullBlog blog={blog} />;
};
