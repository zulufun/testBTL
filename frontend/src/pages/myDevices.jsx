import React from 'react';
import WordFadeIn from '../components/ui/word-fade-in.tsx';
import UserTable from '../components/UserTable.jsx';

export default function MyDevices() {
    return (
        <div className="container mx-auto p-4">
            <WordFadeIn words="My Devices" className="text-3xl font-bold mb-4" />
            <UserTable />
        </div>
    );
}