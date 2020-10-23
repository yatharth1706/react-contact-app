import React, {useState, useEffect} from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Axios from 'axios';
import moment from 'moment';

const Notifications = ({showNotifications, hideNotifications}) => {
    const [Key, setKey] = useState("Today");
    const [todayNotifications, setTodayNotifications] = useState([]);
    const [upcomingNotifications, setUpcomingNotifications] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8082/api/TodayEvents").then((results) => {
            setTodayNotifications(results.data);
            Axios.get("http://localhost:8082/api/UpcomingNotifications").then((res) => {
                setUpcomingNotifications(res.data);
            })
        })
    },[])

    const toggleKey = (k) => {
        setKey(k);
    }

    return (
        <div className = "allNotificationsBack" style={{display : showNotifications === true ? "block" : "none"}}>
            <div className = "close-section">
                <button className="delete" onClick = {hideNotifications}></button>
            </div>
            <Tabs defaultActiveKey = {Key} onSelect={(k) => toggleKey(k)}>
                <Tab eventKey = "Today" title="Today's Notifications">
                    <div className = "holder mb-5" style={{padding: "20px"}}>
                        {todayNotifications.length !==0 ? todayNotifications.map((notification, index) => <p className = "mb-2"><strong>{index + 1}.</strong> {notification.Name}'s {notification.Flag} is Today</p>) : <p style={{color:"Red"}}>No notifications today / Change notification settings.</p>}
                    </div>
                </Tab>
                <Tab eventKey = "Upcoming" title="Upcoming Notifications">
                    <div className = "holder mb-5" style={{padding: "20px"}}>
                        {upcomingNotifications.length !==0 ? upcomingNotifications.map((notification, index) => <p className = "mb-2"><strong>{index + 1}.</strong> {notification.Name}'s {notification.Flag} is coming on {moment(notification.Date).format("YYYY-MM-DD")}</p>) : <p style={{color:"Red"}}>No Upcoming notifications / Change notification settings.</p>}
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
}

export default Notifications;