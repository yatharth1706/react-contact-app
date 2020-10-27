import Axios from 'axios';
import React , {useState} from 'react';

const ImportModal = ({importModal, hideModal}) => {
    const [importedContacts, setImportedContacts] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [err, setErr] = useState('');
    const [fileName, setFileName] = useState('');

    const convertCSVToArray = (e) => {
        setFileName(e.target.files[0].name);
        var reader = new FileReader();
        reader.readAsText(e.target.files[0]);
        reader.onload = (res) => {
            let csvText = res.target.result;
            let temp = [];
            let arr = csvText.split('\n');

            let headers = arr[0].split(',');
            for(let i =1;i<arr.length;i++){
                let data = arr[i].split(',');
                if(data[0].trim() === ''){
                    break;
                }
                let tempObj = {}
                for(let j=0;j<data.length;j++){
                    tempObj[headers[j].trim()] = data[j].trim();
                }
                temp.push(tempObj);
            }

            let tempHeaders = [];
            for(var Key of Object.keys(temp[0])){
                tempHeaders.push(Key);
            }
            tempHeaders.pop();
            tempHeaders.pop();
            tempHeaders.pop();
            tempHeaders.pop();
            setHeaders(tempHeaders);
            setImportedContacts(temp);
        }   
    }

    const validate = () => {
        setErr('');
        if(importedContacts.length === 0){
            setErr('Choose file to import');
        }else{
            setErr('')
            console.log(importedContacts);
            importedContacts.map((contact) => {
                const tempObj = {
                    "ContactNo": contact.ContactNo,
                    "Email": contact.Email,
                    "Facebook": contact.Facebook,
                    "HomeAddress": contact.HomeAddress,
                    "Instagram": contact.Instagram,
                    "Linkedin": contact.Linkedin,
                    "Name": contact.Name,
                    "OfficeAddress": contact.OfficeAddress,
                    "Relationship": contact.Relationshipwithme,
                    "photograph": contact.photograph,
                    "Birthday" : contact.Birthday !== "null" ? contact.Birthday : new Date().toJSON(),
                    "Anniversary": contact.Anniversary !== "null" ? contact.Anniversary : new Date().toJSON()
                }
                Axios.post("http://localhost:8082/api/Contacts", tempObj).catch((e) => alert(e));
            })
            Axios.post(`http://localhost:8082/api/imports?fileName=${fileName}`).then(() => {
                alert("Imported Successfully");
                window.location.href = "/";
            }).catch((e) => {
                console.log(err);
            })
            
        }
    }

    return (
        <div className = "importModalBackground" style={{display : importModal === true ? "block" : "none"}}>
            <div className = "close-section">
                <button className="delete" onClick = {hideModal}></button>
            </div>
            <div className = "text-center">
                <input type="file" className="mb-1" onChange = {convertCSVToArray} style={{border: "1px solid black"}}/>
            </div>
            <div className = "previewTable mb-5" style={{ height: importedContacts.length=== 0 ? "0px" : "300px"}}>
                <p className="text-center"><strong>Preview:</strong></p>
                <table className = "table">
                    <thead>
                        <tr>
                            {headers.map((header) => <th>{header}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {importedContacts.map((contact) => <tr>
                            <td>{contact.ID}</td>
                            <td>{contact.Name}</td>
                            <td>{contact.Email}</td>
                            <td>{contact.ContactNo}</td>
                            <td>{contact.HomeAddress}</td>
                            <td>{contact.OfficeAddress}</td>
                            <td>{contact.Linkedin}</td>
                            <td>{contact.Facebook}</td>
                            <td>{contact.Instagram}</td>
                            <td>{contact.Birthday}</td>
                            <td>{contact.Anniversary}</td>
                            <td>{contact.photograph}</td>
                            <td>{contact.Relationshipwithme}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            <div className = "text-center">
                {err && <p style={{fontSize: "12px", color : "Red", textAlign : "center", marginBottom : "15px"}}>{err}</p>}
                <button className = "btn btn-sm btn-dark" style={{width : "180px"}} onClick = {validate}>Confirm</button>
            </div>
        </div>
    )
}

export default ImportModal;