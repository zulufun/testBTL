import React, { useState } from 'react';
import { FaRegBell } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import '../Dashboard.css'; // Ensure this file exists
import { useNavigate } from 'react-router-dom';
import SecurityDashboardBarChart from '../components/barchart.jsx';
import UserActivityBumpChart from '../components/linegraph.jsx';

const Dashboard = () => {
    const navigate = useNavigate();
    const [alerts, setAlerts] = useState([
        { id: 1, message: "Protection component disabled", devices: 3 },
        { id: 2, message: "Dangerous URL", devices: 1 },
        { id: 3, message: "Suspicious user activity", devices: 1 },
        { id: 4, message: "Protection component disabled", devices: 3 },
        { id: 5, message: "Dangerous URL", devices: 1 },
        { id: 6, message: "Suspicious user activity", devices: 1 },
        { id: 7, message: "Protection component disabled", devices: 3 },
        { id: 8, message: "Dangerous URL", devices: 1 },
    ]);

    const unresolvedAlerts = alerts.length;

    const handleSelectChange = async (event, alert) => {
        const action = event.target.value;

        if (action === 'resolve') {
            const aiResponse = await getAIResponse(alert.message);
            navigate(`/chat`, { state: { alertMessage: alert.message, aiResponse } });
        } else if (action === 'ignore') {
            setAlerts(alerts.filter(a => a.id !== alert.id));
        } else if (action === 'snooze') {
            console.log(`Alert ${alert.id} snoozed.`);
        }
    };

    const getAIResponse = async (message) => {
        const fakeResponses = {
            "Protection component disabled": 
                "The protection component on the affected devices has been disabled, which could leave them vulnerable. Please re-enable the security feature by navigating to the protection settings in the device management dashboard. Alternatively, you can deploy a bulk policy to enforce protection settings.",
            "Dangerous URL": 
                "A potentially harmful URL was detected. Users are advised not to interact with the link. The URL has been flagged and quarantined. Please review the threat in the system log and consider blocking the domain at the network level for enhanced safety.",
            "Suspicious user activity": 
                "Unusual activity has been identified from one of your users. This could include abnormal login locations or repeated failed access attempts. I recommend resetting the user's credentials and enabling multi-factor authentication (MFA) for enhanced account security.",
        };
    
        // Default response for unknown alerts
        const defaultResponse = "An unknown alert has been triggered. Please investigate the issue manually for further details.";
    
        // Return the fake response based on the message or the default response
        return fakeResponses[message] || defaultResponse;
    };

    return (
        <>
            <div>
                <h1 className="text-xl">Good Morning Kim, you have {unresolvedAlerts} alerts to resolve</h1>
            </div>
            <div className="mt-4 flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/2 max-h-96 overflow-y-auto custom-scrollbar p-4">
                    <div className="flex flex-row items-center">
                        <FaRegBell fontSize={30} />
                        <div className="flex flex-col ml-3">
                            <h1 className="text-xl mt-4 text-gray-500">Alerts to resolve</h1>
                            <p className="text-2xl font-bold">{unresolvedAlerts}</p>
                        </div>
                    </div>
                    <div className="mt-4">
                        {alerts.length > 0 ? (
                            <ul className="list-none">
                                {alerts.map(alert => (
                                    <li key={alert.id} className="flex flex-row items-center text-lg text-gray-700 mb-2">
                                        <IoAlertCircleOutline className="text-red-500 mr-2" />
                                        <div className="flex-grow">
                                            <span>{alert.message}</span>
                                        </div>
                                        <span className="text-sm text-blue-500 mr-4">{alert.devices} devices</span>
                                        <select
                                            className="p-1 border border-gray-300 rounded"
                                            aria-label="Alert Action"
                                            onChange={(e) => handleSelectChange(e, alert)}
                                        >
                                            <option value="">Select action</option>
                                            <option value="resolve">Resolve</option>
                                            <option value="ignore">Ignore</option>
                                            <option value="snooze">Snooze</option>
                                        </select>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">No alerts to display</p>
                        )}
                    </div>
                </div>
                <div className="w-full lg:w-1/2 max-h-96 overflow-y-auto custom-scrollbar p-4">
                    <SecurityDashboardBarChart />
                </div>
            </div>
            <div className="mt-4 p-4 max-h-96 overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center">
                    <h1 className="text-xl">User Activity</h1>
                    <button className="text-blue-500 hover:underline">View All</button>
                </div>
                <div className="h-96">
                    <UserActivityBumpChart />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
