import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {useNavigate, useParams} from "react-router-dom";
import { API } from "config/api";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay} from 'swiper/modules';
import TableOrder from "../components/TableOrder";
import moment from "moment";

export default function DetailPage() {

const param = useParams()
const [dataDetail, setDataDetail] = useState();
const [keyword, setKeyword] = useState();

 console.log("param", param.id)


   const fetchDataDetail = () => {
      axios
        .get(
          `${API}/${param.id}`
        )
        .then(function (response) {
           
          console.log(response);
          setDataDetail(response)
  
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

  console.log("dataDetail", dataDetail?.data)

    useEffect(() => {
        fetchDataDetail();
      }, []);


  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>

 <section id="layanan">
      <div className="container mb-5">
        <div className="row mt-5">
           <div class="card">
  <div class="card-body">
      <div className="row px-3">
        <div className="col"> 
              <h5>Daftar Rocket</h5>
              </div>
          </div>
    <div className="row py-3 ">
      <div className="col d-flex align-items-center justify-content-center">
            
          
  <img src={dataDetail?.data?.links?.flickr?.original[0]} alt="detail" className="pic-rocket-detail"/>


      </div>
      <div className="col mt-3">
       <div className="row fw-semibold">
         Rocket Name
       </div>
       <div className="row fw-light">
        {dataDetail?.data?.name}
       </div>
       <div className="row fw-semibold mt-3">
          cost per launch
       </div>
       <div className="row fw-light">
        {dataDetail?.data?.payloads[0]}
       </div>
      
      
      </div>
      <div className="col mt-3">
            <div className="row fw-semibold">
        country
       </div>
       <div className="row fw-light">
      {dataDetail?.data?.cores[0]?.landpad}
       </div>
        <div className="row fw-semibold mt-3">
        first flight
       </div>
       <div className="row fw-light">
 {moment(dataDetail?.data?.date_utc).format('MMMM Do YYYY, h:mm:ss a')}
       </div>
      </div>
    </div>
  </div>
</div>

     

        </div>
         <div className="row fw-semibold mt-5">
        Description
       </div>
        <div className="row mt-3">
           {dataDetail?.data?.details}
        </div>
            
      </div>
    </section>
   
    </>
  );
}