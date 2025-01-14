import { useState } from "react"
import { AppBar } from "../components/AppBar"
import axios from "axios";
import { URL } from "../Url";
import { useNavigate } from "react-router-dom";
export const Publish = () => {

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    async function submitPost() {
        const response = await axios.post(`${URL}/api/v1/blog/new`,{
            title,
            content
        },{headers : {
            Authorization : localStorage.getItem("token")
        }})
        navigate(`/blog/${response.data.id}`)
    }
    return (
        <div>
            <AppBar/>
            <div className="flex justify-center pt-20">
              <div className="max-w-screen-lg w-full">
               <label  className="block mb-2 text-lg font-medium text-slate-700">Title</label>
               <input onChange={(e) => {
                setTitle(e.target.value)
               }} type="text" placeholder="Title" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 "/>
              
               <label  className="block mb-2 text-lg font-medium text-slate-700 pt-8 ">Description here</label>
               <textarea onChange={(e) => {
                setContent(e.target.value)
               }} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Description"></textarea>

               <button onClick={submitPost} className="rounded-md bg-blue-600 py-2 px-4 mt-4  border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-blue-700 focus:shadow-none active:bg-blue-700 hover:bg-blue-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-0.5" type="button">
                 Publish Post
               </button>
                </div>
            </div>
        </div>
    )
}