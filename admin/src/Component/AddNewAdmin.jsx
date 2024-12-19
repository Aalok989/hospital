import React, { useContext, useState } from "react";
import { Context } from "../main";
import {Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const AddNewAdmin = () => {
    const { isAuthenticated} = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();
    const handleNewAdmin = async (e) => {
        e.preventDefault();
        try {
            await axios
                .post(
                    "http://localhost:4000/api/v1/user/admin/addnew",
                    { firstName, lastName, email, phone, nic, dob, gender, password },
                    {
                        withCredentials: true,
                        headers: { "Content-Type": "application/json" },
                    }
                )
                .then((res) => {
                    toast.success(res.data.message);
                   
                    navigateTo("/");
                    setFirstName("");
                    setLastName("");
                    setEmail("");
                    setDob("");
                    setPhone("");
                    setNic("");
                    setGender("");
                    setPassword("");
                });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }
    return (
        <>
            <section className="page">
                <div className="container form-component add-admin-form">
                    <img src="/logo.png" alt="logo" className="logo"></img>
                    <h1 className="form-title">ADD NEW ADMIN</h1>
                    <form onSubmit={handleNewAdmin}>
                        <div>
                            <input type="text" value={firstName} placeholder="First Name" onChange={(e) => setFirstName(e.target.value)}></input>
                            <input type="text" value={lastName} placeholder="last Name" onChange={(e) => setLastName(e.target.value)}></input>
                        </div>
                        <div>
                            <input type="text" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                            <input type="number" value={phone} placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)}></input>
                        </div>
                        <div>
                            <input type="number" value={nic} placeholder="NIC" onChange={(e) => setNic(e.target.value)}></input>
                            <input type="date" value={dob} placeholder="Date Of Birth" onChange={(e) => setDob(e.target.value)}></input>
                        </div>
                        <div>
                            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                                <option value={""}>Select Gender</option>
                                <option value={"male"}>Male</option>
                                <option value={"female"}>Female</option>
                                <option value={"LGBTQ"}>LGBTQ</option>

                            </select>
                            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                        </div>
                        
                        <div style={{ justifyContent: "center", alignItems: "center" }}>
                            <button type="submit">ADD NEW ADMIN</button>
                        </div>
                    </form>

                </div>


            </section >
        </>
    )
}
export default AddNewAdmin;