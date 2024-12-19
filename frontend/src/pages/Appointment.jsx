import React from "react";
import Hero from "../components/Hero.jsx";
import AppointmentForm from "../components/AppointmentForm.jsx";

const Appointment=()=>{
    return(
        <>
           <Hero title={"Schedule Your Appointment  At ZEE CARE Institute"} imageUrl={"/signin.png"}/>
           <AppointmentForm />
        </>
    )
}

export default Appointment;