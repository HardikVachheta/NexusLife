import { LogOut, Menu } from "lucide-react";
import { mockUser } from "../App";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

export const Navbar = ({ onMenuClick }) => {
    const { user, logout: authLogin } = useAuth();
    const navigate = useNavigate(); // For navigating to login page
    const location = useLocation();
    // console.log("Navbar :", user)
    const getPageTitle = (pathname) => {
        switch (pathname) {
            case '/':
                return 'Dashboard';
            case '/profile':
                return 'Profile';
            case '/company-detail':
                return 'Company';
            case '/job-detail':
                return 'Job Details';
            case '/mails/sent':
                return 'Mail Sent';
            case '/mails/received':
                return 'Mail Received';
            case '/mails/interview':
                return 'Mail Interview';
            case '/mails/pending':
                return 'Mail Pending';
            case '/gold-calculator':
                return 'Gold Calculator';
            default:
                return 'Page';
        }
    };
    const currentTitle = getPageTitle(location.pathname);

    const handleLogoutClick = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#38a169',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out'
        }).then((result) => {
            if (result.isConfirmed) {
                authLogin();
                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been successfully logged out.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate("/login");
            }
        });
    };

    return (
        <>
            <NavbarContainer>
                <div className="flex items-center">
                    <MenuButton onClick={onMenuClick}>
                        <Menu className="h-6 w-6" />
                    </MenuButton>
                    <NavbarTitle>{currentTitle}</NavbarTitle>
                </div>
                <UserInfo>
                    {user && (
                        <>
                            <UserName>
                                Welcome, <Link to='/profile'>{user.name}</Link>
                            </UserName>
                            <Avatar>
                                <Link to='/profile'><AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=random` || "/default-avatar.png"} alt="User Avatar" /></Link>
                                {/* <AvatarImage src={user.avatar || "/default-avatar.png"} alt="User Avatar" /> */}
                                {/* <StatusIndicator /> */}
                            </Avatar>
                        </>
                    )}
                    <LogoutButton onClick={handleLogoutClick}>
                        <LogOut className="h-5 w-5" />
                    </LogoutButton>
                </UserInfo>
            </NavbarContainer>
        </>
    );
};


// ---------------- STYLES ----------------
const NavbarContainer = styled.nav`
    position: sticky;
    top: 0;
    z-index: 40;
    width: 100%;
    backdrop-filter: blur(10px);
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 8px 16px; /* Reduced vertical padding */
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Added shadow */
`;

const MenuButton = styled.button`
    margin-right: 16px; /* Reduced horizontal margin */
    color: #a0aec0;
    cursor: pointer;
    &:hover {
        color: #edf2f7;
    }
    border: none;
    background-color: transparent;
    padding: 0;
`;

const NavbarTitle = styled.h1`
    font-size: 1.25rem; /* Smaller font size */
    font-weight: 600;
    color: #fff;
    margin: 0;
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px; /* Reduced gap */
`;

const UserName = styled.span`
    font-size: 0.875rem;
    color: #a0aec0;
    display: none;
    @media (min-width: 768px) {
        display: block;
    }
`;

const Avatar = styled.div`
    position: relative;
    width: 32px; /* Smaller avatar size */
    height: 32px;
    border-radius: 50%;
    border: 2px solid #805ad5;
    overflow: hidden;
`;

const AvatarImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const StatusIndicator = styled.span`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 8px; /* Smaller indicator */
    height: 8px;
    border-radius: 50%;
    background-color: #38a169;
    border: 2px solid #1a202c;
`;

const LogoutButton = styled.button`
    color: #a0aec0;
    cursor: pointer;
    &:hover {
        color: #edf2f7;
    }
    border: none;
    background-color: transparent;
    padding: 0;
`;

const ConfirmationModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 20px;
    border-radius: 8px;
    z-index: 50;
    display: flex;
    flex-direction: column;
    gap: 10px;
    text-align: center;
`;

const ConfirmationButton = styled.button`
    background-color: #38a169;
    color: white;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s;

    &:hover {
        background-color: #2f855a;
    }
`;

