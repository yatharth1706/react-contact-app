import React, {Component, useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ValidateForm from '../Utils/ValidateForm';
import Loader from './Loader';
import Axios from 'axios';
import defaultPic from '../Assets/defaultPic.png';
import { Link } from 'react-router-dom';

function UpdateUser(props){
    const [key, setKey] = useState("PersonalDetails");
    const [user, setUser] = useState({});
    const [image, setImage] = useState(defaultPic);
    let Name = React.createRef();
    let ContactNo = React.createRef();
    let Email = React.createRef();
    let Relationship = React.createRef();
    let HomeAddress = React.createRef();
    let OfficeAddress = React.createRef();
    let Photograph = React.createRef();
    let Instagram = React.createRef();
    let Linkedin= React.createRef();
    let Facebook = React.createRef();
    let Birthday = React.createRef();
    let Anniversary = React.createRef();

    const setProfilePic = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log(e.target.files[0])
            var reader = new FileReader(); 
            reader.readAsDataURL(e.target.files[0]);  
            reader.onload = function () { 
                var fileContent = reader.result; 
                document.getElementById('profilePic').src = fileContent;
            }
          }
    }

    const RelationshipLists = ["Friend","Son","Daughter","Father","Mother","Brother","Sister","Uncle","Aunt","Cousin","Nephew","Niece","Husband","Wife","GrandParents","GrandChild","Other"];

    useEffect(() => {
        Axios.get(`http://localhost:8082/api/contacts/${props.match.params.id}`).then((res) => {
            console.log(res.data);
            setUser(res.data);
        })
    },[])

    

    const updateContact = (e) => {
        
        e.preventDefault();
        
        const formValues = {
            Name : Name.current.value,
            ContactNo : ContactNo.current.value,
            Email : Email.current.value,
            Relationship : Relationship.current.value,
            HomeAddress : HomeAddress.current.value,
            OfficeAddress : OfficeAddress.current.value,
            Photograph : document.getElementById("profilePic").src,
            Instagram : Instagram.current.value,
            Linkedin: Linkedin.current.value,
            Facebook : Facebook.current.value,
            Birthday : Birthday.current.value,
            Anniversary : Anniversary.current.value
        };
        //perform validation
        console.log(props.match.params.id)
        console.log(formValues.Photograph);
        ValidateForm(formValues,"update",props.match.params.id);
    }

    return (
        <>
            <div style={{display:"flex", justifyContent : "flex-start"}}>
                        <a href="/"><ion-icon name="arrow-back-outline" style={{fontSize : "25px", width: "100px"}}></ion-icon></a>
            </div>
            <div className = "createForm">
            
                <Loader />
            {/* create three tabs and show three different forms on clicking on tabs */}
                <Tabs defaultActiveKey = {key} onSelect={(k) => setKey(k)} >
                    <Tab eventKey = "PersonalDetails" title="Personal Information">
                    <div className = "PersonalDetails">
                        <div className="row">
                            <div className = "col-sm-6">
                                <label>Name<span className = "required">*</span></label>
                                <input type= "text" name= "Name" className = "form-control" ref = {Name} defaultValue={user.Name}/>
                                <label>Email<span className = "required">*</span></label>
                                <input type= "text" name="Email" className = "form-control" ref = {Email} defaultValue = {user.Email}/>
                            </div>
                            <div className = "col-sm-6">
                                <label>Contact No<span className = "required">*</span></label>
                                <input type= "text" name="ContactNo" className = "form-control" ref= {ContactNo} defaultValue = {user.ContactNo}/>
                                <label>Relationship<span className = "required">*</span></label>
                                <select className = "form-control" ref = {Relationship} defaultValue = {user.Relationshipwithme}>
                                    {RelationshipLists.map((r) => <option key={r.toString()} value = {r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                            
                        <label>Home Address<span className = "required">*</span></label>
                        <input type= "text" name="homeAddress" className = "form-control" ref = {HomeAddress} defaultValue = {user.HomeAddress}/>
                        <label>Office Address</label>
                        <input type= "text" name="officeAddress" className = "form-control" ref = {OfficeAddress} defaultValue = {user.OfficeAddress}/>
                        <div className = "photographDetails">
                            <img className="profilepic" alt = "" src = {user['photograph'] ? user['photograph'] : image} id="profilePic"/><br />
                            <label className="text-center">Photograph</label><br></br>
                            <input type="file" name="photograph" onInput = {setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}} ref={Photograph}/>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey = "SocialMediaDetails" title="Social Media">
                    <div className = "SocialMediaDetails">
                        <div className="panel">
                            <label>Instagram</label>
                            <input type = "text" className = "form-control" ref = {Instagram}/>
                        </div>
                        <div className="panel">
                            <label>Linkedin</label>
                            <input type = "text" className = "form-control" ref = {Linkedin}/>
                        </div>
                        <div className="panel">
                            <label>Facebook</label>
                            <input type = "text" className = "form-control" ref = {Facebook}/>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey = "EventDetails" title="Events">
                        <div className = "EventDetails">
                            <div className="panel">
                                <label>Birthday</label>
                                <input type = "date" className = "form-control" ref = {Birthday}/>
                            </div>
                            <div className="panel">
                                <label>Anniversary</label>
                                <input type = "date" className = "form-control" ref = {Anniversary}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                
            </div>

            <div className = "createButton">
                <button className = "btn btn-primary" onClick = {updateContact}>Update Contact</button>
            </div>
        </>
    )
    
}


export default UpdateUser;