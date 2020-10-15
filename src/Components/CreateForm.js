import React, {Component} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import PersonalDetails from './PersonalDetails';
import SocialMedia from './SocialMediaDetails';
import Events from './EventDetails';
import ValidateForm from '../Utils/ValidateForm';
import Loader from './Loader';

class CreateForm extends Component{
    // have all fields here as a state
    state = {
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
        Anniversary : ""
    }
    
    changeToBase64(img){
         
    }

    handleStates = (input) => (e) => {  
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
    }

    toggleKey = (k) => {
        this.setState({
            key : k
        })
    }

    AddContact = (e) => {
        e.preventDefault();
        const formValues = this.state;
        //perform validation
        ValidateForm(formValues,"save");
    }

    nextTab = (k) => (k) => {
        this.toggleKey(k);
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
                    <Tabs defaultActiveKey = {this.state.key} onSelect={(k) => this.toggleKey(k)}>
                        <Tab eventKey = "PersonalDetails" title="Personal Information">
                            <PersonalDetails handleInput = {this.handleStates} next = {this.nextTab}/>
                        </Tab>
                        <Tab eventKey = "SocialMediaDetails" title="Social Media">
                            <SocialMedia handleInput = {this.handleStates}/>
                        </Tab>
                        <Tab eventKey = "EventDetails" title="Events">
                            <Events handleInput = {this.handleStates}/>
                        </Tab>
                    </Tabs>
                    
                </div>
    
                <div className = "createButton">
                    <button className = "btn btn-primary" onClick = {this.AddContact}>Create Contact</button>
                </div>
            </>
        )
    }
    
}


export default CreateForm;