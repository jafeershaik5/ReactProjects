import { useEffect, useState } from "react";
import Post from "./Post";

type Post = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
};

const HACKERNEWS_POSTID_API = `https://hacker-news.firebaseio.com/v0/jobstories.json`;

const JobFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const perPage = 5;
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    fetchAllJobIds();
  }, [pageNumber]);

  const fetchAllJobIds = async () => {
    if (!endReached) {
      const response = await fetch(HACKERNEWS_POSTID_API);
      const result = await response.json();
      const postIds = result.slice(
        pageNumber * perPage,
        (pageNumber + 1) * perPage
      );

      if (posts.length >= result.length) {
        setEndReached(true);
      }
      fetchPostMetadata(postIds);
    }
  };

  const fetchPostMetadata = async (postIds: number[]) => {
    postIds.forEach(async (postId) => {
      try {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
        );
        const result = await response.json();
        setPosts((prev) => [...prev, result]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4 text-slate-700">
        Hackernews Jobs
      </h1>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center">
        {posts.map((singlePost) => (
          <Post key={singlePost.id} post={singlePost} />
        ))}
      </div>
      {!endReached ? (
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Load More
        </button>
      ) : (
        <p className="mt-6 text-slate-500 italic">End of Job Listings</p>
      )}
    </div>
  );
};

export default JobFeed;
