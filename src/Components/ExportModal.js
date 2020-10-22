import React, { useState } from 'react';
import ObjectsToCsv from 'objects-to-csv';

const ExportModal = ({allContacts, exportModal, hideModal}) => {
    const [contactIds, setContactIds] = useState([]);
    const [err, setErr] = useState('');
    const [toExport, setToExport] = useState([]);

    const fillContactIds = (index) => (e) => {
        let ids = contactIds;
        if(e.target.checked){
            ids.push(index);
            setContactIds(ids);
        }else{
            ids = ids.filter((id) => {return id!==index; });
            setContactIds(ids);
        }
    }

    const ConvertToCSV = (objArray) => {
        var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        var str = '';

        for (var key of Object.keys(array[0])) {
            str += key + ',';
        }
        str += "\r\n";

        for (var i = 0; i < array.length; i++) {
            var line = '';
            for (var index in array[i]) {
                if (line !== '') line += ','

                line += array[i][index];
            }

            str += line + '\r\n';
        }

        return str;
    }

    const generateDownloadLink = (csvFile) => {
        var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
        
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, 'export.csv');
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", 'export.csv');
                link.style.visibility = 'hidden';
                
                link.click();
                hideModal();
            }
        }
    }

    const confirmExport = () => {
        let temp = toExport;
        contactIds.map((id) => {
            temp.push(allContacts[id]);
        })
        setToExport(temp);
        let csvFile = ConvertToCSV(toExport);
        generateDownloadLink(csvFile);
    }

    
    const validate = () => {
        setErr('');
        if(contactIds.length === 0){
            setErr('Choose some contacts to export.');
        }else{
            confirmExport();
        }
    }

    
    
    return(
        <>
            <div className = "exportModalBackground" style={{display : exportModal === true ? "block" : "none"}}>
                <div className = "close-section">
                    <button className="delete" onClick = {hideModal}></button>
                </div>
                <p style={{fontSize : "22px", marginLeft: "10px"}}>Choose Contacts</p>
                <div className = "contactsInformationTable mt-2">
                    <table className = "table table-sm mt-2">
                        <thead className = "thead-primary">
                            <tr>
                                <th>Name</th>
                                <th>Contact No</th>
                                <th>Email</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allContacts.map((user, index) => <tr key = {index}>
                                <td>{user['Name']}</td>
                                <td>{user['ContactNo']}</td>
                                <td>{user['Email']}</td>
                                <td><input type="checkbox" onChange = {fillContactIds(index)} /></td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
                <div className = "text-center mt-5" id="exportDiv">
                    {err && <p className = "mb-3" style={{fontSize : "13px", color: "Red"}}>{err}</p>}
                    <button className = "btn btn-sm btn-dark" style={{width: "170px"}} onClick = {validate}>Export</button>
                </div>
            </div>
        </>
    )
}

export default ExportModal;