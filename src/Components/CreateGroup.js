import React from 'react';
import GroupDetails from './GroupDetails';
import ContactDetails from './ContactDetails';
import Axios from 'axios';

class CreateGroup extends React.Component{
    constructor(){
        super();
        this.state = {
            formId : 1,
            groupName : '',
            groupPhoto : '',
            contactIds : []
        }
    }
    
    nextForm = () =>{
        let id = this.state.formId;
        this.setState({formId : id + 1});
    }

    prevForm = () =>{
        let id = this.state.formId;
        this.setState({formId : id - 1});
    }

    saveGroupDetails = ({Groupname, Groupphoto}) => {
        this.setState({groupName : Groupname}, () => this.setState({groupPhoto : Groupphoto}));
    }

    saveContactsState = (contactIDS) => {
        this.setState({contactIds : contactIDS});
    }

    submitForm = () => {
        // first create the group and then save all the contacts
        Axios.post("http://localhost:8082/api/Groups", {
            GroupName: this.state.groupName,
            GroupPic: this.state.groupPhoto,
        }).then(() => {
            // now get the id of group
            Axios.get(`http://localhost:8082/api/Groups?groupName=${this.state.groupName}`).then((results) => {
                // now save all contacts inside the group
                
                this.state.contactIds.map((contactID) => {
                    Axios.post(`http://localhost:8082/api/ContactsInGroup?groupId=${results.data[0].ID}&contactId=${contactID}`).catch((e) => alert(e));
                })
                // go back to groups page
                alert("Group is created successfully");
                window.location.href = "/groups";
            })
        }).catch((e) => {
            alert(e);
        })
    }

    render(){
        return(
            <div className = "CreateGroupDiv">
                <GroupDetails formId = {this.state.formId} nextForm = {this.nextForm} saveGroupDetails={this.saveGroupDetails}/>
                <ContactDetails formId = {this.state.formId} prevForm = {this.prevForm} saveContactsState={this.saveContactsState} submitForm = {this.submitForm} />
            </div>
        )
    }
}

export default CreateGroup;