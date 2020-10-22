import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import OptionsModal from './OptionsModal';
import GroupsIcon from '../Assets/groupsIcon.png';
import AllGroups from '../Assets/allGroups.png';
import GroupDeleteConfirmation from './DeleteGroup';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    const [id, setId] = useState('1');
    const [showContacts, setShowContacts] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [deleteGroupModal, setDeleteGroupModal] = useState(false);

    useEffect(() => {
        Axios.get("http://localhost:8082/api/groups").then((results) => {
            setGroups(results.data);
            console.log(results);
        })
    }, []);

    const hideShowContactsModal = () => {
        setShowContacts(false);
    }

    const hideDelete = () => {
        setDeleteGroupModal(false);
    }

    const showAllGroups = () => {
        Axios.get('http://localhost:8082/api/groups').then((results) => {
            setGroups(results.data);
        })
    }

    const confirmDelete = () => {
       
        Axios.delete(`http://localhost:8082/api/ContactsInGroup?groupId=${id}`).then(() => {
            Axios.delete(`http://localhost:8082/api/Groups/${id}`).then(() => {
                showAllGroups();
            })
        })
        
        setDeleteGroupModal(false);
        
    }

    const deleteGroup = (id) => {
        setId(id);
        setDeleteGroupModal(true);
    }



    const showContactsModal = (idofGroup) => {
        Axios.get(`http://localhost:8082/api/ContactsInGroup?groupId=${idofGroup}`).then((results) => {
            setContacts(results.data);
            console.log(results.data);
        })
        setShowContacts(true);
    }

    return (
       
        <div className = "allGroups">
            <h3 className = "ml-3 mb-2 subtitle"><img src = {AllGroups} className = "mr-2" alt="logo" width="35px" height="35px" />All Groups</h3>
            <a href="/groups/create"><span className="btn btn-sm ml-2 createContactBtn"><img src={GroupsIcon} alt="Create Contact" width="20px" height="20px"/>  Create Group</span></a>
            <table className = "table mt-2">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>GroupName</th>
                        <th>CreatedAt</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => <tr key = {group.ID}>
                        <td className="groupsData">{group.ID}</td>
                        <td className="groupsData">{group.GroupName}</td>
                        <td className="groupsData">{Moment(group.CreatedAt).format('YYYY-MM-DD hh:mm')}</td>
                        <td><ion-icon name="eye-outline" style={{fontSize : "18px", color:"blue"}} onClick={() => showContactsModal(group.ID)} ></ion-icon>&nbsp;&nbsp;<a href={"/groups/update/" + group.GroupName} style={{color: "blue"}} ><ion-icon name="create-outline" style={{fontSize : "18px"}}></ion-icon></a>&nbsp;&nbsp;<ion-icon name="trash-outline" className="icons" style={{color: "blue", fontSize : "18px"}} onClick = {() => deleteGroup(group.ID)} ></ion-icon></td>
                    </tr>)}
                </tbody>
            </table>      
    
            <div className = "ContactsInGroups"  style={{display : showContacts === true ? 'block' : 'none'}}> 
                <div className = "close-section">
                    <button className="delete" onClick = {hideShowContactsModal}></button>
                </div>
                <h4 className = "title text-center">Contacts</h4>
                {contacts ? <table className = "table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Contact No</th>
                            <th>Email</th>
                            <th>Relationship</th>
                            {/* <th>Options</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact, index) => <tr>
                            <td>{contact.Name}</td>
                            <td>{contact.ContactNo}</td>
                            <td>{contact.Email}</td>
                            <td>{contact.Relationshipwithme}</td>
                            {/* <td><ion-icon name="eye-outline" style={{fontSize : "18px", color:"blue"}}></ion-icon></td> */}
                        </tr>)}
                    </tbody>
                </table> : <span style={{color: "red", margin: "100px auto"}}>No contacts have been added yet in this group</span>}
            </div>
            <GroupDeleteConfirmation deleteModalShow={deleteGroupModal} hideDelete = {hideDelete} confirmDelete={confirmDelete}/>
        </div>
        
    )
}

export default Groups;