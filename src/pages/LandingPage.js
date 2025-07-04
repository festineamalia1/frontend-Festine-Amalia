import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchData } from "actions";
import LoginForm from "components/LoginForm";
import axios from "axios";
import { API } from "config/api";

const LandingPage = (props) => {
  useEffect(() => {}, []);
  const [dataRocket, setDataRocket] = useState();

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

    console.log("data", dataRocket?.data[0]?.links?.patch?.small)

    useEffect(() => {
        fetchDataRocket();
      }, []);

  return (
    <>
       
    <div class="container-fluid landing vh-100">
  <div class="row h-100">
     <div className="col-md-6 d-flex align-items-center justify-content-center">
      <div className="w-100">
        <div className="row">

        </div>
        
        <div class="logo mb-2 d-flex align-items-center justify-content-center"> 
          <img src={
            dataRocket?.data[0]? dataRocket?.data[0]?.links?.patch?.small :
            require(`../assets/images/astronot.png`)
            } alt="Logo" className="logo-title w-80 px-2"/> 
          ROCKETLIST
          </div>

          
               <LoginForm/>
            
             

   
</div>
</div>
     <div className="col-md-6 d-flex align-items-center justify-content-center">
        
      <img
                          src={require(
                            `../assets/images/rocket-wall.jpg`
                          )}
                          alt="Illustration"
                          className="vw-100 vh-100 img-fluid img-landing"
                        />
      </div>
  </div>
</div>

    </>
  );
};

const mapStatetoProps = (state) => {
  return { num: state.num, data: state.data, error: state.error };
};

const mapDispatchprops = (dispatch) => {
  return { onFetchData: () => dispatch(fetchData()) };
};

export default connect(mapStatetoProps, mapDispatchprops)(LandingPage);
