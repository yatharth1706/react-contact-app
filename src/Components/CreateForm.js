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
    

    handleStates = (input) => (e) => {
        this.setState({
            [input] : e.target.value
        })
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
        ValidateForm(formValues);
    }

    nextTab = (k) => (k) => {
        this.toggleKey(k);
    }

    render(){
        return (
            <>
                <div className = "createForm">
                <h3 className="text-center mt-2">Create Contact</h3>
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