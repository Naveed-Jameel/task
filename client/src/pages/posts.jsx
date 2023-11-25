import React, { useEffect, useState } from "react";
import styles from "../styles/landingpage.module.css";
import Card from "../components/card";
import Api from "../utils/Api";

const Posts = () => {
    const [posts, setPosts]=useState([])

    useEffect(()=>{
      Api.get("/post").then((res)=>{
        setPosts(res.data.posts)
    }).catch((err)=>{
       console.log("err-----",err)
    })
    },[])
  
  return (
    <div>
      <div className={`py-5 my-10 bg-neutral-500`}>
        <div className="flex justify-center">
          <h1
            className={`${styles.blink} font-bold font-serif text-sm sm:text-lg md:text-2xl text-white`}
          >
            Posts
          </h1>
        </div>
      </div>

      <section className="text-gray-600 body-font">
          {/* here below px-5 */}

          <div className="container px-1 py-6 mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
              {posts?.map((post) => (
                <Card post={post} setPosts={ setPosts }/>
              ))}
            </div>
          </div>
        </section>
      
    </div>
  );
};

export default Posts;
