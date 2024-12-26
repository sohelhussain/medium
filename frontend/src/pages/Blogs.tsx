import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";



export default function Blogs() {
    const { blogs, loading } = useBlogs();

    console.log(blogs);

    if (loading) {
        return <div>
            <Appbar />
            <div className="flex justify-center">
                {blogs.map((b, i) => (
                    <BlogSkeleton />
                ))}
            </div>
        </div>
    }
    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div>
                {blogs.map(blog => <BlogCard
                    id={blog.id}
                    authorName={blog.author.name || "Anonymous"}
                    title={blog.title}
                    content={blog.content}
                    publishedDate={"2nd Feb 2024"}
                />)}
            </div>
        </div>
    </div>
}