import React, { useState, useEffect } from "react";
import { Drawer, Button, TextField, Autocomplete } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { filterTask } from "../../redux/action/task";
import { FiFilter } from "react-icons/fi";
import { PiFunnelLight, PiXLight } from "react-icons/pi";
import { pakistanCities } from "../../constant";
import { DatePicker, DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const FilterDrawer = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const initialState = {
    status: '',
    priority: '',
    startingDate: '',
    endingDate: ''
  }

  const [filters, setFilters] = useState(initialState);



  const handleInputChange = (field, value) => {

    let inputValue
    if (field == 'startingDate' || field == 'endingDate')
      inputValue = value
    else
      inputValue = value.charAt(0).toLowerCase() + value.slice(1).replace(/\s+/g, '');
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: inputValue,
    }));
  };
  const handleApplyFilters = () => {
    dispatch(filterTask(filters));
    setOpen(false);
  };

  const demoStatus = ["Completed", "Overdue", "Pending", "In Progress"];
  const demoPriority = ["High", "Moderate", "Low"];

  return (
    <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
      <div style={{ minWidth: "50vh", maxWidth: "60vh" }}>
        <div className="flex justify-between items-center h-[10vh] bg-[#20aee3] p-5 text-white font-thin">
          <div className="flex items-center text-[25px] gap-2">
            <PiFunnelLight className="text-[25px]" />
            Filter Items
          </div>
          <div className="cursor-pointer" onClick={() => setOpen(false)}>
            <PiXLight className="text-[25px]" />
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoStatus}
            onSelect={(e) => handleInputChange("status", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Status"
              />
            )}
          />

          <Autocomplete
            size="small"
            disablePortal
            id="combo-box-demo"
            options={demoPriority}
            onSelect={(e) => handleInputChange("priority", e.target.value)}
            className="w-full"
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                label="Priority"
              />
            )}
          />

          <div className="flex flex-col">
            <div>Date : </div>
            <div className="flex gap-3">
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      slotProps={{ textField: { size: "small", maxWidth: 200 } }}
                      label="Starting Date"
                      onChange={(date) => handleInputChange("startingDate", date.$d)}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>

              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DesktopDatePicker"]}>
                    <DesktopDatePicker
                      className="w-3/6"
                      label="Ending Date"
                      onChange={(date) => handleInputChange("endingDate", date.$d)}
                      slotProps={{ textField: { size: "small" } }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              variant="contained"
              className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
              Reset
            </button>
            <button
              variant="contained"
              className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin"
              onClick={handleApplyFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default FilterDrawer;
