import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Api from "../utils/Api";
import { toast } from "react-toastify";
import { connect } from 'react-redux';

const Card = ({ post, setPosts, token }) => {
  const navigate = useNavigate();
  const [deletePopup, setDeletePopup]= useState(false)

  const handleDelete=()=>{
    const config = {
      headers: {
          'x-auth-token': token,
      }
    };

    Api.delete(`/post/${post?._id}`, config).then((res)=>{
      setPosts((prev)=>prev.filter((item)=>item._id != post._id))
      setDeletePopup(false)
      toast.success(res.data.msg) 
    }).catch((err)=>{
      setDeletePopup(false)
      toast.error(err.response.data.msg)
    })
  }

  const handleEditIcon=()=>{
    navigate('/add', { state: { id : post?._id } })
  }
  
  return (
    <>
      <div className="relative mt-4 pb-12 p-4 border border-gray-200 rounded-md shadow-sm">
        <Link to={`/post/${post?._id}`}>
          <p className="hover:shadow-2xl shadow-gray-400  cursor-pointer block relative  rounded overflow-hidden">
            <img
              // className="h-full"
              src={post?.media}
              width={450}
              height={450}
              alt={"img"}
            />
          </p>
        </Link>
        {
          <div className="flex space-x-2 absolute right-2 bottom-2">
            <FaEdit onClick={handleEditIcon} size={24} className="cursor-pointer"/>
            <MdDelete onClick={()=>setDeletePopup(true)} size={24} className="cursor-pointer"/>
          </div>
        }
      </div>

      { deletePopup &&
                <div id="popup-modal" tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40"
                    onClick={()=>setDeletePopup(false)}
                ></div>
                <div className="relative w-full max-w-md max-h-full mx-auto">
                    <div className="relative bg-white rounded-lg shadow">
                        <button onClick={()=>setDeletePopup(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" data-modal-hide="popup-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-6 text-center">
                            <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this Account?</h3>
                            <button onClick={handleDelete} data-modal-hide="popup-modal" type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                Yes, I'm sure
                            </button>
                            <button onClick={()=>setDeletePopup(false)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">No, cancel</button>
                        </div>
                    </div>
                </div>
                </div>
            }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
      token: state.auth.token
  }
}

export default connect(mapStateToProps, null)(Card);

