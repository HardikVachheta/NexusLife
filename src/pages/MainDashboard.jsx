import { DashboardCards } from "../components/DashboardCards";
import { DashboardCards2 } from "../components/DashboardCards2";

const tableData = [
    { number: 1, companyName: 'Company A', mailId: 'a@example.com', sendDate: '2024-01-15', receiveDate: '2024-01-20', interviewDate: '2024-02-01', pendingDate: '2024-02-05' },
    { number: 2, companyName: 'Company B', mailId: 'b@example.com', sendDate: '2024-01-18', receiveDate: '2024-01-22', interviewDate: '2024-02-05', pendingDate: '2024-02-09' },
    { number: 3, companyName: 'Company C', mailId: 'c@example.com', sendDate: '2024-01-20', receiveDate: '2024-01-25', interviewDate: '2024-02-08', pendingDate: '2024-02-12' },
    { number: 4, companyName: 'Company D', mailId: 'd@example.com', sendDate: '2024-01-22', receiveDate: '2024-01-28', interviewDate: '2024-02-10', pendingDate: '2024-02-15' },
    { number: 5, companyName: 'Company E', mailId: 'e@example.com', sendDate: '2024-01-25', receiveDate: '2024-01-30', interviewDate: '2024-02-12', pendingDate: '2024-02-18' },
];


const MainDashboard = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-8">
                <span
                    className="rounded-md p-3 text-white"
                    style={{ backgroundColor: 'rgba(17, 24, 39, 0.68)', backdropFilter: 'blur(10px)' }}
                    >
                    Welcome to the Dashboard
                </span>
            </h2>

            <DashboardCards2 />

            <div className="mt-12">
                <h3 className="text-xl font-semibold text-gray-200 mb-6">
                    <span
                        className="rounded-md p-3 text-white"
                        style={{ backgroundColor: 'rgba(17, 24, 39, 0.68)' }}>
                        Application Data
                    </span>
                </h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-800 rounded-lg shadow-md overflow-hidden">
                        <thead className="bg-white/10">
                            <tr>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Number</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Company Name</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Mail ID</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Send Date</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Receive Date</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Interview Date</th>
                                <th className="px-6 py-3 text-left text-gray-300 font-semibold text-sm">Pending Date</th>
                            </tr>
                        </thead>
                        <tbody className="bg-transparent">
                            {tableData.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? "bg-white/2.5" : ""}>
                                    <td className="px-6 py-4 text-white text-sm">{row.number}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.companyName}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.mailId}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.sendDate}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.receiveDate}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.interviewDate}</td>
                                    <td className="px-6 py-4 text-white text-sm">{row.pendingDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default MainDashboard;