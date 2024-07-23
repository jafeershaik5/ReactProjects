import React, { useState } from 'react';
import * as Icons from '@mui/icons-material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function SidebarItem({ item }) {
    const [open, setOpen] = useState(false);
    const IconComponent = Icons[item.icon];

    const handleToggle = () => {
        if (item.children) {
            setOpen(!open);
        }
    };

    return (
        <li className="sidebar-item">
            <div className="sidebar-item-content" onClick={handleToggle}>
                {IconComponent && <IconComponent />}
                <span className="sidebar-title">{item.title}</span>
                {item.children && (
                    <span>{open ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
                )}
            </div>
            {item.children && (
                <ul className={`children ${open ? 'open' : ''}`}>
                    {item.children.map((child, index) => (
                        <SidebarItem key={index} item={child} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default SidebarItem;