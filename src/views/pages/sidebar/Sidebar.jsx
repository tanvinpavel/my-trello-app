import { NavLink } from "react-router-dom";

const Sidebar = ({isCollapsed}) => {

    const navLink = 'flex items-center gap-x-4 p-2 rounded-lg hover:bg-slate-200';

    const active = "bg-slate-200";

    return (
        <div className="mx-5">
            <ul className="pt-6">
                <li className="text-gray-900 text-sm font-semibold cursor-pointer my-1">
                    <NavLink to="/" className={({isActive}) => isActive ? `${navLink} ${active}` : navLink}>
                        <span className="text-violet-800"><svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg></span>
                        <span className={`${isCollapsed && 'scale-0'} origin-left duration-200 text-violet-600`}>Home</span>
                    </NavLink>
                </li>
                <li className="text-gray-900 text-sm font-semibold cursor-pointer my-1">
                    <NavLink to="/board" className={({isActive}) => isActive ? `${navLink} ${active}` : navLink}>
                        <span className="text-violet-800"><svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg></span>
                        <span className={`${isCollapsed && 'scale-0'} origin-left duration-200 text-violet-600`}>Board</span>
                    </NavLink>
                </li>
                <li className="text-gray-900 text-sm font-semibold cursor-pointer my-1">
                    <NavLink to="/progress" className={({isActive}) => isActive ? `${navLink} ${active}` : navLink}>
                        <span className="text-violet-800"><svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg></span>
                        <span className={`${isCollapsed && 'scale-0'} origin-left duration-200 text-violet-600`}>Progress</span>
                    </NavLink>
                </li>
            </ul>
            {/* <ul className="menu bg-base-100">
                <li className="hover-bordered">
                    <NavLink to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        {isCollapsed || "Home"}
                    </NavLink>
                </li>
                <li className="hover-bordered">
                    <NavLink to="/board">
                        <svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                        </svg>
                        {isCollapsed || "Board"}
                    </NavLink>
                </li>
                <li className="hover-bordered">
                    <NavLink to="/progress">
                        <svg xmlns="http://www.w3.org/2000/svg" className={isCollapsed ? "h-6 w-6" : "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {isCollapsed || "Progress"}
                    </NavLink>
                </li>
            </ul> */}

            {/* <ul>
                <li>
                <NavLink
                    to="/"
                    style={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }
                >
                    a
                </NavLink>
                </li>
                <li>
                <NavLink
                    to="/board"
                    className={`
                        ${({ isActive }) =>
                        isActive ? activeClassName : undefined}
                    `}
                >
                    b
                </NavLink>
                </li>
                <li>
                <NavLink to="/progress">
                    {({ isActive }) => (
                    <span
                        className={
                        isActive ? activeClassName : undefined
                        }
                    >
                        c
                    </span>
                    )}
                </NavLink>
                </li>
            </ul> */}
        </div>
    );
};

export default Sidebar;