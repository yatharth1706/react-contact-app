import React, { useEffect, useState } from 'react';
import Axios from 'axios';

const ContactDetails = ({prevForm, saveContactsState, submitForm,formId, groupName }) => {
    const [contacts, setContacts] = useState([]);
    const [error, setError] = useState([]);
    const [contactIds, setContactIds] = useState([]);
    const [theme, setTheme] = useState('');

    useEffect(() => {
        Axios.get("http://localhost:8082/api/contacts").then((results)=>{
            setContacts(results.data);
            console.log(results.data);
        })

        if(groupName){
            Axios.get(`http://localhost:8082/api/Groups?groupName=${groupName}`).then((results) => {
                let groupId = results.data[0].ID;
                Axios.get(`http://localhost:8082/api/ContactsInGroup?groupId=${groupId}`).then((results) => {
                    console.log(results.data);
                    let contactIDSS = [];
                    results.data.map((item) => contactIDSS.push(item.ID));
                    setContactIds(contactIDSS);
                    saveContactsState(contactIds);
                })
            }) 
        }
    },[])

    const fillContactIds = (id) => (e) => {
        console.log(id);
        let check = e.target.checked;
        let contactIdsList = contactIds;
        if(check){
        
            contactIdsList.push(id);
            setContactIds(contactIdsList);
        }else{
            
            contactIdsList= contactIdsList.filter((contactid) => { return contactid!==id; });
            setContactIds(contactIdsList);
        }

        saveContactsState(contactIds);
    }

    const validate = () => {
        console.log(contactIds);
        // validation
        setError('');
        if(contactIds.length === 0){
            setError('Choose some contacts for this group');
        }else{
            setError('');
            submitForm();
        }
    }

    useEffect(() => {
        setTheme(window.localStorage.getItem("theme"));
    },[])
    
    return(
        <>
            <div className = "contactDetails" style={{display : formId === 2 ? 'block' : 'none'}}>
                <div className = "contactsInGroups" style={{marginBottom : "20px"}}>
                    <p className = "ml-3 mb-4" ><strong style={{color: theme==="Dark" ? "White" : "Black"}}>Choose contacts:</strong></p>
                    <table className = "table">
                        <thead>
                            <tr>
                                <th>Option</th>
                                <th>Name</th>
                                <th>Contact No</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts && contacts.map((contact) => <tr>
                            <td>{ contactIds.includes(contact.ID) ? <input type="checkbox" onClick = {fillContactIds(contact.ID)} checked/> : <input type="checkbox" onClick = {fillContactIds(contact.ID)}/>}</td>
                                <td>{contact.Name}</td>
                                <td>{contact.ContactNo}</td>
                                <td>{contact.Email}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {error && <p style={{fontSize: "12px", color: "red", textAlign : "center"}}>{error}</p>}
                <div style = {{display : "flex", justifyContent : "space-between", marginTop : "10px"}}>
                        <button className = "btn btn-dark" onClick = {prevForm}>Back</button>
                        <button className = "btn btn-primary" onClick = {validate}> Create Group</button>
                </div>
            </div>
        </>
    )
}

export default ContactDetails;