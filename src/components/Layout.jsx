import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import { LoginPage, RecoveryPage, RegisterPage } from '../pages/auth';
import ProtectedRoute from '../context/ProtectedRoute';
import CompanyJobs from '../pages/CompanyJobs';

export const Layout = ({ children }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const handleMenuClick = () => {
        if (window.innerWidth < 768) {
            setMobileSidebarOpen(prev => !prev);
        } else {
            setIsCollapsed(prev => !prev);
        }
    };

    return (
        <>
            <Toaster position="top-center" />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/recovery" element={<RecoveryPage />} />
                <Route path="/company/:id/jobs" element={<CompanyJobs />} />

                {/* Sidebar */}
                <Route
                    path="/*"
                    element={
                        <ProtectedRoute>
                            <div className="flex h-screen bg-cover bg-center"
                            style={{ backgroundImage: `url('/bg.jpg')` }}
                            >
                                <Sidebar
                                    isOpen={isMobileSidebarOpen}
                                    onClose={() => setMobileSidebarOpen(false)}
                                    isCollapsed={isCollapsed}
                                    onToggleCollapse={() => setIsCollapsed(prev => !prev)}
                                    isManualCollapse={window.innerWidth >= 768}
                                />

                                {/* Main Content Area */}
                                <div className="flex-1 flex flex-col overflow-hidden">
                                    <Navbar onMenuClick={handleMenuClick} />
                                    <main className="overflow-y-auto">{children}</main>
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </>
    );
};
