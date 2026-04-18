import React, { useState, useEffect } from 'react';
import { Mail, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { cn } from './lib/utils';
import { Link } from 'react-router-dom';
import { summryMails } from '../services/mailService';
import { PuffLoader } from 'react-spinners';

const cardMeta = [
    {
        title: 'Mails Sent',
        key: 'sent',
        icon: Mail,
        color: 'bg-blue-500',
    },
    {
        title: 'Mail Responses',
        key: 'received',
        icon: MessageCircle,
        color: 'bg-green-500',
    },
    {
        title: 'Interviews Attempted',
        key: 'interview',
        icon: CheckCircle,
        color: 'bg-purple-500',
    },
    {
        title: 'Pending Mails',
        key: 'pending',
        icon: Clock,
        color: 'bg-yellow-500',
    },
];

export const DashboardCards2 = () => {
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const res = await summryMails(); 
                setSummary(res);
            } catch (err) {
                setError('Failed to fetch summary');
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, []);

    const getPercentChange = (current, last) => {
        if (last === 0) return current > 0 ? '+100%' : '0%';
        const change = ((current - last) / last) * 100;
        const symbol = change >= 0 ? '+' : '';
        return `${symbol}${Math.round(change)}% from last month`;
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", margin: "10px" }}>
                <PuffLoader color="#696cff" size={30} />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error: {error}</div>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {cardMeta.map((item, index) => {
                const data = summary[item.key] || { today: [], currentMonth: 0, lastMonth: 0 };
                const percentChange = getPercentChange(data.currentMonth, data.lastMonth);

                return (
                    <Link to={`/mails/${item.key}`} key={index}>
                        <div
                            style={{ backgroundColor: 'rgba(17, 24, 39, 0.68)', backdropFilter: 'blur(10px)' }}
                            className="bg-white/5 border border-white/10 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-black/20 hover:border-purple-500/20 rounded-lg p-4"
                        >
                            <div className="flex flex-row items-center justify-between pb-2">
                                <div className="text-sm font-medium text-gray-300">{item.title}</div>
                                <div className={cn('rounded-full p-2', item.color, 'text-white shadow-md')}>
                                    <item.icon className="h-4 w-4" />
                                </div>
                            </div>

                            <div className="text-2xl font-bold text-white">{data.currentMonth}</div>

                            <div className="text-xs text-gray-400 mb-2">{percentChange}</div>

                            <div>
                                <h4 className="text-sm font-semibold text-gray-200 mb-1">
                                    {item.title === 'Mails Sent' && 'Sent Emails:'}
                                    {item.title === 'Mail Responses' && 'Responses Today:'}
                                    {item.title === 'Interviews Attempted' && 'Interviews Today:'}
                                    {item.title === 'Pending Mails' && 'Pending Emails:'}
                                </h4>

                                <ul className="list-disc list-inside max-h-32 overflow-y-auto">
                                    {data.today.length > 0 ? (
                                        data.today.map((email, emailIndex) => (
                                            <li key={emailIndex} className="text-xs text-gray-300 truncate">
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
                );
            })}
        </div>
    );
};
