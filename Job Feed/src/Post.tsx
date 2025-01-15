import moment from "moment";

type Post = {
  by: string;
  id: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url?: string;
};

type PostProps = { post: Post };

export default function Post({ post }: PostProps) {
  return (
    <div className="hover:bg-slate-100 w-80 shadow rounded-lg border border-slate-200 transition hover:shadow-md">
      <a href={post.url} target="_blank" rel="noopener noreferrer">
        <div className="p-4 gap-2 flex flex-col m-4">
          <p className="text-sm text-slate-500">
            ID: <span className="text-sky-500">{post.id}</span>
          </p>
          <h1 className="font-bold text-xl text-slate-800">{post.title}</h1>
          <p className="text-sm text-slate-600">
            {moment(post.time * 1000).format("Do MMM YYYY, hh:mm a")}
          </p>
          <p className="text-sm text-slate-500">
            Posted by: <span className="text-sky-500">{post.by}</span>
          </p>
        </div>
      </a>
    </div>
  );
}
