// Importing the ResponsiveBar component
import { ResponsiveBar } from '@nivo/bar';
// Importing the data
import { data } from '../lib/constants/securityMetrics.js';

// Example Component for Security Dashboard
const SecurityDashboardBarChart = () => (
    <ResponsiveBar
        data={data}
        keys={['threatsDetected', 'incidentsResolved', 'vulnerabilitiesPatched']}
        indexBy="timePeriod" // Time periods like "Day", "Week", "Month"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'set2' }} // Cybersecurity-themed color palette
        borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Time Period',
            legendPosition: 'middle',
            legendOffset: 32,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1,
                        },
                    },
                ],
            },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
);

export default SecurityDashboardBarChart;
