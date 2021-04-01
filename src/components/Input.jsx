import React from 'react'
import { fromBuilderStub } from './helper'

const Input = (props) => {
    const { onChange, title, name, autofocus, type, className, value, required } = props
    return <div className={`${fromBuilderStub.inputWrapperClass}`}>
        <label>{title}</label>
        <input type={type}
            required={required}
            autoFocus={autofocus ? 'autofocus' : false}
            onChange={onChange ? (e) => onChange(e) : ''}
            name={name}
            value={value}
            className={`${fromBuilderStub.inputClass} ${className}`}
        />
    </div>
}

export default Input