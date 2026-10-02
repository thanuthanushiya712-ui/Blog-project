import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "./common/Footer";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const API_URL = "http://localhost:10000/api/blogs";

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(API_URL);
      console.log(res.data);
      setBlogs(res.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBlogs();
  }, []);

  const handleLike = async (blog_id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/like/${blog_id}`
      );

      if (response.status === 200) {
        fetchBlogs();
      }
    } catch (error) {
      console.error("Error liking the blog:", error);
    }
  };

  const handleNewBlogSubmit = async (event) => {
    event.preventDefault();

    const today = new Date();

    const date = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const likes = 0;

    try {
      const response = await axios.post(API_URL, {
        newTitle,
        date,
        newContent,
        likes,
      });

      console.log(response.data);

      setNewTitle("");
      setNewContent("");

      fetchBlogs();
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  return (
    <div className="blog-section py-14">
      <h2 className="text-center text-5xl font-bold mb-14">
        Latest{" "}
        <span className="text-orange-400">
          Blogs
        </span>{" "}
        📚
      </h2>

      {/* Blog Creation Form */}
      <div
        className="blog-creation-form mb-8"
        style={{ width: "80%", margin: "auto" }}
      >
        <form
          onSubmit={handleNewBlogSubmit}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Blog Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="p-2 border rounded"
            required
          />

          <textarea
            placeholder="Blog Content"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="p-2 border rounded"
            rows="4"
            required
          />

          <button
            type="submit"
            className="bg-orange-400 text-white p-2 rounded hover:bg-orange-600"
          >
            Add Blog
          </button>
        </form>
      </div>

      {/* Blogs */}
      <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="blog-post mb-8 p-6 bg-white shadow-lg rounded-lg"
          >
            <h3 className="blog-title font-semibold text-2xl text-gray-800 mb-3">
              {blog.newTitle}
            </h3>

            <p className="blog-date text-gray-400 text-sm mb-4">
              {blog.date}
            </p>

            <p className="blog-content text-gray-600 mb-4">
              {blog.newContent}
            </p>

            <button
              type="button"
              className="text-blue-500 cursor-pointer"
              onClick={() => handleLike(blog._id)}
            >
              Like
            </button>

            <span className="ml-2">
              {blog.likes} Likes
            </span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Blogs;