import React, {Component} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import SocialMedia from './SocialMediaDetails';
import Events from './EventDetails';
import Loader from '../Loader';
import defaultPic from '../../Assets/defaultPic.png';
import CreatedModal from '../Modals/CreatedModal';
import User from '../../DataModels/User';
import { trackPromise } from 'react-promise-tracker';
import Axios from 'axios';
import {storage} from '../../Config/firebaseConfig'
import 'firebase/storage';


class CreateForm extends Component{
    // have all fields here as a state
    constructor(props){
        super(props);
        this.state = {
            key : "PersonalDetails",
            Name : "",
            ContactNo : "",
            Email : "",
            Relationship : "Friend",
            HomeAddress : "",
            OfficeAddress : "",
            Photograph : "",
            Instagram : "",
            Linkedin: "",
            Facebook : "",
            Birthday : "",
            Anniversary : "",
            image : defaultPic,
            errors : {
                name : "",
                contact : "",
                email : "",
                homeAddress : ""
            },
            showModal : false,
            upload : "",
            theme : ""
        }
    }
    
    

    toggleKey = (k) => {
        this.setState({
            key : k
        })
    }

    callApi(user){
        
        trackPromise(
         Axios.post("http://localhost:8082/api/Contacts", user).then((results) => {
             this.setState({showModal : true})   
         }).catch((e) => {
             alert(e);
         })
        )
     }

    SaveContact(form){
        let user = new User();
        user.Name = form.Name;
        user.Email = form.Email;
        user.ContactNo = form.ContactNo;
        user.HomeAddress = form.HomeAddress;
        user.OfficeAddress = form.OfficeAddress;
        user.Linkedin = form.Linkedin;
        user.Facebook = form.Facebook;
        user.Instagram = form.Instagram;
        user.Birthday = form.Birthday !== "" ? form.Birthday : new Date("0001-01-01").toJSON();
        user.Anniversary = form.Anniversary !== "" ? form.Anniversary : new Date("0001-01-01").toJSON();
        user.Photograph = form.Photograph;
        user.Relationship = form.Relationship;
        user.Events = [];
        user.SocialMedias = [];
    
        this.callApi(user);
    }

    validateForm(form, action, id){
    
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const contactName = form.Name;
        const emailAddress = form.Email;
        const contactNo = form.ContactNo;
        const HomeAddress = form.HomeAddress;
    
        if(contactName.length === 0){
            return false;
        }else if(contactNo.length === 0){
            return false;
        }else if(contactNo.length < 10 || contactNo.length > 10){
            return false;
        }else if(emailAddress.length === 0){
            return false;
        }else if(!emailAddress.match(mailformat)){
            return false;
        }else if(HomeAddress.length === 0){
            return false;
        }
        else{
            this.SaveContact(form);
        }
    }

    
    
    
    
