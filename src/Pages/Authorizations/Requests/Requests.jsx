import React, { useEffect, useState } from 'react'
import { Table } from '../../../Components'
import Topbar from './Topbar'
import { useDispatch, useSelector } from 'react-redux'
import { getApprovals } from '../../../redux/action/approval'
import { getApprovalReducer } from '../../../redux/reducer/approval'
import { rejectRequestApproval } from '../../../redux/action/approval'
import { register } from '../../../redux/action/user'
import DeleteModal from './DeleteModal'
import Request from './Request'
import { PiTrashLight } from 'react-icons/pi'

function RequestApprovals() {

  ////////////////////////////////////// VARIABLES //////////////////////////////
  const dispatch = useDispatch()
  const { requestApprovals: approvals, isFetching, error } = useSelector(state => state.approval)
  const columns = [
    {
      field: "uid",
      headerName: "ID",
      width: 70,
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Tooltip title={""}>
          <span className="font-primary capitalize">{params.row.uid}</span>
        </Tooltip>
      ),
    },
    {
      field: 'data.firstName', headerName: 'First Name', width: 130, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-blue-600 font-primary' onClick={() => handleOpenRequest(params.row)} >{params.row?.data?.firstName}</span>
      )
    },
    {
      field: 'data.lastName', headerName: 'Last Name', width: 130, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 font-primary'  >{params.row?.data?.lastName}</span>
      )
    },
    {
      field: 'data.username', headerName: 'Username', width: 130, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 font-primary'  >{params.row?.data?.username}</span>
      )
    },
    {
      field: 'data.email', headerName: 'email', width: 160, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 font-primary'  >{params.row?.data?.email}</span>
      )
    },
    {
      field: 'data.phone', headerName: 'Phone', width: 150, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 font-primary'  >{format(params.row.phone)}</span>
      )
    },
    {
      field: 'data.password', headerName: 'Password', width: 150, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <span className='cursor-pointer text-gray-600 font-primary'  >{format(params.row.password)}</span>
      )
    },
    {
      field: "approve/reject", headerName: "Approve/Reject", width: 150, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <div className='flex gap-[4px] ' >
          <button onClick={() => handleApprove(params.row)} className='cursor-pointer bg-green-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Approve</button>
          <button onClick={() => handleReject(params.row)} className='cursor-pointer bg-red-700 text-white px-[8px] py-[2px] rounded-[12px] text-[14x] ' >Reject</button>
        </div>
      ),
    },
    {
      field: "action", headerName: "Action", width: 100, headerClassName: "super-app-theme--header", renderCell: (params) => (
        <div className='flex gap-[4px] ' >
          <Tooltip placement='top' title='Delete' >
            <button onClick={() => handleOpenDeleteModal(params.row._id)} className='cursor-pointer ' ><PiTrashLight /></button>
          </Tooltip>
        </div>
      ),
    },
  ];

  ////////////////////////////////////// STATES //////////////////////////////
  const [view, setView] = useState('table')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openRequest, setOpenRequest] = useState(false)
  const [selectedApprovalId, setSelectedApprovalId] = useState(null)
  const [isFiltered, setIsFiltered] = useState(false)

  ////////////////////////////////////// USE EFFECTS //////////////////////////////
  useEffect(() => {
    dispatch(getApprovals())
  }, [])

  ////////////////////////////////////// FUNCTION //////////////////////////////
  const handleOpenDeleteModal = (approvalId) => {
    setOpenDeleteModal(true);
    setSelectedApprovalId(approvalId)
  }

  const handleApprove = (approval) => {
    dispatch(register(approval?.data))
  }

  const handleReject = (approval) => {
    dispatch(rejectRequestApproval(approval.data?.email))
  }
  const handleOpenRequest = (approval) => {
    setOpenRequest(true);
    dispatch(getApprovalReducer(approval))
  }


  return (
    <div className='w-full h-fit bg-inherit flex flex-col gap-[2rem] font-primary' >

      <DeleteModal open={openDeleteModal} setOpen={setOpenDeleteModal} approvalId={selectedApprovalId} />
      <Request open={openRequest} setOpen={setOpenRequest} />

      <Topbar view={view} setView={setView} isFiltered={isFiltered} setIsFiltered={setIsFiltered} />
      <Table
        rows={approvals}
        columns={columns}
        rowsPerPage={5}
        isFetching={isFetching}
        error={error}
      />

    </div>
  )
}

export default RequestApprovals