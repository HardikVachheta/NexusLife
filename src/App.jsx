import React from 'react';
// import './App.css'
import {
    Mail,
    MessageCircle,
    CheckCircle,
    Clock,
} from 'lucide-react';
import { Route, Routes } from 'react-router-dom';
import { CompanyListPage, GoldCalculator, GovJob, JobOpeningsCard, MailsSentDetails, MainDashboard, ProfilePage } from './pages';
import { Layout } from './components/Layout';

// Mock user data
export const mockUser = {
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=random', // Placeholder image
};

const App = () => {

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<MainDashboard />} />
                <Route path="/mails/:type" element={<MailsSentDetails />} />
                <Route path="/company-detail" element={<CompanyListPage />} />
                <Route path="/job-detail/:companyName" element={<JobOpeningsCard />} />
                <Route path="/Gov-Job-link" element={<GovJob />} />
                <Route path="/gold-calculator" element={<GoldCalculator />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Layout>
    );
};

export default App;


