// Sidebar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { css } from 'styled-components';
import {
  Home, Users, PieChart, ListChecks, Settings, ChevronLeft, ChevronRight, Building,
  Calculator,
  User,
  BriefcaseBusiness,
  Landmark,
} from 'lucide-react';
import { mockUser } from '../App';
import logo from '/logo.png';
import { useAuth } from '../context/AuthContext';

// ---------------- MENU ITEMS ----------------
const menuItems = [
  { title: 'Home', icon: Home, path: '/' },
  { title: 'Profile', icon: User, path: '/profile' },
  { title: 'Company', icon: Building, path: '/company-detail' },
  { title: 'Job List', icon: BriefcaseBusiness, path: '/job-list' },
  { title: 'Gov. Links', icon: Landmark, path: '/Gov-Job-link' },
  { title: 'Reports', icon: PieChart, path: '/reports' },
  { title: 'Tasks', icon: ListChecks, path: '/tasks' },
  { title: 'Gold Calculator', icon: Calculator , path: '/gold-calculator' },
  { title: 'Settings', icon: Settings, path: '/settings' },
];

// ---------------- MAIN COMPONENT ----------------
export const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse ,isManualCollapse  }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ---------------- MOBILE SIDEBAR ----------------
  const MobileSidebar = () => (
    <>
      {isOpen && <Overlay onClick={onClose} />}
      <SidebarWrapper
        $collapsed={false}
        animate={{ x: isOpen ? 0 : -240 }}
        initial={{ x: -240 }}
        transition={{ type: 'spring', stiffness: 200, damping: 30 }}
      >
        <Header>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ height: '40px' }} className='bg-white rounded-xl' />
            <BrandName $collapsed={isCollapsed}>Nexus Life</BrandName>
          </div>
        </Header>
        <Menu>
          {menuItems.map(item => (
            <MenuItem key={item.title} onClick={() => {
              navigate(item.path);
              onClose();
            }}>
              <MenuIcon><item.icon size={18} /></MenuIcon>
              {item.title}
            </MenuItem>
          ))}
        </Menu>
      </SidebarWrapper>
    </>
  );

  // ---------------- DESKTOP SIDEBAR ----------------
  const DesktopSidebar = () => (
    <SidebarWrapper $collapsed={isCollapsed}>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={logo}
            alt="Logo"
            style={{ height: isCollapsed ? '32px' : '40px', width: isCollapsed ? '32px' : '40px' }}
            className='bg-white rounded-xl'
          />
          <BrandName $collapsed={isCollapsed}>Nexus Life</BrandName>
        </div>
        <CollapseBtn onClick={onToggleCollapse}>
          {isCollapsed ? <></> : <ChevronLeft />}
        </CollapseBtn>
      </Header>

      <Menu>
        {menuItems.map(item => (
          <MenuItem
            key={item.title}
            onClick={() => navigate(item.path)}
            $collapsed={isCollapsed}
            $active={location.pathname === item.path}
          >
            <MenuIcon $collapsed={isCollapsed}><item.icon size={18} /></MenuIcon>
            {!isCollapsed && item.title}
          </MenuItem>
        ))}
      </Menu>

      <Footer $collapsed={isCollapsed}>
        <Avatar src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="User" />
        <UserInfo $collapsed={isCollapsed}>
          <UserName>{user.name}</UserName>
          <UserRole>{mockUser.role}</UserRole>
        </UserInfo>
      </Footer>
    </SidebarWrapper>
  );

  return isMobile ? <MobileSidebar /> : <DesktopSidebar />;
};



// ---------------- STYLES ----------------
const SidebarWrapper = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  background-color:rgb(26, 32, 44);
  color: #fff;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #2d3748;
  overflow: hidden;
  z-index: 30;
  width: ${props => props.$collapsed ? '64px' : '240px'};
  transition: width 0.3s ease-in-out;

  @media (max-width: 768px) {
    position: fixed;
    left: 0;
    top: 0;
    width: 240px;
    z-index: 50;
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 40;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #2d3748;
`;

const CollapseBtn = styled.button`
  color: #a0aec0;
  background: none;
  border: none;
  cursor: pointer;
padding:unset;
  &:hover {
    color: #fff;
  }
`;

const BrandName = styled.span`
  font-size: 1.4rem;
  font-family: 'Merriweather', sans-serif;
  font-weight: 700;
  background: linear-gradient(90deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: ${props => props.$collapsed ? 'none' : 'inline'};
  margin-left: 12px;
`;

const Menu = styled.div`
  flex: 1;
  padding: 8px;
  overflow-y: auto;
`;

const MenuItem = styled.button`
  width: 100%;
  color: #a0aec0;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: #4a5568;
  }

  ${props => props.$active && css`
    background-color: #2d3748;
    color: #fff;
    font-weight: 600;
`}

  ${props => props.$collapsed && css`
    justify-content: center;
  `}
`;

const MenuIcon = styled.div`
  margin-right: ${props => props.$collapsed ? '0' : '8px'};
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid #2d3748;
  display: flex;
  align-items: center;
  justify-content: ${props => props.$collapsed ? 'center' : 'flex-start'};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 9999px;
  border: 2px solid #805ad5;
`;

const UserInfo = styled.div`
  margin-left: 8px;
  display: ${props => props.$collapsed ? 'none' : 'block'};
`;

const UserName = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
`;

const UserRole = styled.div`
  font-size: 0.75rem;
  color: #a0aec0;
`;
