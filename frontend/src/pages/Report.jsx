import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import NetworkSecurityTable from "../components/NetworkSecurityTable";

const Report = () => {
    const [time, setTime] = useState(new Date());
    const [securityPercentage, setSecurityPercentage] = useState(75); // Example percentage

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer); // Cleanup the interval on component unmount
    }, []);

    const handleRunScan = () => {
        console.log("Running scan...");
        alert("Running scan... This might take a moment!");
    };

    const handlePrintPDF = () => {
        console.log("Printing PDF report...");
        window.open('../asset/Report.pdf', '_blank');
    };

    return (
        <div className="flex flex-col items-center">
            <div className="text-4xl font-bold text-gray-800 dark:text-gray-100 ">
                Your Test Report
            </div>
            <div className="text-xl text-gray-600 dark:text-gray-400 ">
                {time.toLocaleTimeString()}
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
                {/* Circular Progress Bar */}
                <div className="w-40 lg:w-1/3">
                    <CircularProgressbar
                        value={securityPercentage}
                        text={`${securityPercentage}%`}
                        styles={buildStyles({
                            textColor: "#4caf50",
                            pathColor: "#4caf50",
                            trailColor: "#d6d6d6",
                        })}
                    />
                </div>

                {/* Action Table */}
                <div className=" w-full">
                    <table className="w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700">
                                <th className="  text-left text-gray-800 dark:text-gray-100 font-medium">
                                    Action
                                </th>
                                <th className="py-4 px-6 text-left text-gray-800 dark:text-gray-100 font-medium">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={handleRunScan}
                                        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                    >
                                        Run Scan
                                    </button>
                                </td>
                                <td className="py-4 px-6 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                                    Run a security scan on the spot
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="py-4 px-6">
                                    <button
                                        onClick={handlePrintPDF}
                                        className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
                                    >
                                        Print PDF
                                    </button>
                                </td>
                                <td className="py-4 px-6 text-gray-700 dark:text-gray-300">
                                    Print a PDF report of the security status
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <NetworkSecurityTable/>
        </div>
    );
};

export default Report;
