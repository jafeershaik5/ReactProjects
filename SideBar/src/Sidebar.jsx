import React, { useState, useEffect, useRef } from "react";
import data from './data.json';
import SidebarItem from "./SidebarItem";
import CloseIcon from '@mui/icons-material/Close';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsSidebarOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div ref={sidebarRef} className={`container ${isSidebarOpen ? '' : 'closed'}`}>
                <div className="upper">
                    <ul>
                        {data.map((item, index) => (
                            <SidebarItem key={index} item={item} />
                        ))}
                    </ul>
                </div>
            </div>
            <button className="toggle-button" onClick={toggleSidebar}>
                {isSidebarOpen ? <CloseIcon /> : <MenuOpenIcon />}
            </button>
        </>
    );
}

export default Sidebar;