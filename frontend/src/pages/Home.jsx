import React from "react";
import Biography from "../components/Biography.jsx";
import Departments from "../components/Departments.jsx";
import MessageForm from "../components/MessageForm.jsx";
import Hero from "../components/Hero.jsx";

const Home=()=>{
    return(
        <>
          <Hero title={"welcome to ZeeCare Medical Institute your trusted Healthcare provider"}  imageUrl={"/hero.png"}/>
          <Biography imageUrl={"/about.png"}/>
          <Departments/>
          <MessageForm/>
        </>
    )
}

export default Home;