import axios from "axios";
import { useEffect, useState } from "react";

const backendUrl = import.meta.env.VITE_REACT_API_URL;

export interface Blog {
  content: string;
  title: string;
  id: string;
  author: {
    name: string;
  };
}

export const useblog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlogs] = useState<Blog>();

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    blog,
  };
};

export const useblogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
};
