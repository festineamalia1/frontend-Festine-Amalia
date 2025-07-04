import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { API } from "config/api";
import axios from "axios";

export default function Home() {

const [dataNegara, setDataNegara] = useState();
const [dataPelabuhan, setDataPelabuhan] = useState();
const [dataBarang, setDataBarang] = useState([]);

const [dataDeskripsi, setDataDeskripsi] = useState("Deskripsi Barang");
const [dataDiskon, setDataDiskon] = useState(0);
const [dataHarga, setDataHarga] = useState(0);
const [dataTotal, setDataTotal] = useState(0);

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

   
       const handleDataPelabuhan = (e) => {
      axios
        .get(
          `${API}/pelabuhans?filter={"where":{"id_pelabuhan":${e.target.value}}}`
        )
        .then(function (response) {
           
          console.log(response);
          setDataPelabuhan(response)
         
          
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

        const handleDataBarang = (e) => {
      axios
        .get(
          `${API}/barangs?filter={"where":{"id_pelabuhan":${e.target.value}}}`
        )
        .then(function (response) {
           
          console.log(response);
          setDataBarang(response)
          setDataDeskripsi(response?.data[0]?.description)
          setDataDiskon(response?.data[0]?.diskon)
          setDataHarga(response?.data[0]?.harga)
          setDataTotal(response?.data[0]?.harga - ((response?.data[0]?.harga * response?.data[0]?.diskon) / 100))
        })
        .catch(function (error) {
          console.log(error);
          alert(
            error.response.data.message
          );
        });
    };

    const handleFormatUang = (uang) => {
      const formatUang = uang?.toLocaleString('id-ID', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      });
      return  formatUang;
    };

   const handleReset = () => {
        setDataNegara()
        setDataPelabuhan()
        setDataBarang()
        setDataDeskripsi("Deskripsi Barang")
        setDataDiskon(0)
        setDataHarga(0)
        setDataTotal(0)
   }

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
                <select id="inputState" class="form-select"
                onChange={(e) => handleDataPelabuhan(e)}
                >
                  <option selected>Pilih Negara</option>
                     {dataNegara?.data &&
                      dataNegara?.data?.map((data, i) => (
                  <option  value={data.id_negara}>{data?.id_negara} - {data?.nama_negara}</option>
                      ))}
                </select>
            </div>
              <div className="col">
                 <label for="inputState" class="form-label">Pelabuhan</label>
                <select id="inputState" class="form-select"
                  onChange={(e) => handleDataBarang(e)}>
                     <option selected>Pilih Pelabuhan</option>
                     {dataPelabuhan?.data &&
                      dataPelabuhan?.data?.map((data, i) => (
                  <option
                 
                  value={data.id_pelabuhan}
                  >{data?.id_pelabuhan} - {data?.nama_pelabuhan}</option>
                   ))}
                </select>
              </div>
            
          </div>
          <div className="row mt-3">
              <div class="col">
              <label for="inputState" class="form-label">Barang</label>
                <select id="inputState" class="form-select"
                >
                  {
                    dataBarang?.length === 0 ?
                     <option selected>Pilih Barang</option>
                     :
                    dataBarang?.data &&
                      dataBarang?.data?.map((data, i) => (
                      <option
                        selected={i = 0 ? true : false}
                        value={data.id_barang}>
                        {data?.id_barang} - {data?.nama_barang}
                      </option>
                   ))
                  }
                </select>
                </div>
            </div>

            <div className="row mt-3">
              <div class="col">
              <label for="exampleFormControlTextarea1" class="form-label">Description</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
              value={dataDeskripsi}></textarea>
              </div>
            </div>
            <div className="row mt-3">
            <div class="col">
              <label for="inputCity" class="form-label">Discount %</label>
              <input type="text" class="form-control" id="inputCity"  value={dataDiskon}/>
            </div>
              <div className="col">
                <label for="inputCity" class="form-label">Harga</label>
                <input type="text" class="form-control" id="inputCity" value={`Rp. ${handleFormatUang(dataHarga)}`}/>
              </div>
          </div>

          <div className="row mt-3 mb-5">
              <div class="col">
                <label for="inputCity" class="form-label">Total</label>
                <input type="text" class="form-control" id="inputCity" value={`Rp. ${handleFormatUang(dataTotal)}`}/>
              </div>
          </div>

         <div className="row mt-5 mb-5">
              <div class="col d-grid">
               
                <button class="btn btn-primary" type="button"
                onClick={() => handleReset()}
                >Reset</button>
              </div>
          </div>
      </div>
    </section>
   
    </>
  );
}