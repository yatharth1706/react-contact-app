import Axios from 'axios';
import React, {useState, useEffect} from 'react';


const NotificationSettings = ({id}) => {
    const [groups, setGroups] = useState([]);
    const [groupIds, setGroupIds] = useState([]);
    const [err, setErr] = useState('');
    const [success, setSuccess] = useState('');
    const [alreadyInGroupTable, setAlreadyInGroupTable] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8082/api/groups").then((results) => {
            setGroups(results.data);
            Axios.get("http://localhost:8082/api/notification").then((res) => {
                
                console.log(res.data);
                let temp = [];
                res.data.map((ob) => temp.push(ob.GroupID));
                setAlreadyInGroupTable(temp);
                setGroupIds(temp);
            })
        })
    }, [])

    const fillGroupIds = (id) => (e) => {
        let value = e.target.checked;
        let temp = groupIds;
        if(value === true){
            temp.push(id);
        }else{
            temp = temp.filter((gid) => {return gid!== id});
        }
        setGroupIds(temp);
    }

    const saveAllChanges = () => {
        Axios.delete("http://localhost:8082/api/notification").then(() => {
            groupIds.map((gid) => Axios.post(`http://localhost:8082/api/notification/${gid}`).catch((e) => alert(e)));
        })
        setSuccess('Saved All Changes!');
    }

    const validate = () => {
        setErr('');
        if(groupIds.length === 0){
            setErr('Choose some groups');
        }else{
            setErr('');
            saveAllChanges();
        }
    }



    return (
        <>
            <div className = "notificationSettingsBackground" style={{display : id===1 ? "block" : "none"}}>
                <p style={{marginLeft : "10px", marginBottom : "10px"}}>Choose groups for which notification should be enabled:</p>
                {groups ? <table className = "table">
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>Group Name</th>
                        </tr>
                    </thead>

                    <tbody>
                        {groups.map((group) => <tr key={group.ID}>
                            <td>{alreadyInGroupTable.includes(group.ID) ? <input type="checkbox" onClick = {fillGroupIds(group.ID)} defaultChecked/> : <input type="checkbox" onClick = {fillGroupIds(group.ID)}/>}</td>
                            <td>{group.GroupName}</td>
                        </tr>)}    
                    </tbody>
                </table> : <p>No groups created</p>}
                <div className = "text-center">
                    {err && <p style={{color:"Red", fontSize : "13px"}} className = "mb-3">{err}</p>}
                    <button className = "btn btn-sm btn-dark" style={{width: "120px"}} onClick = {validate}>Save</button>
                    {success && <p style={{color:"Green", fontSize : "13px"}} className = "mt-3">{success}</p>}
                </div>
            </div>
            
        </>
    )
}

export default NotificationSettings;