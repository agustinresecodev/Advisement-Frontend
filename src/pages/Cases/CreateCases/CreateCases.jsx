import { useEffect } from "react";
import { useState } from "react";
import { getAllClientsCall } from "../../../services/clientsCall";
import { getAllTechs } from "../../../services/usersCall";
import { useSelector } from "react-redux";
import { getUserData } from "../../../components/Slicers/userSlicer";

import { Button } from "react-bootstrap";

import { createCaseCall } from "../../../services/caseCall";




export const CreateCases = () => {
//get user token
const userData = useSelector(getUserData)
const [caseData, setCaseData] = useState({
    userId: "",
    clientId: "",
    description: ""
})


// Flag
const [flag, setFlag] = useState(false);

// Const for clients and techs
const [clients, setClients] = useState([]);
const [filteredClients, setFilteredClients] = useState([]);

const [techs, setTechs] = useState([]);
const [filteredTechs, setFilteredTechs] = useState([]);

// Function to filter clients
const filterClients = (e) => {
    const value = e.target.value;
    const filtered = clients.filter(client => client.name.toLowerCase().includes(value.toLowerCase()));
    setFilteredClients(filtered);
}

// UseEffect to get clients
useEffect(() => {
    const getClients= async () => {
    const response = await getAllClientsCall(userData.token)
    setClients(response.data)
    setFilteredClients(response.data) 
    setFlag(true)           
}   
    if(!flag){
    getClients()
    }    
})

// UseEffect to get techs
useEffect(() => {
    const getTechs = async () => {
        const response = await getAllTechs(userData.token)
        setTechs(response.data)
        setFilteredTechs(response.data)
        setFlag(true)
        console.log(response.data)
    }
    if(!flag){
        getTechs()
    }
})

// Function to filter techs
const filterTechs = (e) => {
    const value = e.target.value;
    const filtered = techs.filter(tech => tech.firstName.toLowerCase().includes(value.toLowerCase()));
    setFilteredTechs(filtered);
}

// function to handle the description
const handleDescription = (e) => {
    setDescription(e.target.value)
    console.log(description)
}

// Function to create a case
const createCase = () => {
    console.log(caseData)
    const sendCase = async () => {
        const response = await createCaseCall(caseData, userData.token)
        console.log(response)
    }
    
    if(caseData.client === "" || caseData.tech === "" || caseData.description === ""){
        alert("Please fill all the fields")
        return
    }else{
        sendCase()
    }
    
    
}

// Function to set the tech
const caseDataHandler = (e) => {
    setCaseData({...caseData, [e.target.name]: e.target.value})
    console.log(caseData)
}


    return (
        
        <div className="container">
            <h1>Create a new Case</h1>
            <p>Here you can create a new case for your clients</p>
            <p>please fill the form below</p>
            <div>
            <input type="text" placeholder="Client Filter" onChange={filterClients}/>
            <select name="clientId" onChange={caseDataHandler}>
                {filteredClients.map((client) => {
                    return <option key={client.id} value={client.id}>{client.name}</option>
                })}
                
            </select>
            </div>
            <div>
            <input type="text" placeholder="Tech Filter" onChange={filterTechs}/>
            <select name="userId" onChange={caseDataHandler}>
                {filteredTechs.map((tech) => {
                    
                    return <option name="userId" value={tech.id} key={tech.id} >{tech.firstName} {tech.lastName}</option>
                })}
            </select>
            </div>
            <div>
            <input type="text" name="description"placeholder="Description" onChange={caseDataHandler}/>
            </div>
            
            <Button variant="primary" onClick={createCase}>Create Case</Button>
        </div>
    )
}
