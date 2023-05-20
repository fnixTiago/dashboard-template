import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import "./sidebar.css"

const Sidebar = () => {
    const useCurrentPath = (path) => {
        const location = useLocation()
        return location.pathname === path ? "active" : null
    }
    return (
        <div>
            <h3>
                Sidebar
            </h3>
            <Link to="/dashboard" className={useCurrentPath("/task")}>
                Dashboard
            </Link>
            <Link to="/dashboard/users" className={useCurrentPath("/task")}>
                Users
            </Link>
            <Link to="/dashboard/inscritos" className={useCurrentPath("/task")}>
                Inscritos
            </Link>
            <Link to="/dashboard/contacts" className={useCurrentPath("/task")}>
                Contacts
            </Link>

        </div>
    )
}

export default Sidebar