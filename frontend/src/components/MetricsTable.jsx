import React from 'react';

const MetricsTable = ({ metrics }) => {
    return (
        <div>
            <h2>Model Metrics</h2>
            <h3>Classification Metrics</h3>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.classification.map((metric, index) => (
                        <tr key={index}>
                            <td>{metric.name}</td>
                            <td>{metric.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h3>Regression Metrics</h3>
            <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
                <thead>
                    <tr>
                        <th>Metric</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {metrics.regression.map((metric, index) => (
                        <tr key={index}>
                            <td>{metric.name}</td>
                            <td>{metric.value}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MetricsTable;