    AddContact = (e) => {
        e.preventDefault();
        const formValues = this.state;
        let errors = this.state.errors;
        
        if(this.state.Name.length === 0){
            errors.name = 'Name cannot be empty'
        }
        if(this.state.ContactNo.length === 0){
            errors.contact = 'Contact cannot be empty';
        }
        if(this.state.Email.length === 0){
            errors.email = 'Email cannot be empty';
        }
        if(this.state.HomeAddress.length === 0){
            errors.homeAddress = 'Home Address cannot be empty';
        }
        this.setState({errors : errors})
        //perform validation
        this.validateForm(formValues,"save", -1)
        
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
                this.setState({upload : progress + "%"})
                
              }, (error) => {
                // Handle unsuccessful uploads
              }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                Task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  this.setState({image : downloadURL}, () => this.setState({Photograph : downloadURL}))
                  
                });
              });
          } 
    }

    handleInput = (e, input) => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let errors = this.state.errors;
        if(e.target.name === "photograph"){
            var reader = new FileReader(); 
            reader.readAsDataURL(e.target.files[0]);  
            var that = this;
            reader.onload = function(){ 
                var fileContent = reader.result; 
                that.setState({
                    [input] : fileContent
                }, () => console.log(that.state.Photograph));  
            }
            
        }else{
            this.setState({
                [input] : e.target.value
            })
        }

        let {value} = e.target;
        switch(input){
            case 'Name':
                errors.name = value.length < 5 ? 'Full name must be atleast 5 characters long.' : '';
                break;
            case 'Email' : 
                errors.email = mailformat.test(value) ? '' : 'Email is not valid.';
                break;
            case 'ContactNo':
                errors.contact = (value.length < 10 || value.length > 10) ? 'Contact number should be of 10 digits' : '';
                 break;
            case 'HomeAddress':
                errors.homeAddress = value.length === 0 ? 'Home address cannot be empty' : '';
                break;
            default:
                break;
        }
    }

    handleStates = (input) => (e) => {  
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let errors = this.state.errors;
        if(e.target.name === "photograph"){
            var reader = new FileReader(); 
            reader.readAsDataURL(e.target.files[0]);  
            var that = this;
            reader.onload = function(){ 
                var fileContent = reader.result; 
                that.setState({
                    [input] : fileContent
                });  
            }
        }else{
            this.setState({
                [input] : e.target.value
            })
        }

        let {value} = e.target;
        switch(input){
            case 'Name':
                errors.name = value.length < 5 ? 'Full name must be atleast 5 characters long.' : '';
                break;
            case 'Email' : 
                errors.email = mailformat.test(value) ? '' : 'Email is not valid.';
                break;
            case 'ContactNo':
                errors.contact = (value.length < 10 || value.length > 10)  ? 'Contact number should be of 10 digits' : '';
                 break;
            case 'HomeAddress':
                errors.homeAddress = value.length === 0 ? 'Home address cannot be empty' : '';
                break;
            default:
                break;
        }

    }

    RelationshipLists = ["Friend","Son","Daughter","Father","Mother","Brother","Sister","Uncle","Aunt","Cousin","Nephew","Niece","Husband","Wife","GrandParents","GrandChild","Other"];

    validateForTabs = (k) => {
        
        let errors = this.state.errors;
        let flag = false;
        if(this.state.Name.length === 0){
            errors.name = 'Name cannot be empty';
            flag = true;
        }
        if(this.state.ContactNo.length === 0){
            errors.contact = 'Contact cannot be empty';
            flag = true;
        }
        if(this.state.Email.length === 0){
            errors.email = 'Email cannot be empty';
            flag = true;
        }
        if(this.state.HomeAddress.length === 0){
            errors.homeAddress = 'Home Address cannot be empty';
            flag = true;
        }
        this.setState({errors : errors})

        if(flag === false){
            
        }
    }

    componentDidMount(){
        this.setState({theme : window.localStorage.getItem("theme")});
    }

    render(){
        return (
            <>
            <div style={{display:"flex", justifyContent : "flex-start"}}>
                        <a href="/"><ion-icon name="arrow-back-outline" style={{fontSize : "25px", width: "100px"}}></ion-icon></a>
                    </div>
                <div className = "createForm">
                    
                    <Loader />
                {/* create three tabs and show three different forms on clicking on tabs */}
                    <Tabs defaultActiveKey = {this.state.key} onSelect={(k) => this.validateForTabs(k)}>
                        <Tab eventKey = "PersonalDetails" title="Personal Information">
                            <div className = "PersonalDetails">
                                <div className="row">
                                    <div className = "col-sm-6">
                                        <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Name<span className = "required">*</span></label>
                                        <input type= "text" name= "Name" className = "form-control" onChange = {(e) => this.handleInput(e,"Name")}/>
                                        {this.state.errors.name && <p className = "errors">{this.state.errors.name}</p>}
                                        <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Email<span className = "required">*</span></label>
                                        <input type= "text" name="Email" className = "form-control" onChange = {(e) => this.handleInput(e,"Email")}/>
                                        {this.state.errors.email && <p className = "errors">{this.state.errors.email}</p>}
                                        
                                    </div>
                                    <div className = "col-sm-6">
                                        <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Contact No<span className = "required">*</span></label>
                                        <input type= "text" name="ContactNo" className = "form-control" onChange = {(e) => this.handleInput(e,"ContactNo")}/>
                                        {this.state.errors.contact && <p className = "errors">{this.state.errors.contact}</p>}
                                        <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Relationship<span className = "required">*</span></label>
                                        <select className = "form-control" onChange = {(e) => this.handleInput(e,"Relationship")}>
                                            {this.RelationshipLists.map((r) => <option key={r.toString()} value = {r}>{r}</option>)}
                                        </select>
                                    </div>
                                </div>
                                    
                                <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Home Address<span className = "required">*</span></label>
                                <input type= "text" name="homeAddress" className = "form-control" onChange = {(e) => this.handleInput(e,"HomeAddress")}/>
                                {this.state.errors.homeAddress && <p className = "errors">{this.state.errors.homeAddress}</p>}
                                <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}}>Office Address</label>
                                <input type= "text" name="officeAddress" className = "form-control" onChange = {(e) => this.handleInput(e,"OfficeAddress")}/>
                                <div className = "photographDetails">
                                    <img className="profilepic" alt = "" src = {this.state.image}/><br />
                                    
                                    <label style={{color: this.state.theme === "Dark" ? "White" : "Black"}} className="text-center">Photograph</label><br></br>
                                    <input type="file" name="photograph" id="photo" onInput = {this.setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}}/>&nbsp;&nbsp;
                                    {this.state.upload && <span>Upload : {this.state.upload}</span>}
                                </div>
                            </div>

                        </Tab>
                        <Tab eventKey = "SocialMediaDetails" title="Social Media">
                            <SocialMedia handleInput = {this.handleStates}/>
                        </Tab>
                        <Tab eventKey = "EventDetails" title="Events">
                            <Events handleInput = {this.handleStates}/>
                        </Tab>
                    </Tabs>
                    
                </div>
    
                <div className = "createButton text-center">
                   <button style = {{margin : "0 auto"}}className = "btn btn-primary" onClick = {this.AddContact}>Create Contact</button>
        <div style={{color : "red"}}>{this.state.err ? this.state.err : ""}</div>
                </div>

                <CreatedModal showModal = {this.state.showModal} isGroup = {false} />
            </>
        )
    }
    
}


export default CreateForm;