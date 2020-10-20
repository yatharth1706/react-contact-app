import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import Moment from 'moment';

const Groups = () => {
    const [groups, setGroups] = useState([]);
    
    useEffect(() => {
        Axios.get("http://localhost:8082/api/groups").then((results) => {
            setGroups(results.data);
            console.log(results);
        })
    }, []);

    return (
        <div className = "allGroups">
            <table className = "table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>GroupName</th>
                        <th>CreatedAt</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {groups.map((group) => <tr>
                        <td className="groupsData">{group.ID}</td>
                        <td className="groupsData">{group.GroupName}</td>
                        <td className="groupsData">{Moment(group.CreatedAt).format('YYYY-MM-DD hh:mm')}</td>
                        <td><button className = "btn btn-sm btn-dark">More options</button></td>
                    </tr>)}
                </tbody>
            </table>        
        </div>
    )
}

export default Groups;