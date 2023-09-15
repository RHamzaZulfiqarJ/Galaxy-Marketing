import { Close } from "@mui/icons-material";
import { DialogActions, IconButton, Menu, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import React from "react";
import { updateTask } from "../../redux/action/task";
import { useDispatch, useSelector } from "react-redux";
import { getTaskReducer } from "../../redux/reducer/task";
import {
  PiHandCoins,
  PiHouseLine,
  PiImage,
  PiImages,
  PiMapPinLine,
  PiNotepad,
  PiRuler,
  PiXLight,
} from "react-icons/pi";
import { Divider, Dialog, DialogContent, DialogTitle, Slide } from "@mui/material";
import { pakistanCities } from "../../constant";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen }) => {
  ///////////////////////////////////// VARIABLES /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentTask: task, isFetchinig, error } = useSelector((state) => state.task);

  ///////////////////////////////////// STATES ////////////////////////////////////////
  const [taskData, setTaskData] = useState(task);

  ///////////////////////////////////// USE EFFECTS ///////////////////////////////////
  useEffect(() => {
    setTaskData(task);
  }, [task]);

  ///////////////////////////////////// FUNCTIONS /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskData?.title || !taskData?.description || !taskData?.dueDate || !taskData?.priority)
      return alert("Make sure to rovide all the fields");
    dispatch(updateTask(taskData?._id, taskData));
    dispatch(getTaskReducer(null));
    setOpen(false);
  };

  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Edit Task</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="font-primary">
            <table className="flex flex-col justify-center mt-4">
              <tr className="flex items-center gap-32">
                <td className="text-lg pb-4 ">Title </td>
                <td className="pb-4 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    value={taskData?.title}
                    name="title"
                    type="text"
                  />
                </td>
              </tr>
              <tr className="flex items-center gap-16">
                <td className="text-lg pb-4 w-[10vw]">Due Date </td>
                <td className="pb-4 w-full">
                  <TextField
                    size="small"
                    fullWidth
                    type="date"
                    onChange={handleChange}
                    value={taskData?.dueDate}
                    name="dueDate"
                  />
                </td>
              </tr>
              <tr className="flex items-center gap-16">
                <td className="text-lg pb-4 w-[10vw]">Priority </td>
                <td className="pb-4 w-full">
                  <Select
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    value={taskData?.priority}
                    name="priority">
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="moderate">Moderate</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr className="flex gap-16">
                <td className="text-lg flex items-start pt-2">Description </td>
                <td className="pb-4 w-full">
                  <TextField
                    size="small"
                    multiline
                    rows={5}
                    fullWidth
                    type="date"
                    onChange={handleChange}
                    value={taskData?.description}
                    name="description"
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
    // <Modal open={open} onClose={handleClose} className='w-screen h-screen flex justify-center items-center ' >

    //   <div className='lg:w-[30%] md:w-[40%] sm:w-[60%] w-[90%] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //     <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
    //       <h2 className='font-bold text-[24px] ' >Update Task</h2>
    //       <IconButton onClick={handleClose} ><Close className='text-white' /></IconButton>
    //     </div>

    //     <form onSubmit={handleSubmit} className='flex flex-col gap-[8px] w-full p-[12px] ' >

    //       <div className=" flex flex-col gap-[1rem]  ">
    //         {/* title */}
    //         <div className="flex flex-col gap-[4px] w-full ">
    //           <label className='text-black font-medium text-[16px] ' htmlFor="title">Title</label>
    //           <input type="text" onChange={handleChange} value={taskData?.title} name="title" id="title" placeholder='First Name' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //         </div>
    //         {/* due date */}
    //         <div className="flex flex-col gap-[4px] w-full ">
    //           <label className='text-black font-medium text-[16px] ' htmlFor="dueDate">Due Date</label>
    //           <input type="date" onChange={handleChange} value={taskData?.dueDate} name="dueDate" id="dueDate" placeholder='Email' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //         </div>
    //         {/* branch */}
    //         <div className="flex flex-col gap-[4px] w-full ">
    //           <label className='text-black font-medium text-[16px] ' htmlFor="priority">Priority</label>
    //           <select onChange={handleChange} value={taskData?.priority} name="priority" className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] min-h-[40px] ' >
    //             <option value="">Select Priority</option>
    //             <option value="high">High</option>
    //             <option value="moderate">Moderate</option>
    //             <option value="low">Low</option>
    //           </select>
    //         </div>
    //         {/* description */}
    //         <div className="flex flex-col gap-[4px] w-full ">
    //           <label className='text-black font-medium text-[16px] ' htmlFor="description">Description</label>
    //           <textarea rows='5' type="text" onChange={handleChange} value={taskData?.description} name="description" id="description" placeholder='Description' className='bg-inherit border-[1px] border-gray-500 text-black outline-none rounded-[4px] p-[8px] ' />
    //         </div>
    //       </div>

    //       <div className="w-full flex justify-end items-center">
    //         <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //           {isFetchinig ? 'Updating' : 'Update'}
    //         </button>
    //       </div>

    //     </form>

    //   </div>

    // </Modal>
  );
};

export default EditModal;
