import React, {useState} from 'react';
import defaultPic from '../Assets/defaultPic.png';

const PersonalDetails = ({ handleInput , next, user}) => {
    const [image, setImage] = useState(defaultPic);

    const setProfilePic = (e) => {
        if (e.target.files && e.target.files[0]) {
            var reader = new FileReader(); 
            reader.readAsDataURL(e.target.files[0]);  
            reader.onload = function () { 
                var fileContent = reader.result; 
                setImage(fileContent);
            }
          }
    }

    const RelationshipLists = ["Friend","Son","Daughter","Father","Mother","Brother","Sister","Uncle","Aunt","Cousin","Nephew","Niece","Husband","Wife","GrandParents","GrandChild","Other"];

    return (
        <div className = "PersonalDetails">
            <div className="row">
                <div className = "col-sm-6">
                    <label>Name<span className = "required">*</span></label>
                    <input type= "text" name= "Name" className = "form-control" onChange = {handleInput("Name")}/>
                    <label>Email<span className = "required">*</span></label>
                    <input type= "text" name="Email" className = "form-control" onChange = {handleInput("Email")}/>
                    
                </div>
                <div className = "col-sm-6">
                    <label>Contact No<span className = "required">*</span></label>
                    <input type= "text" name="ContactNo" className = "form-control" onChange = {handleInput("ContactNo")}/>
                    <label>Relationship<span className = "required">*</span></label>
                    <select className = "form-control" onChange = {handleInput("Relationship")}>
                        {RelationshipLists.map((r) => <option key={r.toString()} value = {r}>{r}</option>)}
                    </select>
                </div>
            </div>
                
            <label>Home Address<span className = "required">*</span></label>
            <input type= "text" name="homeAddress" className = "form-control" onChange = {handleInput("HomeAddress")}/>
            <label>Office Address</label>
            <input type= "text" name="officeAddress" className = "form-control" onChange = {handleInput("OfficeAddress")}/>
            <div className = "photographDetails">
                <img className="profilepic" alt = "" src = {image}/><br />
                
                <label className="text-center">Photograph</label><br></br>
                <input type="file" name="photograph" onInput = {setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}} onChange = {handleInput("Photograph")}/>
            </div>
        </div>


    )
};

export default PersonalDetails;