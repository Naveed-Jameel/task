import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../utils/Api';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const AddPost = ({ token }) => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [media, setMedia] = useState("");
    const [file, setFile] = useState("")

    const [disable, setDisable]=useState(false);

    useEffect(() => {
        if (state?.id) {
            Api.get(`/post/${state.id}`).then((res) => {
                console.log("res.data?.post-edit--", res.data?.post)
                setMedia(res.data?.post?.media)
                setTitle(res.data?.post?.title)
                setDescription(res.data?.post?.description)
                setImage(res.data?.post?.media)
            }).catch((err) => {
                console.log("error", err)
            })
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisable(true)

        uploadImage().then((media) => {
            const body = {
                title,
                description,
                media
            }
            const config = {
                headers: {
                    'x-auth-token': token,
                }
            };

            if (state?.id) {
                Api.put(`/post/${state.id}`, body, config).then((res) => {
                    toast.success(res.data.msg)
                    setDisable(false)
                }).catch((err) => {
                    toast.error(err.response.data.msg)
                    setDisable(false)
                })
            }
            else {
                Api.post("/post", body, config).then((res) => {
                    toast.success(res.data.msg)
                    navigate("/")
                }).catch((err) => {
                    toast.error(err.response.data.msg)
                    setDisable(false)
                })
            }
        })
            .catch((error) => {
                console.error("Error uploading image:", error);
            });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }

        setFile(file)

    };

    const uploadImage = async () => {
        return new Promise((resolve, reject) => {
            if (file) {  // if post image change
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "apnaImages");

                fetch("https://api.cloudinary.com/v1_1/dwma5kbj9/image/upload/", {
                    method: "post",
                    body: formData,
                })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log("responseData.secure_url---", responseData.secure_url);
                        resolve(responseData.secure_url);
                    })
                    .catch((err) => {
                        console.log("error img---", err);
                        reject(err);
                    });

            }
            else{
                resolve(media)
            }
        });
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">{state?.id ? "Edit POst" : "Add Post"}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-start text-sm font-medium text-gray-600">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder='Title'
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-start text-sm font-medium text-gray-600">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows="3"
                        placeholder='Description'
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>

                <div>
                    {(image || media) && (
                        <div className="mt-2">
                            <img src={image || media} alt="Preview" className="w-32 h-32  mx-auto object-cover rounded-md" />
                        </div>
                    )}
                    <label htmlFor="image" className="block text-start text-sm font-medium text-gray-600">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required={state?.id ? false : true}
                        className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />

                </div>

                <button disabled={disable} type="submit" class="mx-auto w-24 py-2 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg max-w-md">
                    {disable ?
                        <svg width="20" height="20" fill="currentColor" class="mr-2 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
                            </path>
                        </svg>:
                        state?.id ? "Update" : "Add"
                    }
                </button>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        token: state.auth.token
    }
  }
  
export default connect(mapStateToProps, null)(AddPost);
