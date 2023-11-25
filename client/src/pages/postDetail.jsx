import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Comment from '../components/comment';
import Api from '../utils/Api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';


const PostDetail = ({ token }) => {
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [media, setMedia] = useState("")

  const [comments, setComments]= useState([])
  const [newComment, setNewComment]=useState("")

  
  useEffect(() => {
    Api.get(`/post/${id}`).then((res) => {
      setMedia(res.data?.post?.media)
      setTitle(res.data?.post?.title)
      setDescription(res.data?.post?.description)
      setComments(res.data?.comments)
    }).catch((err) => {
      console.log("error", err)
    })
  }, [])

  const handleAddComment=()=>{
    const body={
      _post:id,
      payload:newComment
    }
    const config = {
        headers: {
            'x-auth-token': token,
        }
    };

    Api.post("/comment", body, config).then((res) => {
      setComments((prev)=>[ res.data.comment, ...prev ])
      setNewComment("")
      toast.success(res.data.msg)
    }).catch((err) => {
        toast.error(err.response.data.msg)
    })
  }

  return (
    <div className="relative flex flex-col items-center md:flex-row space-x-2 max-w-2xl mx-auto my-8 bg-white shadow-md rounded-md p-4 pb-8">
      <div className='w-full'>
        <h1 className='text-start'>{title}</h1>
        <img src={media} alt="Post" className="w-full h-60 rounded-lg mb-4 mx-auto" />
        <p className='text-justify pr-2'>{description}</p>
      </div>

      <div className='flex flex-col w-full'>
        <div className="w-1/2 md:w-full h-60 overflow-y-auto border-t-2 border-gray-300 pt-4 mb-4">
          <ul>
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} setComments={ setComments }/>
            ))}
          </ul>
        </div>
        <div className="flex items-center justify-end">
          <input
            value={newComment}
            onChange={(e)=>setNewComment(e.target.value)}
            className="w-3/4 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Write a comment"
          />
          <button onClick={handleAddComment} className="bg-blue-500 hover:bg-blue-700 text-white ml-2 px-4 py-2 rounded-md focus:outline-none">
            Send
          </button>
        </div>
      </div>


    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      token: state.auth.token
  }
}

export default connect(mapStateToProps, null)(PostDetail);