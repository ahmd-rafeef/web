import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isActive ? '#1F2937' : '#6B7281'} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const SearchIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isActive ? '#1F2937' : '#6B7281'} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const CartIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isActive ? '#1F2937' : '#6B7281'} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const InfoIcon = ({ isActive }: { isActive: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke={isActive ? '#1F2937' : '#6B7281'} strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const NavItem = ({ to, label, icon: Icon }: { to: string, label: string, icon: React.FC<{ isActive: boolean }> }) => (
    <NavLink to={to} className={({ isActive }) => `flex flex-col items-center justify-center space-y-1 ${isActive ? 'text-brand-primary' : 'text-brand-secondary'}`}>
        {({ isActive }) => (
            <>
                <Icon isActive={isActive} />
                <span className="text-xs">{label}</span>
            </>
        )}
    </NavLink>
);

const BottomNav: React.FC = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 h-20 bg-brand-surface border-t border-brand-border shadow-lg z-40 grid grid-cols-4">
            <NavItem to="/" label="Home" icon={HomeIcon} />
            <NavItem to="/products" label="Search" icon={SearchIcon} />
            {/* Using placeholder links for Cart for now */}
            <NavItem to="#" label="Cart" icon={CartIcon} />
            <NavItem to="/about" label="About" icon={InfoIcon} />
        </nav>
    );
};

export default BottomNav;