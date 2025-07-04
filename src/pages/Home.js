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


const [dataRocket, setDataRocket] = useState();
const [keyword, setKeyword] = useState();




   const fetchDataRocket = () => {
      axios
        .get(
          `${API}`
        )
        .then(function (response) {
           
          console.log(response);
          setDataRocket(response)
  
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

    const handleSearchRocket = () => {
      axios
        .get(
          `${API}?name=${keyword}`
        )
        .then(function (response) {
           
          console.log(response);
          setDataRocket(response)
  
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

    console.log("datahome", dataRocket?.data)

    useEffect(() => {
        fetchDataRocket();
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
              <h5>Daftar Rocket</h5>
              </div>
              <div className="col d-flex align-items-end justify-content-end">
                
                     <button type="button" class="btn btn-success">Tambah</button>
         
              </div>
          </div>
       <div className="row mt-3">
         
    <div className="col p-0">
          <div className="input-group">
         <span className="input-group-text bg-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#bcbcbc" class="bi bi-search-heart" viewBox="0 0 16 16">
            <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018"/>
            <path d="M13 6.5a6.47 6.47 0 0 1-1.258 3.844q.06.044.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"/>
          </svg>
         </span>
       
         <input type="text" className="form-control border-start-0" placeholder="Cari Rocket Name" 
         value={keyword}
         onChange={(e) => setKeyword(e.target.value)}
         />
       </div>
    
    </div>
    <div className="col-md-auto  d-flex   justify-content-end">
      <button type="button" class="btn btn-primary"
       onClick={() => {handleSearchRocket()}}>Cari</button>
                        
    </div>

   
       </div>
      

        

        <div className="row mt-3">
       
         <TableOrder dataRocket={dataRocket}/>

        </div>
      </div>
    </section>
   
    </>
  );
}