import React from "react";
import Hero from "../components/Hero.jsx";
import Biography from "../components/Biography.jsx";

const About=()=>{
    return(
        <>
           <Hero title={"Learn More About Us | ZeeCare Medical Institute"} imageUrl={"/about.png"}></Hero>
           <Biography imageUrl={"/whoweare.png"}></Biography>
        </>
    )
}

export default About;