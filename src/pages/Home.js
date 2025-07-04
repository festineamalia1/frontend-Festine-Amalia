import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import {useNavigate} from "react-router-dom";
import { API } from "config/api";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { FreeMode, Pagination, Autoplay} from 'swiper/modules';
import TableOrder from "../components/TableOrder";

export default function Home() {

const [dataNegara, setDataNegara] = useState();

   const fetchDataNegara = () => {
      axios
        .get(
          `${API}/negaras`
        )
        .then(function (response) {
           
          console.log(response);
          setDataNegara(response)
  
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

    // const handleSearchRocket = () => {
    //   axios
    //     .get(
    //       `${API}?name=${keyword}`
    //     )
    //     .then(function (response) {
           
    //       console.log(response);
    //       setDataRocket(response)
  
          
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //       alert(
    //         error.response.data.message
    //       );
    //     });
    // };

     console.log("dataNegara", dataNegara?.data)

    useEffect(() => {
        fetchDataNegara();
      }, []);


  return (
    <>
    <div className="container-fluid">
 <NavBar />
    </div>

    <section id="layanan">
      <div className="container">
       
          <div className="row mt-5">
            <div className="col">
               <label for="inputState" class="form-label">Negara</label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                     {dataNegara?.data &&
                      dataNegara?.data?.map((data, i) => (
                  <option>{data?.id_negara} - {data?.nama_negara}</option>
                      ))}
                </select>
            </div>
              <div className="col">
                 <label for="inputState" class="form-label">Pelabuhan</label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
              </div>
            
          </div>
          <div className="row mt-3">
              <div class="col">
            <label for="inputState" class="form-label">Barang</label>
                <select id="inputState" class="form-select">
                  <option selected>Choose...</option>
                  <option>...</option>
                </select>
                </div>
          </div>

          <div className="row mt-3">
              <div class="col">
           <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
  <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
          </div>

            <div className="row mt-3">
            <div class="col">
    <label for="inputCity" class="form-label">Discount %</label>
    <input type="text" class="form-control" id="inputCity"/>
  </div>
              <div className="col">
                  <label for="inputCity" class="form-label">Harga</label>
    <input type="text" class="form-control" id="inputCity"/>
              </div>
            
          </div>

          <div className="row mt-3">
              <div class="col">
                <label for="inputCity" class="form-label">Total</label>
                <input type="text" class="form-control" id="inputCity"/>
              </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <button type="button" class="btn btn-primary">Submit</button>
            </div>
          </div>
    
      </div>
    </section>
   
    </>
  );
}