import React from 'react'
import { fromBuilderStub } from './helper'

const Input = (props) => {
    const { onChange, title, name, autofocus, className, required } = props
    return <div className={`${fromBuilderStub.inputWrapperClass}`}>
        <label>{title}</label>
        <textarea autoFocus={autofocus ? 'autofocus' : false}
            required={required}
            onChange={onChange ? (e) => onChange(e) : ''}
            name={name} className={`${fromBuilderStub.inputClass} ${className}`} ></textarea>
    </div>
}

export default Input