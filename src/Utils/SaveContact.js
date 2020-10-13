import Axios from 'axios';
import User from '../DataModels/User';
import { trackPromise } from 'react-promise-tracker';

export default function SaveContact(form){
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

    callApi(user);
}

function callApi(user){
   trackPromise(
    Axios.post("http://localhost:8079/api/Contacts", user).then((results) => {
        alert("Contact is Created Successfully!");
        window.location.reload();
    }).catch((e) => {
        alert(e);
    })
   )
}