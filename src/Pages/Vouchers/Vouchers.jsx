import { Add, KeyboardArrowRight, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "../../Components";
import { getVouchers } from "../../redux/action/voucher";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from "@mui/material";
import { DeleteOutline, OpenInNewOutlined } from "@mui/icons-material";
import View from "./View";
import Topbar from "./Topbar";
import DeleteModal from "./DeleteModal";
import { PiTrashLight } from "react-icons/pi";

function Vouchers() {
  //////////////////////////////////////// VARIABLES ////////////////////////////////////
  const dispatch = useDispatch();
  const { vouchers, isFetching, error } = useSelector((state) => state.voucher);

  const columns = [
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="capitalize font-primary">
          <p>{params.row.customerName}</p>
        </div>
      ),
    },
    {
      field: "cnic",
      headerName: "CNIC",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.cnic}</div>,
    },
    {
      field: "issuingDate",
      headerName: "Issue Date",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.issuingDate}</div>,
    },
    {
      field: "type",
      headerName: "Payment Type",
      width: 200,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary capitalize">{params.row.type}</div>,
    },
    {
      field: "paid",
      headerName: "Amount Paid",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => <div className="font-primary">{params.row.paid}</div>,
    },
    {
      headerName: "Status",
      width: 150,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <div className="font-primay">
          <span
            className={`border-[1px] px-[8px] py-[4px] rounded-full capitalize  font-primary font-medium
          ${params.row.status == "approved" ? "border-green-500 text-green-500" : ""}
          ${params.row.status == "rejected" ? "border-red-400 text-red-400" : ""} 
          `}>
            {params.row.status == "approved" ? "Approved" : ""}
            {params.row.status == "rejected" ? "Rejected" : ""}
          </span>
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div className="flex gap-[4px] ">
          <Tooltip placement="top" title="Delete">
            <IconButton
              onClick={() => {
                setOpenDeleteModal(true);
                setSelectedVoucherId(params.row._id);
              }}
              className="hover:text-red-500">
              <PiTrashLight className="text-red-500" />
            </IconButton>
          </Tooltip>
          {/* <Tooltip placement="top" title="View">
            <IconButton onClick={() => setOpenViewModal(true)} className="hover:text-red-500">
              <OpenInNewOutlined />
            </IconButton>
          </Tooltip> */}
        </div>
      ),
    },
  ];

  //////////////////////////////////////// STATES ///////////////////////////////////////
  const [openViewModal, setOpenViewModal] = useState(false);
  const [selectedVoucherId, setSelectedVoucherId] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  //////////////////////////////////////// USE EFFECTS //////////////////////////////////
  useEffect(() => {
    dispatch(getVouchers());
  }, []);

  //////////////////////////////////////// FUNCTIONS ////////////////////////////////////

  return (
    <div className="h-full w-full float-left pb-28">
      <View open={openViewModal} setOpen={setOpenViewModal} />
      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        voucherId={selectedVoucherId}
      />

      <Topbar />
      <Table
        rows={vouchers}
        columns={columns}
        isFetching={isFetching}
        error={error}
        rowsPerPage={10}
      />
    </div>
  );
}

export default Vouchers;
