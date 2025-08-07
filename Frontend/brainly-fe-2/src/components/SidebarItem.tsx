import { ReactElement } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

export function SidebarItem({ text, icon, to }: {
    text: string;
    icon: ReactElement;
    to: string; // Add a 'to' prop for the route
}) {
    return (
        <Link to={to} className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150">
            <div className="pr-2">
                {icon}
            </div>
            <div>
                {text}
            </div>
        </Link>
    );
}