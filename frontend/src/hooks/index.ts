import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
    "id": number;
    "title": string;
    "content": string;
    "author": {
        "name": string
    }
}

export default function useBlog({id}: {id: string}) {
    const [loading, setLoading] = useState<boolean>(true);
    const [blog, setBlog] = useState<Blog>();


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(response => {
            setBlog(response.data.blog)
            setLoading(false)
        })
    },[id])

    return {
        loading,
        blog
    }
}