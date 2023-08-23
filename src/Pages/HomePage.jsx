import React from 'react';
import Header from "../Components/Header";
import TypingBox from "../Components/TypingBox.jsx";
import Footer from "../Components/Footer.jsx";

const HomePage = () => {
  return (
    <div>
        <div className="canvas">
         <Header/>
         <TypingBox/>
         <Footer/>
        </div>
    </div>
  )
}

export default HomePage