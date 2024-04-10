// * new page shows search results clicked from dropdownCard.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Post {
  body: string;
}

function PostDetails() {
  const { title } = useParams();
  const [Postbody, Postsetbody] = useState<Post | null>(null);
  // Fetch post data using the title
  // Render post details
  useEffect(() => {
    // TODO: do try catch here, some posts are giving err coz api request are sending empty data. do appropriate 404 pages based on diff condn
    if (!title) {
      console.error("Title is undefined or empty");
      return;
    }
    // Remove special characters from the title using Regex, this was necessary coz some of the responses from the api were undefined due to dot and comma in request from the {title}
    const cleanedTitle: string = title.replace(/[^a-zA-Z0-9 '.,]/g, "");
    // console.log(cleanedTitle); // for debugging

    fetch(`https://dummyjson.com/posts/search?q=${cleanedTitle}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`An error occurred: ${res.statusText}`);
        }
        return res.json();
      })
      .then((data) => {
        const currArray = data.posts;
        const [myPost] = currArray; // this takes first element which is always that oeject which contain blog
        // console.log(title); // for debugging
        // console.log(myPost); // for debugging
        Postsetbody(myPost);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [title]);

  return (
    <div className="container ">
      <div className="section">
        <div className="flex w-full justify-center items-start py-32 h-screen">
          <div className="max-w-[1000px] shadow-md flex flex-col gap-2 py-4 px-8 bg-slate-500/5 ">
            <h2 className="text-center font-poppins text-gray-600">{title}</h2>
            <p>{Postbody?.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostDetails;
