import React, { useState, useEffect, useRef } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import Api from '../utils/Api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const CommentActionsPopup = ({ onEdit, onDelete }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-md">
      <div className="p-2 cursor-pointer hover:bg-gray-100" onClick={onEdit}>
        Edit
      </div>
      <div className="p-2 cursor-pointer hover:bg-gray-100" onClick={onDelete}>
        Delete
      </div>
    </div>
  );
};

const CommentEditPopup = ({ onSave, onCancel, initialValue }) => {
  const [editedComment, setEditedComment] = useState(initialValue);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSave = () => {
    onSave(editedComment);
  };

  return (
    <div className="z-40 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md">
        <textarea
          ref={textareaRef}
          className="w-full h-32 p-2 mb-4 border rounded-md"
          value={editedComment}
          onChange={(e) => setEditedComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-md" onClick={handleSave}>
            Save
          </button>
          <button className="px-4 py-2 bg-gray-300 rounded-md" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};


const Comment = ({ comment, setComments, token }) => {

  const [isActionsPopupOpen, setActionsPopupOpen] = useState(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState(false);
  const [editedComment, setEditedComment] = useState('');

  const handleEdit = () => {
    setEditedComment(comment.payload);
    setEditPopupOpen(true);
  };

  const handleSaveEdit = (newEditedComment) => {
    const updatedComment = { payload: newEditedComment };

    const config = {
      headers: {
        'x-auth-token': token,
      }
    };

    Api.put(`/comment/${comment?._id}`, updatedComment, config).then((res) => {
      setComments((prevComments)=>{
        const index = prevComments.findIndex((c) => c._id === comment._id);

        const updatedComments = [...prevComments];
        updatedComments[index] = { ...comment, ...updatedComment };
        return updatedComments;
      })
      toast.success(res.data.msg)
    }).catch((err) => {
        toast.error(err.response.data.msg)
    })
    // here edit api
    setEditPopupOpen(false);
  };

  const handleCancelEdit = () => {
    setEditPopupOpen(false);
  };

  const handleDelete = () => {
    const config = {
      headers: {
        'x-auth-token': token,
      }
    };

    Api.delete(`/comment/${comment?._id}`, config).then((res) => {
      setComments((prev) => prev.filter((item) => item._id != comment._id))
      toast.success(res.data.msg)
    }).catch((err) => {
      toast.error(err.response.data.msg)
    })
    setActionsPopupOpen(false);
  };

  const handleIconClick = (event) => {
    event.stopPropagation();
    setActionsPopupOpen(!isActionsPopupOpen);
  };

  return (
    <div onClick={() => setActionsPopupOpen(false)} className='flex justify-between items-center space-x-8 mb-2 p-2 bg-gray-100 rounded-md'>
      <p className="flex-grow text-start">{comment?.payload}</p>
      {/* <input className="flex-grow text-start" value={comment}/> */}
      <div className="flex-shrink-0 cursor-pointer">
        <HiOutlineDotsVertical size={20} onClick={handleIconClick} />
        {isActionsPopupOpen && (
          <CommentActionsPopup
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      {isEditPopupOpen && (
        <CommentEditPopup
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          initialValue={editedComment}
        />
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
      token: state.auth.token
  }
}

export default connect(mapStateToProps, null)(Comment);
