import React, { useEffect, useRef, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { createVoucher } from "../../redux/action/voucher";
import { getClients } from "../../redux/action/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Divider,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  DialogActions,
  TextField,
  Autocomplete,
  Select,
  MenuItem,
} from "@mui/material";
import { PiNotepad, PiXLight } from "react-icons/pi";
import { CFormSelect } from "@coreui/react";
import JsBarcode from "jsbarcode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const FORM = ({ open, setOpen, scroll }) => {
  ////////////////////////////////////// VARIBALES ///////////////////////////////////
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clients } = useSelector((state) => state.user);
  const initialVoucherState = {
    branch: "",
    issuingDate: "",
    dueDate: "",
    clientName: "",
    cnic: "",
    phone: "",
    project: "",
    propertyType: "",
    Area: "",
    type: "",
    total: "",
    paid: "",
    remained: "",
  };
  const barcodeValue = "AD157491594D5";

  // Create a barcode canvas using JsBarcode
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, barcodeValue, {
    format: "CODE128", // You can choose a barcode format
    width: 2,
    height: 50,
  });

  // Convert the canvas to an image
  const barcodeImage = canvas.toDataURL("image/png");

  ////////////////////////////////////// STATES //////////////////////////////////////
  const [modalVisible, setModalVisible] = useState(false);
  const [isVoucherCreated, setIsVoucherCreated] = useState(false);
  const [voucherData, setVoucherData] = useState(initialVoucherState);

  ////////////////////////////////////// Use Effects ///////////////////////////////////////////
  useEffect(() => {
    dispatch(getClients());
  }, [open]);

  ////////////////////////////////////// FUNCTIONS ////////////////////////////////////////

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVoucherData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDownloadPDF = (e) => {
    e.preventDefault();
    dispatch(createVoucher(voucherData));
    setIsVoucherCreated(false);

    const documentDefinition = {
      content: [
        {
          columns: [
            {},
            { text: "Payment Reciept", style: "header", alignment: "center" },
            {
              margin: [10, 0, 0, 0],
              table: {
                widths: [50, 80],
                body: [
                  [
                    { text: "Branch", bold: true, alignment: "center" },
                    { text: `${voucherData.branch}`, alignment: "center" },
                  ],
                  [
                    { text: "Date", bold: true, alignment: "center" },
                    { text: `${voucherData.issuingDate}`, alignment: "center" },
                  ],
                ],
              },
            },
          ],
        },

        {
          margin: [0, 40, 0, 0],
          table: {
            headerRows: 1,
            widths: [160, 160, 160],
            body: [
              [
                { text: "Name", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "CNIC", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Phone", alignment: "center", bold: true, fillColor: "#dddddd" },
              ],
              [
                { text: `${voucherData.clientName}`, alignment: "center" },
                { text: `${voucherData.cnic}`, alignment: "center" },
                { text: `${voucherData.phone}`, alignment: "center" },
              ],
              [
                {
                  colSpan: 3,
                  text: "* If, for some reason, the deal fails through, there is no penalty and the same amount is returned to the buyer.",
                },
                "",
                "",
              ],
            ],
          },
        },

        {
          margin: [0, 5, 0, 0],
          table: {
            headerRows: 1,
            widths: [160, 160, 160],
            body: [
              [
                { text: "Type of Payment", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Amount", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Pay before", alignment: "center", bold: true, fillColor: "#dddddd" },
              ],
              [
                { text: `${voucherData.type}`, alignment: "center" },
                { text: `${voucherData.paid}`, alignment: "center" },
                { text: `${voucherData.dueDate}`, alignment: "center" },
              ],
            ],
          },
        },

        {
          margin: [0, 5, 0, 0],
          table: {
            headerRows: 1,
            widths: [160, 160, 160],
            body: [
              [
                { text: "Project", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Property Type", alignment: "center", bold: true, fillColor: "#dddddd" },
                { text: "Area", alignment: "center", bold: true, fillColor: "#dddddd" },
              ],
              [
                { text: `${voucherData.project}`, alignment: "center" },
                { text: `${voucherData.propertyType}`, alignment: "center" },
                { text: `${voucherData.Area} Marla`, alignment: "center" },
              ],
            ],
          },
        },

        {
          columns: [
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Total Amount",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.total}`, alignment: "center" }],
                ],
              },
            },
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Amount Paying",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.paid}`, alignment: "center" }],
                ],
              },
            },
            {
              margin: [10, 30, 0, 0],
              table: {
                widths: [130],
                body: [
                  [
                    {
                      text: "Remaining Amount",
                      bold: true,
                      alignment: "center",
                      border: [false, false, false, false],
                    },
                  ],
                  [{ text: `${voucherData.total - voucherData.paid}`, alignment: "center" }],
                ],
              },
            },
          ],
        },
        {
          image: barcodeImage,
          alignment: "center",
          margin: [0, 20, 0, 0],
        },
        {
          text: "© Generated by GROW company",
          alignment: "center",
          fontSize: 10,
          margin: [0, 20, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "center",
        },
      },
    };

    const pdfDocGenerator = pdfMake.createPdf(documentDefinition);
    pdfDocGenerator.download("Voucher.pdf");
    setVoucherData(initialVoucherState);
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
        maxWidth="sm"
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle className="flex items-center justify-between">
          <div className="text-sky-400 font-primary">Add New Voucher</div>
          <div className="cursor-pointer" onClick={handleClose}>
            <PiXLight className="text-[25px]" />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex flex-col gap-2 p-3 pb-0 text-gray-500 font-primary">
            <div className="text-xl flex justify-start items-center gap-2 font-normal">
              <PiNotepad size={23} />
              <span>Voucher Details</span>
            </div>
            <Divider />
            <table className="mt-4">
              <tr>
                <td className="pb-4 text-lg">Voucher Number </td>
                <td className="pb-4">
                  <TextField
                    name="branch"
                    value={voucherData.branch}
                    onChange={handleInputChange}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Date of Issue </td>
                <td className="pb-4">
                  <TextField
                    type="date"
                    name="issuingDate"
                    value={voucherData.issuingDate}
                    onChange={handleInputChange}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Due Date </td>
                <td className="pb-4">
                  <TextField
                    name="dueDate"
                    value={voucherData.dueDate}
                    onChange={handleInputChange}
                    size="small"
                    type="date"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Customer Name </td>
                <td className="pb-4">
                  <TextField
                    name="clientName"
                    onChange={handleInputChange}
                    value={voucherData.clientName}
                    size="small"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">CNIC </td>
                <td className="pb-4">
                  <TextField
                    name="cnic"
                    value={voucherData.cnic}
                    onChange={handleInputChange}
                    size="small"
                    type="number"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Phone </td>
                <td className="pb-4">
                  <TextField
                    name="phone"
                    value={voucherData.phone}
                    onChange={handleInputChange}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Project </td>
                <td className="pb-4">
                  <CFormSelect
                    value={voucherData.project}
                    name="project"
                    options={["Select an Option", "Project 1", "Project 2", "Project 3"]}
                    onChange={handleInputChange}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Property Type </td>
                <td className="pb-4">
                  <CFormSelect
                    name="propertyType"
                    value={voucherData.propertyType}
                    onChange={handleInputChange}
                    options={["Select an Option", "Residential", "Commercial", "Industrial", "Agricultural", "Other"]}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Payment Type </td>
                <td className="pb-4">
                  <CFormSelect
                    name="type"
                    value={voucherData.type}
                    onChange={handleInputChange}
                    options={["Select an Option", "Cash", "Cheque", "Credit Card", "Online"]}
                    className="border-[1px] p-2 rounded-md w-full border-[#c1c1c1] cursor-pointer text-black"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Area </td>
                <td className="pb-4">
                  <TextField
                    name="Area"
                    value={voucherData.Area}
                    onChange={handleInputChange}
                    size="small"
                    type="text"
                    fullWidth
                    placeholder="Area in Marla"
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Total Amount </td>
                <td className="pb-4">
                  <TextField
                    name="total"
                    value={voucherData.total}
                    onChange={handleInputChange}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Amount Paying </td>
                <td className="pb-4">
                  <TextField
                    name="paid"
                    value={voucherData.paid}
                    onChange={handleInputChange}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
              <tr>
                <td className="pb-4 text-lg">Remainig Amount </td>
                <td className="pb-4">
                  <TextField
                    disabled
                    name="remained"
                    value={voucherData.total - voucherData.paid}
                    onChange={handleInputChange}
                    size="small"
                    type="text"
                    fullWidth
                  />
                </td>
              </tr>
            </table>
          </div>
        </DialogContent>
        <DialogActions className="mb-4 mr-7">
          <button
            onClick={handleClose}
            variant="contained"
            type="reset"
            className="bg-[#d7d7d7] px-4 py-2 rounded-lg text-gray-500 mt-4 hover:text-white hover:bg-[#6c757d] border-[2px] border-[#efeeee] hover:border-[#d7d7d7] font-thin transition-all">
            Cancel
          </button>
          <button
            onClick={(e) => handleDownloadPDF(e)}
            variant="contained"
            className="bg-primary-red px-4 py-2 rounded-lg text-white mt-4 hover:bg-red-400 font-thin">
            Submit
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default FORM;
