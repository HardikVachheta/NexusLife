import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from './lib/utils';
import { Link } from 'react-router-dom';

const dummyEmailData = [
    {
        title: 'Mails Sent',
        value: 5,
        icon: Mail,
        color: 'bg-blue-500',
        emailValues: [],
        route: '/mails-sent',
    },
    {
        title: 'Mail Responses',
        value: 3,
        icon: MessageCircle,
        color: 'bg-green-500',
        emailValues: [],
        route: '/',
    },
    {
        title: 'Interviews Attempted',
        value: 2,
        icon: CheckCircle,
        color: 'bg-purple-500',
        emailValues: [],
        route: '/',
    },
    {
        title: 'Pending Mails',
        value: 2,
        icon: Clock,
        color: 'bg-yellow-500',
        emailValues: [],
        route: '/',
    },
];


export const DashboardCards = () => {
    // const [cardData, setCardData] = useState([
    //     {
    //         title: 'Mails Sent',
    //         value: 0,
    //         icon: Mail,
    //         color: 'bg-blue-500',
    //         emailValues: [],
    //     },
    //     {
    //         title: 'Mail Responses',
    //         value: 0,
    //         icon: MessageCircle,
    //         color: 'bg-green-500',
    //         emailValues: [],
    //     },
    //     {
    //         title: 'Interviews Attempted',
    //         value: 0,
    //         icon: CheckCircle,
    //         color: 'bg-purple-500',
    //         emailValues: [],
    //     },
    //     {
    //         title: 'Pending Mails',
    //         value: 0,
    //         icon: Clock,
    //         color: 'bg-yellow-500',
    //         emailValues: [],
    //     },
    // ]);

    const [cardData, setCardData] = useState(dummyEmailData);
    const [loading, setLoading] = useState(false); // No longer used for dummy data, but can be added if needed.
    const [error, setError] = useState(null); // No longer used, but kept for consistency

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const sentEmails = await getEmailData('sent');
    //         const receivedEmails = await getEmailData('received');
    //         const interviewUpdates = await getEmailData('interview');
    //         const pendingFollowups = await getEmailData('pending');

    //         setCardData([
    //             { ...cardData[0], value: sentEmails.length, emailValues: sentEmails },
    //             { ...cardData[1], value: receivedEmails.length, emailValues: receivedEmails },
    //             { ...cardData[2], value: interviewUpdates.length, emailValues: interviewUpdates },
    //             { ...cardData[3], value: pendingFollowups.length, emailValues: pendingFollowups },
    //         ]);
    //     };

    //     fetchData();
    // }, []);

    // useEffect(() => {
    //     // Simulate fetching data (no actual fetching here)
    //     setLoading(true); // set loading to true
    //     setTimeout(() => {
    //         setCardData(dummyEmailData); // Set dummy data
    //         setLoading(false); // Set loading to false after the timeout
    //     }, 500);
    // }, []);
    useEffect(() => {
        const SPREADSHEET_URL =
            'https://docs.google.com/spreadsheets/d/e/2PACX-1vTZK3BGR1p8E9zSvx27i9PSVDy86Y1U3-Xj9AcO6643jN3bQOg8QXcMyGrti5lWTEwzw25dRKgKZybj/pub?gid=0&single=true&output=csv'; // Replace this!!!

        const fetchData = async () => {
            if (!SPREADSHEET_URL) {
                setError("Please provide a valid Google Sheets URL.");
                setLoading(false);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(SPREADSHEET_URL);
                // console.log("data response",response)
                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch data: ${response.status} ${response.statusText}`,
                    );
                }
                const csvData = await response.text();
                const jsonData = await csvToJson(csvData); //use csvtojson

                // Process the JSON data and update state
                const sentSubjects = jsonData
                    .filter(
                        (row) =>
                            row['Mail Type']?.toLowerCase() === 'sent', // Adjust 'Mail Type' to your actual column name
                    )
                    .map((row) => row['Subject'] || `Mail to: ${row['Company Name']}`); // Adjust 'Subject'
                const receivedSubjects = jsonData
                    .filter(
                        (row) =>
                            row['Mail Type']?.toLowerCase() === 'received', // Adjust
                    )
                    .map((row) => row['Subject'] || `Response from: ${row['Company Name']}`);
                const interviewUpdates = jsonData
                    .filter(
                        (row) => row['Status']?.toLowerCase().includes('interview'), // Adjust
                    )
                    .map((row) => `Interview: ${row['Company Name']} - ${row['Interview Date']}`);  //adjust
                const pendingFollowups = jsonData
                    .filter(
                        (row) => row['Status']?.toLowerCase() === 'pending', // Adjust
                    )
                    .map((row) => `Pending: ${row['Company Name']} - ${row['Pending Date']}`);

                setCardData([
                    { ...cardData[0], value: sentSubjects.length, emailValues: sentSubjects },
                    { ...cardData[1], value: receivedSubjects.length, emailValues: receivedSubjects },
                    { ...cardData[2], value: interviewUpdates.length, emailValues: interviewUpdates },
                    { ...cardData[3], value: pendingFollowups.length, emailValues: pendingFollowups },
                ]);
            } catch (err) {
                setError(err.message || 'An error occurred while fetching data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Function to convert CSV to JSON (using a basic approach)
    const csvToJson = async (csv) => {
        const lines = csv.trim().split('\n');
        const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '')); // Remove quotes
        const result = [];

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentLine = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, '')); // Remove quotes

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j];
            }
            result.push(obj);
        }
        return result;
    };
    // console.log("cardData",cardData)

    if (loading) {
        return <div className="text-white">Loading data...</div>; // Simple loader
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
            {/* {dummyEmailData.map((item, index) => ( */}
            {cardData.map((item, index) => (
                <Link to={item.route} key={index}>
                    <div
                        key={index}
                        style={{ backgroundColor: 'rgba(17, 24, 39, 0.68)', backdropFilter: 'blur(10px)' }}
                        className="bg-white/5 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 hover:border-purple-500/20 rounded-lg p-4"
                    >
                        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="text-sm font-medium text-gray-300">{item.title}</div>
                            <div
                                className={cn(
                                    'rounded-full p-2',
                                    item.color,
                                    'text-white shadow-md',
                                )}
                            >
                                <item.icon className="h-4 w-4" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-white">{item.value}</div>
                        <div className="text-xs text-gray-400 mb-2">
                            {index === 0 && '+20% from last month'}
                            {index === 1 && '-5% from last month'}
                            {index === 2 && '+10% from last month'}
                            {index === 3 && '+2% from last month'}
                        </div>
                        {/* Display Email Values */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-200 mb-1">
                                {item.title === 'Mails Sent' && 'Sent Subjects:'}
                                {item.title === 'Mail Responses' && 'Received Subjects:'}
                                {item.title === 'Interviews Attempted' && 'Interview Updates:'}
                                {item.title === 'Pending Mails' && 'Pending Followups:'}
                            </h4>
                            <ul className="list-disc list-inside max-h-32 overflow-y-auto">
                                {item.emailValues.length > 0 ? (
                                    item.emailValues.map((email, emailIndex) => (
                                        <li key={emailIndex} className="text-xs text-gray-300">
                                            {email}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-xs text-gray-400">No data available.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

