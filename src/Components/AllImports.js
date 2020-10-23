import Axios from 'axios';
import React, {useState, useEffect} from 'react';

const AllImports = ({showImports, hideImports}) => {
    const [imports, setImports] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:8082/api/imports").then((results) => {
            setImports(results.data);
        })
        
    }, [])
    
    return(
        <div className = "AllImportsBackground" style={{display : showImports === true ? "block" : "none"}}>
            <div className = "close-section">
                <button className="delete" onClick = {hideImports}></button>
            </div>
            <p className = "text-center mb-5"><strong>All Imports</strong></p>
            <div className="allImportsTable">
                <table className = "table">
                    <thead>
                        <tr>
                            <th>File Name</th>
                            <th>Imported On</th>
                        </tr>
                    </thead>
                    <tbody>
                        {imports.map((importItem) => <tr key={importItem.ID}>
                            <td>{importItem.FileName}</td>
                            <td>{importItem.ImportedOn}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AllImports;