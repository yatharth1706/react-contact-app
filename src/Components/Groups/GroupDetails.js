import React, { useEffect, useState } from 'react';
import defaultPic from '../../Assets/defaultPic.png';
import {storage} from '../../Config/firebaseConfig'
import 'firebase/storage';


const GroupDetails = ({saveGroupDetails, nextForm, formId, groupInfo}) => {
    const [GroupName, setGroupName] = useState('');
    
    const [GroupPhoto, setGroupPhoto] = useState(defaultPic);
    const [error, setError] = useState('');
    const [upload, setUpload] = useState('');
    const [theme, setTheme] = useState('');

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
                  setGroupPhoto(downloadURL);
                });
              });
          } 
    }

    const handleInput = (input) => (e) => {
        let {value} = e.target;
        console.log("handling input");
        setGroupName(value);
        setError('');
        if(value.length < 5){
            setError('Group Name should be atleast of 5 characters');
        }else{
            setError('');
        }
    }

    const validate = (e) => {
        e.preventDefault();
        console.log(GroupName);
        if(GroupName.length < 5){
            setError('Group Name should be atleast of 5 characters');
        }else{
            saveGroupDetails({
                Groupname : GroupName,
                Groupphoto : GroupPhoto
            })
            nextForm();
        }
    }

    useEffect(() => {
        setTheme(window.localStorage.getItem("theme"));
    },[])

    return(
        <>
            <div className = "GroupDetailsForm" style={{display : formId === 1 ? 'block' : 'none'}}>
                <label style={{color: theme==="Dark" ? "White" : "Black"}}>Group Name<span className = "required">*</span></label>
                <input type= "text" name= "Name" className = "form-control mb-4" onChange = {handleInput("GroupName")} defaultValue={groupInfo ? groupInfo.GroupName : ''}/>
                {error && <p style={{fontSize: "12px", color: "red"}}>{error}</p>}
                <div className="photographDetails">
                    <img className="profilepic" alt = "" src = {groupInfo ? groupInfo.GroupPhoto : GroupPhoto}/><br />
                    <label style={{color: theme==="Dark" ? "White" : "Black"}} className="text-center">Photograph</label><br></br>
                    <input type="file" name="photograph" onInput = {setProfilePic} style={{margin: "0 auto", border: "1px solid lightgray"}}/>
                        &nbsp;&nbsp;{upload !== '' && <span>{upload}</span>}
                </div>
                
                <div style={{display: "flex", justifyContent : "flex-end"}}>
                    <button className="btn btn-primary" onClick = {validate}>Next</button>
                </div>
            </div>
        </>
    )
}

export default GroupDetails;