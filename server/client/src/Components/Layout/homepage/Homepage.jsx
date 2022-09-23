import React from "react";
// import MyAppbar from "../appbar/MyAppbar";
import Footer from "../footer/Footer";
// import "../../../App.css";
import Cards from "./Cards";
import HeroSection from "./HeroSection";
import { motion} from 'framer-motion/dist/framer-motion';

function Homepage() {
  return (
    //<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
    //</motion.div>
    <div>
    <HeroSection />
    <Cards />
    <Footer/>
    </div>  
    
  );
}

export default Homepage;
