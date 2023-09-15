import { useEffect, useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLead } from "../../redux/action/lead";
import { pakistanCities } from "../../constant";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  Button,
  TextField,
  Autocomplete,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiUser, PiXLight } from "react-icons/pi";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const EditModal = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////// VARIABLES  /////////////////////////////////////
  const dispatch = useDispatch();
  const { currentLead: lead, isFetching } = useSelector((state) => state.lead);
  const { employees, loggedUser } = useSelector((state) => state.user);
  const employeeNames = employees
    .filter((employee) => employee.username !== null && employee.username !== undefined)
    .map(({ _id, username }) => ({ _id, username }));

  ////////////////////////////////////// STATES  /////////////////////////////////////
  // todo: separate the client and lead fields from currentLead
  const [clientData, setClientData] = useState(lead?.clientId); // clientId = {gender: 'male', firstName: '', lastName: '', phone: '', email: '', cnic: ''}
  const [leadData, setLeadData] = useState(lead);

  ////////////////////////////////////// USE EFFECTS  /////////////////////////////////////
  useEffect(() => {
    setClientData(lead?.clientId);
    setLeadData(lead);
  }, [lead]);

  ////////////////////////////////////// FUNCTIONS  /////////////////////////////////////
  const handleSubmit = (e) => {
    e.preventDefault();
    const { gender, firstName, lastName, phone, email, cnic } = clientData;
    const {
      city,
      project,
      block,
      propertyType,
      homeType,
      minBudget,
      maxBudget,
      minAreaUnit,
      minArea,
      maxAreaUnit,
      maxArea,
      clientType,
      allocatedTo,
      beds,
    } = leadData;
    // todo: add priority field as well in the condition
    if (
      !gender ||
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !cnic ||
      !city ||
      !project ||
      !block ||
      !propertyType ||
      !homeType ||
      !minBudget ||
      !maxBudget ||
      !minAreaUnit ||
      !minArea ||
      !maxAreaUnit ||
      !maxArea ||
      !clientType ||
      !allocatedTo ||
      !beds
    )
      return alert("make sure to provide all the fields");

    dispatch(updateLead(lead?._id, { ...leadData, ...clientData }));
    setOpen(false);
  };

  const handleLeadDataChange = (e) => {
    const { name, value } = e.target;
    name == "source"
      ? leadData?.source.includes(value)
        ? setLeadData((pre) => ({ ...pre, source: leadData?.source.filter((s) => s != value) }))
        : setLeadData((pre) => ({ ...pre, source: [...leadData?.source, value] }))
      : setLeadData((pre) => ({ ...pre, [name]: value }));
  };

  const handleClientDataChange = (e) => {
    setClientData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        scroll={scroll}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        fullWidth="sm"
        maxWidth="md"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between font-primary">
          <div className="text-sky-400 font-primary">Add New Lead</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiUser />
              <span>Customer Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">First Name </td>
                <td className="pb-4">
                  <TextField
                    name="firstName"
                    value={clientData?.firstName}
                    onChange={handleClientDataChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Last Name </td>
                <td className="pb-4">
                  <TextField
                    name="lastName"
                    value={clientData?.lastName}
                    onChange={handleClientDataChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Gender </td>
                <td className="pb-4">
                  <Select
                    type="text"
                    size="small"
                    onChange={handleClientDataChange}
                    value={clientData?.gender}
                    name="gender"
                    fullWidth>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    onChange={handleClientDataChange}
                    value={clientData?.phone}
                    name="phone"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    type="number"
                    onChange={handleClientDataChange}
                    value={clientData?.cnic}
                    name="cnic"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Email </td>
                <td className="pb-4">
                  <TextField
                    type="email"
                    onChange={handleClientDataChange}
                    value={clientData?.email}
                    name="email"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>

          <div className="flex flex-col gap-2 p-3 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad />
              <span>Customer Requirements</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">City </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData?.city}
                    name="city"
                    type="text"
                    size="small"
                    fullWidth>
                    {pakistanCities.map((item, index) => (
                      <MenuItem value={item.toLowerCase} key={index}>
                        {item}
                      </MenuItem>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Area Location </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.address}
                    name="address"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Type </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData?.propertyType}
                    name="propertyType"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="Residential">Residential</MenuItem>
                    <MenuItem value="Commercial">Commercial</MenuItem>
                    <MenuItem value="Industrial">Industrial</MenuItem>
                    <MenuItem value="Agricultural">Agricultural</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Home Type </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData?.homeType}
                    name="homeType"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="House">House</MenuItem>
                    <MenuItem value="Upper Portion">Upper Portion</MenuItem>
                    <MenuItem value="Lower Portion">Lower Portion</MenuItem>
                    <MenuItem value="Farm House">Farm House</MenuItem>
                    <MenuItem value="Pent House">Pent House</MenuItem>
                    <MenuItem value="Room">Room</MenuItem>
                    <MenuItem value="Basement">Basement</MenuItem>
                    <MenuItem value="Flat">Flat</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Minimum Area </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.minArea}
                    name="minArea"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Maximum Area </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.maxArea}
                    name="maxArea"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Priority </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData?.priority}
                    name="priority"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Moderate">Moderate</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Maximum Budget </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.minBudget}
                    name="minBudget"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Maximum Budget </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.maxBudget}
                    name="maxBudget"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Client Type </td>
                <td className="pb-4">
                  <Select
                    onChange={handleLeadDataChange}
                    value={leadData?.clientType}
                    name="clientType"
                    type="text"
                    size="small"
                    fullWidth>
                    <MenuItem value="Direct Client">Direct Client</MenuItem>
                    <MenuItem value="Agent">Agent</MenuItem>
                    <MenuItem value="Investor">Investor</MenuItem>
                    <MenuItem value="Investment Fund">Investment Fund</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Beds Required </td>
                <td className="pb-4">
                  <TextField
                    onChange={handleLeadDataChange}
                    value={leadData?.beds}
                    name="beds"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg flex mt-1 items-start">Source </td>
                <td className="pb-4 columns-2">
                  <FormGroup onChange={handleLeadDataChange} value={leadData?.source} name="source">
                    <FormControlLabel
                      name="source"
                      value="smsLead"
                      onChange={handleLeadDataChange}
                      id="smsLead"
                      control={<Checkbox />}
                      label="SMS Lead"
                    />
                    <FormControlLabel
                      name="source"
                      value="olx"
                      onChange={handleLeadDataChange}
                      id="olx"
                      control={<Checkbox />}
                      label="OLX"
                    />
                    <FormControlLabel
                      name="source"
                      value="emailBlast"
                      onChange={handleLeadDataChange}
                      id="emailBlast"
                      control={<Checkbox />}
                      label="Email Blast"
                    />
                    <FormControlLabel
                      name="source"
                      value="clientReference"
                      onChange={handleLeadDataChange}
                      id="clientReference"
                      control={<Checkbox />}
                      label="Client Reference"
                    />
                    <FormControlLabel
                      name="source"
                      value="googleAdword"
                      onChange={handleLeadDataChange}
                      id="googleAdword"
                      control={<Checkbox />}
                      label="Google Adword"
                    />
                    <FormControlLabel
                      name="source"
                      value="radio"
                      onChange={handleLeadDataChange}
                      id="radio"
                      control={<Checkbox />}
                      label="Radio"
                    />
                    <FormControlLabel
                      name="source"
                      value="tv"
                      onChange={handleLeadDataChange}
                      id="tv"
                      control={<Checkbox />}
                      label="TV"
                    />
                    <FormControlLabel
                      name="source"
                      value="facebook"
                      onChange={handleLeadDataChange}
                      id="facebook"
                      control={<Checkbox />}
                      label="Facebook"
                    />
                    <FormControlLabel
                      name="source"
                      value="personal"
                      onChange={handleLeadDataChange}
                      id="personal"
                      control={<Checkbox />}
                      label="Personal"
                    />
                    <FormControlLabel
                      name="source"
                      value="newspaper"
                      onChange={handleLeadDataChange}
                      id="newspaper"
                      control={<Checkbox />}
                      label="Newspaper"
                    />
                    <FormControlLabel
                      name="source"
                      value="emailLead"
                      onChange={handleLeadDataChange}
                      id="emailLead"
                      control={<Checkbox />}
                      label="Email Lead"
                    />
                    <FormControlLabel
                      name="source"
                      value="youtube"
                      onChange={handleLeadDataChange}
                      id="youtube"
                      control={<Checkbox />}
                      label="Youtube"
                    />
                    <FormControlLabel
                      name="source"
                      value="walk"
                      onChange={handleLeadDataChange}
                      id="walk-in"
                      control={<Checkbox />}
                      label="Walk-in"
                    />
                    <FormControlLabel
                      name="source"
                      value="billBoard"
                      onChange={handleLeadDataChange}
                      id="billBoard"
                      control={<Checkbox />}
                      label="Bill Board"
                    />
                    <FormControlLabel
                      name="source"
                      value="streamers"
                      onChange={handleLeadDataChange}
                      id="streamers"
                      control={<Checkbox />}
                      label="Streamers"
                    />
                    <FormControlLabel
                      name="source"
                      value="smsMarketing"
                      onChange={handleLeadDataChange}
                      id="smsMarketing"
                      control={<Checkbox />}
                      label="SMS Marketing"
                    />
                    <FormControlLabel
                      name="source"
                      value="clientFacebook"
                      onChange={handleLeadDataChange}
                      id="clientFacebook"
                      control={<Checkbox />}
                      label="Client Facebook "
                    />
                    <FormControlLabel
                      name="source"
                      value="other"
                      onChange={handleLeadDataChange}
                      id="other"
                      control={<Checkbox />}
                      label="Other"
                    />
                  </FormGroup>
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
            {isFetching ? "Saving" : "Save"}
          </button>
        </DialogActions>
      </Dialog>
    </div>
    // <Modal open={open} onClose={() => setOpen(false)} className='w-screen h-screen flex justify-center items-center ' >

    //   <div className='w-[70vw] h-[80vh] max-h-[80vh] overflow-y-scroll overflow-x-hidden bg-white rounded-[4px] ' >

    //     <div className="bg-neutral-800 p-[8px] text-white flex justify-between items-center sticky top-0 ">
    //       <h2 className='font-bold text-[24px] ' >Update Lead</h2>
    //       <IconButton onClick={() => setOpen(false)} ><Close className='text-white' /></IconButton>
    //     </div>

    //     {/* form */}
    //     <form onSubmit={handleSubmit} className='flex flex-col gap-[24px] w-full p-[8px] ' >

    //       {/* client data */}
    //       <div className="flex flex-col rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
    //         <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
    //           <h4 className='font-medium text-[1rem] ' >CUSTOMER DETAILS</h4>
    //         </div>
    //         <div className="flex justify-start flex-wrap gap-[24px] w-full p-[1rem] ">
    //           {/* first name */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="firstName">First Name:</label>
    //             <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="firstName" value={clientData?.firstName} onChange={handleClientDataChange} placeholder="Last Name" />
    //           </div>
    //           {/* last name */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="lastName">lastName:</label>
    //             <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="lastName" value={clientData?.lastName} onChange={handleClientDataChange} placeholder="First Name" />
    //           </div>
    //           {/* gender */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="gender">Gender:</label>
    //             <div className="flex gap-[8px] py-[8px] ">
    //               <div className="flex gap-[2px] ">
    //                 <label className='text-gray-500 font-light text-[16px] ' htmlFor="male">Male</label>
    //                 <input type="radio" onChange={handleClientDataChange} value={clientData?.gender} name="gender" id="male" />
    //               </div>
    //               <div className="flex gap-[2px] ">
    //                 <label className='text-gray-500 font-light text-[16px]  ' htmlFor="female">Female</label>
    //                 <input type="radio" onChange={handleClientDataChange} value={clientData?.gender} name="gender" id="female" />
    //               </div>
    //             </div>
    //           </div>
    //           {/* phone */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="phone">phone:</label>
    //             <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="phone" value={clientData?.phone} onChange={handleClientDataChange} placeholder="Phone" />
    //           </div>
    //           {/* cnic */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="cnic">CNIC:</label>
    //             <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="cnic" value={clientData?.cnic} onChange={handleClientDataChange} placeholder="Phone" />
    //           </div>
    //           {/* email */}
    //           <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="email">Email:</label>
    //             <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="email" name="email" value={clientData?.email} onChange={handleClientDataChange} placeholder="Enter Email" />
    //           </div>
    //         </div>
    //       </div>

    //       <div className="flex flex-col gap-[1rem] rounded-[4px] border-[1px] border-gray-400 shadow-sm ">
    //         {/* heading */}
    //         <div className="px-[1rem] py-[8px] bg-neutral-600 text-white ">
    //           <h4 className='font-medium text-[1rem] ' >CUSTOMER REQUIREMENT</h4>
    //         </div>
    //         <div className="flex flex-col gap-[2rem] p-[1rem] w-full ">
    //           {/* buttons */}
    //           <div className="flex flex-wrap gap-[8px] ">
    //             <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-white text-black ' >BUY</button>
    //             <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >RENT</button>
    //             <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >SELLER</button>
    //             <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >MORTGAGE</button>
    //             <button className='text-[18px] font-medium px-[24px] py-[4px] rounded-[4px] shadow-box bg-neutral-400 text-gray-300 ' >LESSEE</button>
    //           </div>
    //           {/* all inputs */}
    //           <div className="flex justify-start flex-wrap gap-[24px] w-full ">
    //             {/* city */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="city">City:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='city' value={leadData?.city} onChange={handleLeadDataChange} >
    //                 <option value=''>-</option>
    //                 {
    //                   pakistanCities.map((city, index) => (
    //                     <option value={city.toLowerCase()} key={index} >{city}</option>
    //                   ))
    //                 }                  </select>
    //             </div>
    //             {/* address */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="address">Address:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="text" name="address" value={leadData?.address} onChange={handleLeadDataChange} />
    //             </div>
    //             {/* property type */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="propertyType">Property Type:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='propertyType' value={leadData?.propertyType} onChange={handleLeadDataChange} >
    //                 <option value="">-</option>
    //                 <option value="comercial">Comercial</option>
    //                 <option value="residential">Residential</option>
    //               </select>
    //             </div>
    //             {/* home type */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="homeType">Home Types:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='homeType' value={leadData?.homeType} onChange={handleLeadDataChange} >
    //                 <option value="">-</option>
    //                 <option value="appartment">Apartment</option>
    //                 <option value="bangla">Bangla</option>
    //                 <option value="restaurant">Restaurant</option>
    //               </select>
    //             </div>
    //             {/* min budget */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minBudget">MIN Budget:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minBudget" value={leadData?.minBudget} onChange={handleLeadDataChange} />
    //             </div>
    //             {/* max budget */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxBudget">MAX Budget:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxBudget" value={leadData?.maxBudget} onChange={handleLeadDataChange} />
    //             </div>
    //             {/* min area */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minArea">MIN Area:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="minArea" value={leadData?.minArea} onChange={handleLeadDataChange} />
    //             </div>
    //             {/* min area unit */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="minAreaUnit">Area:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='minAreaUnit' value={leadData?.minAreaUnit} onChange={handleLeadDataChange} >
    //                 <option value="squareFeet">Square Feet</option>
    //                 <option value="marla">Marla</option>
    //               </select>
    //             </div>
    //             {/* max area */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxArea">MAX Area:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="maxArea" value={leadData?.maxArea} onChange={handleLeadDataChange} />
    //             </div>
    //             {/* max area unit */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="maxAreaUnit">Area:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='maxAreaUnit' value={leadData?.maxAreaUnit} onChange={handleLeadDataChange} >
    //                 <option value="squareFeet">Square Feet</option>
    //                 <option value="marla">Marla</option>
    //               </select>
    //             </div>
    //             {/* lead priority */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="priority">Lead Priority:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='priority' value={leadData?.priority} onChange={handleLeadDataChange} >
    //                 <option value="high">High</option>
    //                 <option value="moderate">Moderate</option>
    //                 <option value="low">Low</option>
    //               </select>
    //             </div>
    //             {/* client type */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="clientType">Client Type:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='clientType' value={leadData?.clientType} onChange={handleLeadDataChange} >
    //                 <option value="">Please Select</option>
    //                 <option value="directClient">Direct Client</option>
    //                 <option value="agent">Agent</option>
    //                 <option value="investor">Investor</option>
    //                 <option value="investmentFund">Investment Fund</option>
    //                 <option value="other">Other</option>
    //               </select>
    //             </div>
    //             {/* allocated to */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="allocatedTo">Allocated To:</label>
    //               <select className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' name='allocatedTo' value={leadData?.allocatedTo} onChange={handleLeadDataChange} >
    //                 <option value="">-</option>
    //                 {
    //                   employeeNames.map((employee, index) => (
    //                     <option value={employee._id} key={index} >{employee.username}</option>
    //                   ))
    //                 }
    //               </select>
    //             </div>
    //             {/* beds */}
    //             <div className="flex flex-col justify-start gap-[4px] lg:w-[22.5%] md:w-[30%] sm:w-[47%] w-full ">
    //               <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="beds">BEDS:</label>
    //               <input className='text-gray-500 border-[1px] border-gray-400 py-[4px] px-[8px] rounded-[4px] ' type="number" name="beds" value={leadData?.beds} onChange={handleLeadDataChange} />
    //             </div>
    //           </div>
    //           {/* source */}
    //           <div className="flex flex-col gap-[1rem] ">
    //             <label className='text-gray-900 font-medium text-[1rem] ' htmlFor="source">Source:</label>
    //             <div className="flex flex-wrap justify-start gap-[8px] w-full ">
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='smsLead' onChange={handleLeadDataChange} id="smsLead" />
    //                 <label htmlFor="smsLead">SMS Lead</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='olx' onChange={handleLeadDataChange} id="olx" />
    //                 <label htmlFor="olx">OLX</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='emailBlast' onChange={handleLeadDataChange} id="emailBlast" />
    //                 <label htmlFor="emailBlast">Email Blast</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='clientReference' onChange={handleLeadDataChange} id="clientReference" />
    //                 <label htmlFor="clientReference">Client Reference</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='googleAdword' onChange={handleLeadDataChange} id="googleAdword" />
    //                 <label htmlFor="googleAdword">Google Adword</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='radio' onChange={handleLeadDataChange} id="radio" />
    //                 <label htmlFor="radio">Radio</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='facebook' onChange={handleLeadDataChange} id="facebook" />
    //                 <label htmlFor="facebook">Facebook</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='tv' onChange={handleLeadDataChange} id="tv" />
    //                 <label htmlFor="tv">TV</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='personal' onChange={handleLeadDataChange} id="personal" />
    //                 <label htmlFor="personal">Personal</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='newspaper' onChange={handleLeadDataChange} id="newspaper" />
    //                 <label htmlFor="newspaper">Newspaper</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='emailLead' onChange={handleLeadDataChange} id="emailLead" />
    //                 <label htmlFor="emailLead">Email Lead</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='youtube' onChange={handleLeadDataChange} id="youtube" />
    //                 <label htmlFor="youtube">Youtube</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='walk' onChange={handleLeadDataChange} id="walk-in" />
    //                 <label htmlFor="walk-in">Walk-In</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='billBoards' onChange={handleLeadDataChange} id="billBoards" />
    //                 <label htmlFor="billBoards">Bill Boards</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='streamers' onChange={handleLeadDataChange} id="streamers" />
    //                 <label htmlFor="streamers">Streamers</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='smsMarketing' onChange={handleLeadDataChange} id="smsMarketing" />
    //                 <label htmlFor="smsMarketing">SMS Marketing</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='clientFacebook' onChange={handleLeadDataChange} id="clientFacebook" />
    //                 <label htmlFor="clientFacebook">Client Facebook</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='other' onChange={handleLeadDataChange} id="other" />
    //                 <label htmlFor="other">Other</label>
    //               </div>
    //               <div className="text-gray-500 flex justify-start items-center gap-[4px] min-w-[12rem] w-[15%] ">
    //                 <input type="checkbox" name="source" value='newpaperClassifieds' onChange={handleLeadDataChange} id="newpaperClassifieds" />
    //                 <label htmlFor="newpaperClassifieds">Newpaper Classifieds</label>
    //               </div>
    //             </div>
    //           </div>
    //           {/* button */}
    //           <div className="w-full flex justify-end items-center">
    //             <button type='submit' className='w-fit text-gray-900 bg-gray-200 border-[1px] border-gray-800 px-[20px] py-[4px] rounded-[4px] cursor-pointer ' >
    //               {isFetching ? 'Saving' : 'Save'}
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //     </form>

    //   </div>

    // </Modal>
  );
};

export default EditModal;
