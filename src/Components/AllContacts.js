import React from 'react';
import Axios from 'axios';
import UserInfoModal from './UserInfo';
import DeleteConfirmation from './DeleteConfirmation';
import contactIcon from '../Assets/contactIcon.png';
import ExportModal from './ExportModal';
import ImportModal from './ImportModal';

class allContacts extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            id: '',
            allContacts : [],
            modalShow : false,
            user : {},
            deleteModalShow : false,
            exportModal : false,
            importModal : false
        }
        
    }

  

    showAllContacts(){
        Axios.get("http://localhost:8082/api/contacts").then((results) => {
            this.setState({allContacts : results.data});
            console.log(this.state.allContacts);
        })
    }

    componentDidMount(){
        this.showAllContacts();
    }

    deleteContact(id){
        // let result = window.confirm("Are you sure you want to delete the contact?")
        this.setState({id : id});
        this.setState({deleteModalShow : true});
        
    }

    confirmDelete(){
       
        Axios.delete(`http://localhost:8082/api/contacts/${this.state.id}`).then(() => {
            this.showAllContacts();
        })
        
        this.setState({deleteModalShow : false});
        
    }

    hideDelete(){
        this.setState({deleteModalShow : false});
    }

    setModal(val, index){
        this.setState({modalShow : val});
        this.setState({user : this.state.allContacts[index]})
    }

    render(){
        return(
            <>
                <main>
                <h3 className = "subtitle ml-3 mb-3"><img src = {contactIcon} className = "mr-2" alt="logo"/>All Contacts </h3>      
                <div className = "allContactsTable">
                <table className = "table table-sm mt-2">
                        <thead className = "thead-primary">
                            <tr>
                                <th>Name</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.allContacts.map((user, index) => <tr key = {index}>
                                <td>{user['Name']}</td>
                                <td>{user['ContactNo']}</td>
                                <td>{user['Email']}</td>
                                <td><ion-icon name="eye-outline" style={{fontSize : "18px", color:"blue"}} onClick = {() => this.setModal(true, index)}></ion-icon>&nbsp;&nbsp;<a href={"/user/" + user['ID']} style={{color: "blue"}}><ion-icon name="create-outline" style={{fontSize : "18px"}}></ion-icon></a>&nbsp;&nbsp;<ion-icon name="trash-outline" className="icons" style={{color: "blue", fontSize : "18px"}} onClick = {()=>this.deleteContact(user['ID'])}></ion-icon></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div style={{display : "flex", justifyContent : "flex-end"}}>
                    <span className="btn btn-sm btn-secondary mt-5 createContactBtn" onClick = {() => this.setState({exportModal : true})}>Export Contacts</span>
                    <span className="btn btn-sm btn-dark mt-5 ml-5 createContactBtn" onClick = {() => this.setState({importModal : true})}>Import Contacts</span>
                    <a href="/user"><span className="btn btn-sm btn-primary mt-5 ml-5 createContactBtn">Create contact</span></a>
                </div>          

                </main>
                <ExportModal exportModal = {this.state.exportModal} allContacts = {this.state.allContacts} hideModal = {() => this.setState({exportModal : false})}/>
                <UserInfoModal show = {this.state.modalShow} onHide = {() => this.setModal(false)} user = {this.state.user}/>
                <DeleteConfirmation deleteModalShow = {this.state.deleteModalShow} hideDelete = {() => this.hideDelete()} confirmDelete = {() => this.confirmDelete()}/>
                <ImportModal importModal = {this.state.importModal} hideModal = {() => this.setState({importModal : false})}/>
            </>
        )
    }
}

export default allContacts;