import React from 'react'

const Header = (props) => {
    const { title, description, className, type } = props
    const types = ["h1", "h2", "h3", "h4", "h5", "h6"]
    const HeaderTag = types.includes(type) ? `${type}` : 'h1';


    return <HeaderTag className={className}>{title}</HeaderTag>
}

export default Header