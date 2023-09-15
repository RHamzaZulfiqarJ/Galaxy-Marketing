import { DialogActions, MenuItem, Select, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { updateProject } from "../../redux/action/project";
import { useDispatch, useSelector } from "react-redux";
import { deleteAllImagesReducer } from "../../redux/reducer/upload";
import { Upload } from "../../utils";
import { PiImages, PiNotepad, PiXLight } from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, openEdit, setOpenEdit, scroll }) => {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////////////
  const dispatch = useDispatch();
  const { currentProject: project, isFetching } = useSelector((state) => state.project);
  const { urls } = useSelector((state) => state.upload);

  //////////////////////////////////////// STATES ////////////////////////////////////////////
  const [projectData, setProjectData] = useState(project);

  //////////////////////////////////////// USE EFFEECT ////////////////////////////////////////////
  useEffect(() => {
    setProjectData(project);
  }, [project]);
  useEffect(() => {
    setProjectData({ ...projectData, images: urls });
  }, [urls]);

  //////////////////////////////////////// FUNCTION ////////////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProject(project._id, { ...projectData }));
    dispatch(deleteAllImagesReducer());
    setOpen(false);
  };
  const handleChange = (e) => {
    setProjectData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  return (
    <div>
      <Dialog
        open={openEdit}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400">Edit Project</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="p-3 flex flex-col gap-2 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiImages size={23} />
              <span>Images</span>
            </div>
            <Divider />
            <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
              <Upload image={projectData?.images} isMultiple={true} />
            </div>
          </div>
          <div className="flex flex-col gap-2 p-3 text-gray-500">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Project Detials</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    name="city"
                    value={projectData?.city}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    {pakistanCities.map((index, item) => (
                      <MenuItem key={item} value={index}>
                        {index}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Area Location </td>
                <td className="pb-4">
                  <TextField
                    name="region"
                    value={projectData?.region}
                    onChange={handleChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Type </td>
                <td className="pb-4">
                  <Select
                    name="propertyType"
                    value={projectData?.propertyType}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Home Type </td>
                <td className="pb-4">
                  <Select
                    name="homeType"
                    value={projectData?.homeType}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="appartment">Appartment</MenuItem>
                    <MenuItem value="restaurant">Restaurant</MenuItem>
                    <MenuItem value="office">Office</MenuItem>
                    <MenuItem value="shop">Shop</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Price </td>
                <td className="pb-4">
                  <TextField
                    name="price"
                    value={projectData?.price}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Area </td>
                <td className="pb-4">
                  <TextField
                    name="area"
                    value={projectData?.area}
                    onChange={handleChange}
                    placeholder="Area in Marla"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Project Priority </td>
                <td className="pb-4">
                  <Select
                    name="priority"
                    value={projectData?.priority}
                    onChange={handleChange}
                    size="small"
                    fullWidth>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Beds </td>
                <td className="pb-4">
                  <TextField
                    name="beds"
                    value={projectData?.beds}
                    onChange={handleChange}
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            variant="contained"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>

    // <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

    //   <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //     <div className="z-[100] bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
    //       <h2 className='font-bold text-[24px] ' >Update Project</h2>
    //       <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
    //     </div>

    //     <form onSubmit={handleSubmit} className='flex flex-wrap gap-[1rem] w-full p-[1rem] ' >

    //       {/* images */}
    //       <div className="newHotelItem w-full flex flex-wrap justify-start md:items-start items-center gap-[1rem] ">
    //         <Upload image={projectData?.images} isMultiple={true} />
    //       </div>
    //       {/* all inputs */}
    //       <div className="flex justify-start flex-wrap gap-[24px] w-full ">
    //         {/* city */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
    //           <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={projectData?.city} onChange={handleChange} >
    //             <option value="">-</option>
    //             <option value="lahore">Lahore</option>
    //             <option value="karachi">Karachi</option>
    //             <option value="islamabad">Islamabad</option>
    //           </select>
    //         </div>
    //         {/* area */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="region">Region:</label>
    //           <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="region" value={projectData?.region} onChange={handleChange} />
    //         </div>
    //         {/* property type */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
    //           <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={projectData?.propertyType} onChange={handleChange} >
    //             <option value="">Select Property Type</option>
    //             <option value="comercial">Comercial</option>
    //             <option value="residential">Residential</option>
    //           </select>
    //         </div>
    //         {/* home type */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
    //           <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={projectData?.homeType} onChange={handleChange} >
    //             <option value="">-</option>
    //             <option value="bangla">Bangla</option>
    //             <option value="appartment">Apartment</option>
    //             <option value="restaurant">Restaurant</option>
    //           </select>
    //         </div>
    //         {/* price */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="price">Price:</label>
    //           <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="price" value={projectData?.price} onChange={handleChange} />
    //         </div>
    //         {/* area */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">Area:</label>
    //           <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="area" value={projectData?.area} onChange={handleChange} />
    //         </div>
    //         {/* area unit */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="areaUnit">Area Unit:</label>
    //           <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='areaUnit' value={projectData?.areaUnit} onChange={handleChange} >
    //             <option value="squareFeet">Square Feet</option>
    //             <option value="marla">Marla</option>
    //           </select>
    //         </div>
    //         {/* priority */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Project Priority:</label>
    //           <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={projectData?.priority} onChange={handleChange} >
    //             <option value="high">High</option>
    //             <option value="moderate">Moderate</option>
    //             <option value="low">Low</option>
    //           </select>
    //         </div>
    //         {/* beds */}
    //         <div className="flex flex-col justify-start gap-[4px] lg:w-[31%] md:w-[47%] w-full ">
    //           <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
    //           <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={projectData?.beds} onChange={handleChange} />
    //         </div>
    //       </div>
    //       {/* button */}
    //       <div className="w-full flex justify-end items-center">
    //         <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //           {isFetching ? 'Saving' : 'Save'}
    //         </button>
    //       </div>

    //     </form>

    //   </div>

    // </Modal>
  );
};

export default EditModal;
