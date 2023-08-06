import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { ThemeContext } from './context/ThemeContext';

const Home = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const [dekhao , setDekhao] = useState(false);



    function dekhaoFnc(){

      setDekhao(!dekhao);

    }

   
  return (
    <div className="container-fluid " style={{ height: "100vh", color:"black" }}>
      <div
        className="row"
        style={{
          color: "black",
          height: "100vh",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div className="col-5 d-none d-md-block">
          <div 
            data-aos="fade-right"
            data-aos-duration="1000"
            data-aos-delay={300}
          >
            <img
              className="img-fluid rounded-1 login_img_1"
              src="https://images.squarespace-cdn.com/content/v1/5fce63270356d927d7eecdbd/033e9988-2ac8-4cb9-8b9f-5bf05fb22dcb/gff.jpg?format=1500w"
              alt=""
            />
          </div>
        </div>
        <div className="col-5 d-flex flex-column justify-content-center align-items-center">
          <h3
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay={200}
          >
            welcome To{" "}
          </h3>
          <h3
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay={400}
          >
            The TODO CREATION DYNO
          </h3>
          <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay={600}>
            Here, you can create your Own Work's List and can keep track of work
            with losts of inbuilt features like filtering work as per the date
            and can update your work and delete when required.{" "}
          </p>
          <p data-aos="fade-left" data-aos-duration="1000" data-aos-delay={800}>
            If you want to explore the TODO CREATION DYNO , start with the
            bellow button !
          </p>
          <button
            data-aos="fade-left"
            data-aos-duration="1000"
            data-aos-delay={1000}
            style={{
              color: "black",
              padding: "5px 16px",
              border: "1px solid black",
            }}
            className="btn "
            onClick={() => navigate("/login")}
          >
            Login
          </button>


          <div  className={` ${dekhao ? "d-block" : "d-none"} `}     >


<h3>kuhjdshkfkhfakshdkhdf</h3>

          </div>


          <button onClick={dekhaoFnc}>Dekhao</button>

          <button className='btn btn-success' onClick={toggleTheme}>theme</button>
        </div>
      </div>
    </div>

  )
}

export default Home
