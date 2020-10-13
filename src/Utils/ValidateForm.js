import SaveContact from './SaveContact';

export default function ValidateForm(form){
    
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const contactName = form.Name;
    const emailAddress = form.Email;
    const contactNo = form.ContactNo;
    const HomeAddress = form.HomeAddress;

    if(contactName.length === 0){
        alert("Name field is empty.");
        return false;
    }else if(contactNo.length === 0){
        alert("Contact No field is empty.");
    }else if(contactNo.length < 10 || contactNo.length > 10){
        alert("Contact no should be of 10 digits.");
        return false;
    }else if(emailAddress.length === 0){
        alert("Email address field is empty.");
        return false;
    }else if(!emailAddress.match(mailformat)){
        alert("Email is invalid.");
        return false;
    }else if(HomeAddress.length === 0){
        alert("HomeAddress field is empty.");
        return false;
    }
    else{
        SaveContact(form);
        return true;
    }
}