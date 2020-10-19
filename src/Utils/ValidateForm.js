import SaveContact from './SaveContact';
import UpdateContact from './UpdateContact';

export default function ValidateForm(form, action, id){
    
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
        if(action === "save"){
            SaveContact(form);
        }else{
            console.log(form);
            UpdateContact(form, id);
        }
    }
}