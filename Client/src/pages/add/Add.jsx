import React, { useReducer, useState } from "react";
import "./Add.scss";
import { INITIAL_STATE, gigReducer } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/utils";
import{useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = () => {

  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE)
  const handleChange = e => {
    dispatch({
      type: "CHANGE_INPUT", payload: { name: e.target.name, value: e.target.value }
    })
  }
  const handleFeature = e => {
    e.preventDefault();
    dispatch({
      type: "ADD_FEATURE",
      payload: e.target[0].value,
    });
    e.target[0].value = "";
  }
  const handleUpload = async e => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);
      const gigImages = await Promise.all(
        [...files].map(async file => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, gigImages } })
      toast.success("Images uploaded successfully")
    } catch (err) {
      console.log(err)
      toast.warning("images upload failed")
    }
  }

 
 const navigate = useNavigate();
 
  const queryClient = useQueryClient();
  
 const mutation = useMutation({
    mutationFn: (gig) =>{
       
      return newRequest.post(`/gigs`, gig)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs'])
      navigate('/mygigs')
    },
    onError: (res) => {
      toast.warning("all Fields are required");
    }
 })

  const handleSubmit = (e) => {
  e.preventDefault()
  mutation.mutate(state)
  
}
  return (
    <div className="add">
      <div className="container">
        <h1>Add New Job</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="gigTitle"
              placeholder="e.g. I will do something I'm really good at"
              onChange={handleChange}
            />
            <label htmlFor="">Category</label>
            <select name="category" id="category" onChange={handleChange} >
              <option value="Plomberie">Plomberie</option>
              <option value="Electrecité">Electrecité</option>
              <option value="Electronics">Electronics</option>
              <option value="Hand Crafting">Hand Crafting</option>
            </select>

            <div className="images">
              <div className="ImagesInputs">
                <label htmlFor="">Cover Image</label>
                <input type="file" onChange={e => setSingleFile(e.target.files[0])} />
                <label htmlFor="">Upload Images</label>
                <input type="file" multiple onChange={e => setFiles(e.target.files)} />
              </div>
              <button onClick={handleUpload}>{uploading ? "uploading " : "upload"}</button>
            </div>
            <label htmlFor="">Description</label>
            <textarea onChange={handleChange} name="gigDescription" id="" placeholder="Brief descriptions to introduce your service to customers" cols="0" rows="16"></textarea>
            <button onClick={handleSubmit}>Create</button>
          </div>
          <div className="details">
            <label htmlFor="">Service Title</label>
            <input type="text" onChange={handleChange} name="shortTitle" placeholder="e.g. One-page web design" />
            <label htmlFor="">Short Description</label>
            <textarea
              onChange={handleChange}
              name="shortDescription"
              id=""
              placeholder="Short description of your service"
              cols="30" rows="10">
            </textarea>
            <label htmlFor="">Delivery Time (e.g. 3 days)</label>
            <input type="number" name="deliveryTime" onChange={handleChange} />
            <label htmlFor="">Revision Number</label>
            <input type="number" name="revisionNumber" onChange={handleChange} />
            <label htmlFor="">Add Features</label>
            <form action="" className="add" onSubmit={handleFeature}>
              <input type="text" placeholder="e.g. page design" />
              <button type="submit" >add</button>
            </form>
            <div className="addedFeatures">
             {state?.Features?.map(f=> (
               <div className="item" key={f}>
                <button onClick={()=>dispatch({type:"REMOVE_FEATURE", payload: f})} >
                  {f}
                  <span>X</span>
                </button>
                
              </div>))}
            </div>
            <label htmlFor="" >Price</label>
            <input type="number" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Add;