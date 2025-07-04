import React, { useState, useRef, useContext } from "react";
import { connect } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  Badge
} from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

// import Profil from "assets/images/usernav.png";
// import Logout from "assets/images/logout.svg";
import { API } from "config/api";
const TableOrder = ({dataRocket}) => {
  console.log("datahomenew", dataRocket?.data[0]?.links?.flickr?.original[0])
 
  const [idTransporter, setIdTransporter] = useState();
    const [asal, setAsal] = useState();
     const [idEdit, setIdEdit] = useState();
     const [idHapus, setIdHapus] = useState();
      const [tujuan, setTujuan] = useState();
       const [vehicle, setVehicle] = useState();
         const [smShow, setSmShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
   const [show2, setShow2] = useState(false);
   const handleClose = () => setShow(false);
      const handleClose2 = () => setShow2(false);
  const handleEdit = (data) => {
    setShow(true)
    setIdEdit(data?.id_shipment)
    setAsal(data?.loc_asal)
    setTujuan(data?.loc_tujuan)
    setVehicle(data?.id_vehicle)
     setIdTransporter(data?.id_transporter)
  };

  const handleDeleteOrder = () => {
          // e.preventDefault();
      
      axios
        .delete(
          `https://jsonplaceholder.typicode.com/posts/${idHapus}`)
        .then(function (response) {
          console.log(response);
           alert("Delete Data Berhasil");
           window.location.reload();
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

  const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Hapus Data</Popover.Header>
    <Popover.Body>
      <div className="row px-3">
    
          Apakah anda yakin menghapus data ini ?
          
      </div>
    <div className="row d-flex   justify-content-end px-3">
      {/* <span className="badge badge-secondary">cancel</span>&nbsp;/&nbsp;<span className="badge badge-secondary">yes</span> */}
    <div  className="col-auto">
    <h5 > 
      <Badge bg="primary" trigger="click" onClick={() => window.location.reload()}>
      cancel
    </Badge>
    </h5>
    </div>
       <div  className="col-auto p-0">
   <h5>
      <Badge bg="secondary"
      onClick={() => handleDeleteOrder(idHapus)}
      >
      Yes
    </Badge>
   </h5>
   </div>
    
      
      </div>
      
    </Popover.Body>
  </Popover>
  );


const handleEditData = ( e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };
    axios
      .post(
        `${API}/shipments/edit/${idEdit}`,
        {

             loc_asal: asal,
      loc_tujuan: tujuan,
      id_transporter: idTransporter,
      id_vehicle: vehicle,
      create_time: "2025-06-17 19:12:50",
        id_user : 1
        }
      )
      .then(function (response) {
     
        alert("Edit Data Berhasil");
         window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
        alert(
          "tambah Data Gagal, Nama Barang Pastikan berbeda, untuk harga beli, harga jual dan stok hanya dapat di isi angka"
        );
      });
  };
 

      
 
  return (
    <>
      <Table striped bordered hover >
      <thead>
        <tr>
          <th>#</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {dataRocket?.data &&
                      dataRocket?.data?.map((data, i) => (
        <tr>
          <td>{i+1}</td>
          <td >
              <img src={data?.links?.flickr?.original[0]} alt="Logo" className="pic-rocket w-80 px-2"/> 
            </td>
          <td>
            <div onClick={() => navigate(`/detail/${data?.id}`)}>
            {data?.name}
            </div>
            </td>
          <td> {data?.details}</td>
         
        </tr>
        ))} 
        
      </tbody>
    </Table>

       
     
          </>
  );
}

const mapStatetoProps = (state) => {
  return { statusLog: state.status };
};

export default connect(mapStatetoProps)(TableOrder);