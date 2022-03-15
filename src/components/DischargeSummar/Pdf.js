import React, { useState } from "react";
import {Modal,ModalBody,ModalHeader } from 'reactstrap';
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  let filename = props.pdf; //"acs_0001a.pdf";


  return (
    <Modal
    isOpen={props.popupModal}
    toggle={props.Pdfclosepopup}
    className='modal-full-width'
    >
    <ModalHeader toggle={props.Pdfclosepopup}></ModalHeader>
    <ModalBody style={{'background':'#f3f4f8',margin:'auto'}}>
      <Document
        file={process.env.PUBLIC_URL + '/assets/acs/' + filename}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </ModalBody>
    </Modal>
  );
}
