import { useState } from 'react';
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";
import { Brain } from "lucide-react";
import { Notes } from "../icons/Notes";
import { IoCheckmarkDoneSharp } from "react-icons/io5"; // Import the new icon

export function Sidebar() {
    // Toggle the canvas visibility when Notes button is clicked

    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6">
            <div className="flex text-2xl pt-8 items-center">
                <div className="pr-2 text-black-600"></div>
                <Brain className="h-6 w-6" stroke="#000000" />
                <span className="text-black pl-2">Brainly</span>
            </div>
            <div className="pt-8 pl-4">
                {/* Use SidebarItem with the 'to' prop */}
                <SidebarItem text="Notes" icon={<Notes />} to="/notes" />
                <SidebarItem text="Checklist" icon={<IoCheckmarkDoneSharp />} to="/Checklist" />
                <SidebarItem text="Twitter" icon={<TwitterIcon />} to="/twitter" />
                <SidebarItem text="Youtube" icon={<YoutubeIcon />} to="/youtube" />
                {/* Add the new SidebarItem with the IoCheckmarkDoneSharp icon */}
                
            </div>
        </div>
    );
}