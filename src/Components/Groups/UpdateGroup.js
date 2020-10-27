import React from 'react';
import Axios from 'axios';
import defaultPic from '../../Assets/defaultPic.png';
import {storage} from '../../Config/firebaseConfig';
import 'firebase/storage';
import UpdatedModal from '../Modals/UpdatedModal';

class UpdateGroup extends React.Component{
    constructor(props){

        super(props);
        this.state = {
            formId : 1,
            groupName : '',
            groupPhoto : '',
            contactIds : [],
            groupInfo : {},
            update:false,
            groupErr : '',
            contactsErr : '',
            upload : '',
            contacts : [],
            groupId : -1,
            modalShow : false,
            theme : ''
        }


        if(this.props.match.params.groupName){
            this.setState({update : true});
            Axios.get(`http://localhost:8082/api/Groups?groupName=${this.props.match.params.groupName}`).then((results) => {
                this.setState({groupInfo : results.data[0]});
                this.setState({groupName : results.data[0].GroupName});
                this.setState({groupPhoto : results.data[0].GroupPhoto});
            })
        }
        
    }
    
    componentDidMount(){
        this.setState({theme : window.localStorage.getItem("theme")});
        Axios.get("http://localhost:8082/api/contacts").then((results)=>{
            this.setState({contacts : results.data});
            Axios.get(`http://localhost:8082/api/Groups?groupName=${this.state.groupName}`).then((results) => {
                let groupID = results.data[0].ID;
                this.setState({groupId : groupID});
                Axios.get(`http://localhost:8082/api/ContactsInGroup?groupId=${groupID}`).then((results) => {
                    console.log(results.data);
                    let contactIDSS = [];
                    results.data.map((item) => contactIDSS.push(item.ID));
                    this.setState({contactIds :contactIDSS});
                })
            }) 
        })
    }

    fillContactIds = (id) => (e) => {
        console.log(id);
        let check = e.target.checked;
        let contactIdsList = this.state.contactIds;
        if(check){
        
            contactIdsList.push(id);
            this.setState({contactIds : contactIdsList},()=>console.log(this.state.contactIds));
            
        }else{
            
            contactIdsList= contactIdsList.filter((contactid) => { return contactid!==id; });
            this.setState({ contactIds : contactIdsList},()=>console.log(this.state.contactIds));
            
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

    

    updateGroupForm = () => {
        // first delete all the contacts from the particuarl group and then save all checked contacts in group
        Axios.delete(`http://localhost:8082/api/ContactsInGroup?groupId=${this.state.groupId}`).then(() => {
            // update group details
            Axios.put(`http://localhost:8082/api/Groups/${this.state.groupId}`, {
                GroupName: this.state.groupName,
                GroupPic: this.state.groupPhoto,
            }).then(() => {
                // update contacts details in group
                this.state.contactIds.map((contactID) => {
                    Axios.post(`http://localhost:8082/api/ContactsInGroup?groupId=${this.state.groupId}&contactId=${contactID}`).catch((e) => alert(e));
                })
                // go back to groups page
                this.setState({modalShow : true});
                
            })
        }).catch((e) => {
            alert(e);
        })
    }

    validateContactDetails = () => {
        if(this.state.contactIds.length === 0){
            this.setState({ contactsErr :'Choose some contacts for this group'});
        }else{
            this.setState({contactsErr : ''});
            this.updateGroupForm();
        }
    }

    validateGroup = (e) => {
        e.preventDefault();

        if(this.state.groupName.length < 5){
           this.setState({groupErr : 'Group Name should be atleast of 5 characters'});
        }else{
            this.saveGroupDetails({
                Groupname : this.state.groupName,
                Groupphoto : this.state.groupPhoto
            })
            this.nextForm();
        }
    }

    handleInput = (input) => (e) => {
        let {value} = e.target;
        console.log("handling input");
        this.setState({ groupName : value });
        this.setState({groupErr : ''});
        if(value.length < 5){
            this.setState({groupErr : 'Group Name should be atleast of 5 characters'});
        }else{
            this.setState({groupErr : ''});
        }
    }

    setProfilePic = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reference = storage.ref();
            const file = e.target.files[0];
            const name = new Date() + '-' + file.name;
            const metadata = {
                contentType : file.type
            }
            const Task = reference.child(name).put(file, metadata);

            Task.on('state_changed', (snapshot) =>{
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({upload : progress + "%" });
                
              }, (error) => {
                // Handle unsuccessful uploads
              }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                Task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  this.setState({groupPhoto :downloadURL});
                });
              });
          } 
    }

    render(){
        return(
            <>
            <div style={{display:"flex", justifyContent : "flex-start"}}>
                <a href="/groups"><ion-icon name="arrow-back-outline" style={{fontSize : "25px", width: "100px"}}></ion-icon></a>
            </div>
            <p className = "text-center mt-5" style={{fontSize: "23px", color: this.state.theme === "Dark" ? "White" : "Black"}}>Update Group</p>
            <div className = "CreateGroupDiv">
                <div className = "GroupDetailsForm" style={{display : this.state.formId === 1 ? 'block' : 'none'}}>
                    <label style={{color: this.state.theme==="Dark" ? "White" : "Black"}}>Group Name<span className = "required">*</span></label>
                    <input type= "text" name= "Name" className = "form-control mb-4" onChange = {this.handleInput("GroupName")} defaultValue={this.state.groupInfo ? this.state.groupInfo.GroupName : ''}/>
                    {this.state.groupErr && <p style={{fontSize: "12px", color: "red"}}>{this.state.groupErr}</p>}
                    <div className="photographDetails">
                        <img className="profilepic" alt = "" src = {this.state.groupPhoto}/><br />
                        <label style={{color: this.state.theme==="Dark" ? "White" : "Black"}} className="text-center">Photograph</label><br></br>
                        <input type="file" name="photograph" onInput = {this.setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}}/>
                            &nbsp;&nbsp;{this.state.upload !== '' && <span>{this.state.upload}</span>}
                    </div>
                    
                    <div style={{display: "flex", justifyContent : "flex-end"}}>
                        <button className="btn btn-primary" onClick = {this.validateGroup}>Next</button>
                    </div>
                </div>

                <div className = "contactDetails" style={{display : this.state.formId === 2 ? 'block' : 'none'}}>
                <div className = "contactsInGroups" style={{marginBottom : "20px"}}>
                    <p className = "ml-3 mb-4"><strong style={{color: this.state.theme==="Dark" ? "White" : "Black"}}>Choose contacts:</strong></p>
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
                            {this.state.contacts && this.state.contacts.map((contact) => <tr>
                            <td>{ this.state.contactIds.includes(contact.ID) ? <input type="checkbox" onClick = {this.fillContactIds(contact.ID)} checked/> : <input type="checkbox" onClick = {this.fillContactIds(contact.ID)}/>}</td>
                                <td>{contact.Name}</td>
                                <td>{contact.ContactNo}</td>
                                <td>{contact.Email}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                {this.state.contactsErr && <p style={{fontSize: "12px", color: "red", textAlign : "center"}}>{this.state.contactsErr}</p>}
                <div style = {{display : "flex", justifyContent : "space-between", marginTop : "10px"}}>
                        <button className = "btn btn-dark" onClick = {this.prevForm}>Back</button>
                        <button className = "btn btn-primary" onClick = {this.validateContactDetails}> Update Group</button>
                </div>
            </div>

            </div>
            <UpdatedModal modalShow = {this.state.modalShow} isGroup = {true}/>
            </>
        )
    }
}

export default UpdateGroup;