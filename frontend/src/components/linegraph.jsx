// Importing the ResponsiveBump component
import { ResponsiveBump } from '@nivo/bump';
// Importing the data
import { data } from '../lib/constants/userActivityMetrics.js';

// Example Component for User Activity Bump Chart
const UserActivityBumpChart = () => (
    <ResponsiveBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        activeLineWidth={6}
        inactiveLineWidth={3}
        inactiveOpacity={0.15}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
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
            legend: 'Activity',
            legendPosition: 'middle',
            legendOffset: -40,
        }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
);

export default UserActivityBumpChart;