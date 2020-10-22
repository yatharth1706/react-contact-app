import React from 'react';

const ImportModal = ({importModal, hideModal}) => {
    return (
        <div className = "importModalBackground" style={{display : importModal === true ? "block" : "none"}}>
            <div className = "close-section">
                <button className="delete" onClick = {hideModal}></button>
            </div>
            <input type="file" className="mb-5"/>
            <div className = "previewTable">
                <p>Preview:</p>
                <table className = "table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>ContactNo</td>
                            <td>Email</td>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
            <div className = "text-center">
                <button className = "btn btn-sm btn-dark" style={{width : "180px"}}>Confirm</button>
            </div>
        </div>
    )
}

export default ImportModal;