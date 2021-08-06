import React from 'react'

import "../../css/navbar.scss";

const navLinks = {
    "_links": [
        {
            "name": "Home",
            "href": "/"
        },
        {
            "name": "Problems",
            "href": "/problems"
        }
    ]
} 

export default function Navbar() {
    const renderLink = (link, linkId) => {
        let className = 'nav-link';
        const key = `${link}_${linkId}`
        const isCurrent = window.location.pathname === link.href;

        if (isCurrent) {
            className += ' current'
        };

        return (
            <a key={key} href={link.href} className={className}>{link.name}</a>
        )
    }

    return (
        <div className="nav">
            <nav>
                {navLinks._links.map(renderLink)}
            </nav>
        </div>
    )
}
