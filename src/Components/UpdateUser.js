import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Loader from './Loader';
import Axios from 'axios';
import defaultPic from '../Assets/defaultPic.png';
import User from '../DataModels/User';
import { trackPromise } from 'react-promise-tracker';
import UpdatedModal from './UpdatedModal'; 
import {storage} from '../Config/firebaseConfig';
import moment from 'moment';

function UpdateUser(props){
    const [modalShow, setModalShow] = useState(false);
    const [key, setKey] = useState("PersonalDetails");
    const [user, setUser] = useState({});
    const [image, setImage] = useState(defaultPic);
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [homeAddressErr, setHomeAddressErr] = useState('');
    const [contactErr, setContactErr] = useState('');
    const [upload, setUpload] = useState("");
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
                setUpload(progress + "%");
                
              }, (error) => {
                // Handle unsuccessful uploads
              }, () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                Task.snapshot.ref.getDownloadURL().then((downloadURL) => {
                  console.log('File available at', downloadURL);
                  document.getElementById('profilePic').src = downloadURL;
                });
              });
          }
    }

    const RelationshipLists = ["Friend","Son","Daughter","Father","Mother","Brother","Sister","Uncle","Aunt","Cousin","Nephew","Niece","Husband","Wife","GrandParents","GrandChild","Other"];

    useEffect(() => {
        Axios.get(`http://localhost:8082/api/contacts/${props.match.params.id}`).then((res) => {
            res.data.Birthday = moment(res.data.Birthday).format('YYYY-MM-DD');
            res.data.Anniversary = moment(res.data.Anniversary).format('YYYY-MM-DD');
            console.log(res.data);
            console.log(res.data.Birthday);
            setUser(res.data);
        })
    },[])

    const handleInput = (e, input) => {
        let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        

        let {value} = e.target;
        switch(input){
            case 'Name':
                value.length < 5 ? setNameErr('Full name must be atleast 5 characters long.') : setNameErr('');
                break;
            case 'Email' : 
                mailformat.test(value) ? setEmailErr('') : setEmailErr('Email is not valid.');
                break;
            case 'ContactNo':
                (value.length < 10 || value.length > 10) ? setContactErr('Contact number should be of 10 digits') : setContactErr('');
                 break;
            case 'HomeAddress':
                value.length === 0 ? setHomeAddressErr('Home address cannot be empty') : setHomeAddressErr('');
                break;
            default:
                break;
        }
    }

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
        if(Name.current.value.length === 0){
            setNameErr("Name cannot be empty");
        }
        if(ContactNo.current.value.length === 0){
            setContactErr("Contact cannot be empty");
        }
        if(Email.current.value.length === 0){
            setEmailErr("Email cannot be empty");
        }
        if(HomeAddress.current.value.length === 0){
            setHomeAddressErr("Home address cannot be empty");
        }
        validateForm(formValues,"update",props.match.params.id);
    }

    function validateForm(form, action, id){
    
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
            update(form, id);
        }
    }

    function update(form, id){
        let user = new User();
        user.Name = form.Name;
        user.Email = form.Email;
        user.ContactNo = form.ContactNo;
        user.HomeAddress = form.HomeAddress;
        user.OfficeAddress = form.OfficeAddress;
        user.Linkedin = form.Linkedin;
        user.Facebook = form.Facebook;
        user.Instagram = form.Instagram;
        user.Birthday = form.Birthday !== "" ? form.Birthday : new Date().toJSON();
        user.Anniversary = form.Anniversary !== "" ? form.Anniversary : new Date().toJSON();
        user.Photograph = form.Photograph;
        user.Relationship = form.Relationship;
        user.Events = [];
        user.SocialMedias = [];
    
        callApi(user, id);
    }
    
    function callApi(user, id){
        console.log(user);
       trackPromise(
        Axios.put(`http://localhost:8082/api/Contacts/${id}`, user).then((results) => {
            setModalShow(true);
        }).catch((e) => {
            alert(e);
        })
       )
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
                                <input type= "text" name= "Name" className = "form-control" ref = {Name} defaultValue={user.Name} onChange = {(e) => handleInput(e, "Name")}/>
                                {nameErr && <p className = "errors">{nameErr}</p>}
                                <label>Email<span className = "required">*</span></label>
                                <input type= "text" name="Email" className = "form-control" ref = {Email} defaultValue = {user.Email} onChange = {(e) => handleInput(e, "Email")}/>
                                {emailErr && <p className = "errors">{emailErr}</p>}
                            </div>
                            <div className = "col-sm-6">
                                <label>Contact No<span className = "required">*</span></label>
                                <input type= "text" name="ContactNo" className = "form-control" ref= {ContactNo} defaultValue = {user.ContactNo} onChange = {(e) => handleInput(e, "ContactNo")}/>
                                {contactErr && <p className = "errors">{contactErr}</p>}
                                <label>Relationship<span className = "required">*</span></label>
                                <select className = "form-control" ref = {Relationship} defaultValue = {user.Relationshipwithme}>
                                    {RelationshipLists.map((r) => <option key={r.toString()} value = {r}>{r}</option>)}
                                </select>
                            </div>
                        </div>
                            
                        <label>Home Address<span className = "required">*</span></label>
                        <input type= "text" name="homeAddress" className = "form-control" ref = {HomeAddress} defaultValue = {user.HomeAddress} onChange = {(e) => handleInput(e, "HomeAddress")}/>
                        {homeAddressErr && <p className = "errors">{homeAddressErr}</p>}
                        <label>Office Address</label>
                        <input type= "text" name="officeAddress" className = "form-control" ref = {OfficeAddress} defaultValue = {user.OfficeAddress}/>
                        <div className = "photographDetails">
                            <img className="profilepic" alt = "" src = {user['photograph'] ? user['photograph'] : image} id="profilePic"/><br />
                            <label className="text-center">Photograph</label><br></br>
                            <input type="file" name="photograph" onInput = {setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}} ref={Photograph}/>&nbsp;&nbsp;
                            {upload && <span>{upload}</span>}
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey = "SocialMediaDetails" title="Social Media">
                    <div className = "SocialMediaDetails">
                        <div className="panel">
                            <label>Instagram</label>
                            <input type = "text" className = "form-control" ref = {Instagram} defaultValue = {user.Instagram}/>
                        </div>
                        <div className="panel">
                            <label>Linkedin</label>
                            <input type = "text" className = "form-control" ref = {Linkedin} defaultValue = {user.Linkedin}/>
                        </div>
                        <div className="panel">
                            <label>Facebook</label>
                            <input type = "text" className = "form-control" ref = {Facebook} defaultValue = {user.Facebook}/>
                        </div>
                    </div>
                    </Tab>
                    <Tab eventKey = "EventDetails" title="Events">
                        <div className = "EventDetails">
                            <div className="panel">
                                <label>Birthday</label>
                                <input type = "date" className = "form-control" ref = {Birthday} defaultValue = {user.Birthday}/>
                            </div>
                            <div className="panel">
                                <label>Anniversary</label>
                                <input type = "date" className = "form-control" ref = {Anniversary} defaultValue = {user.Anniversary}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>
                
            </div>

            <div className = "createButton" >
                <button className = "btn btn-primary" onClick = {updateContact} style={{margin:"0 auto"}}>Update Contact</button>
            </div>

            <UpdatedModal modalShow = {modalShow} isGroup = {false}/>
        </>
    )
    
}


export default UpdateUser;