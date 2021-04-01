import React from 'react'
import { fromBuilderStub } from './helper'

const Select = (props) => {
    const { onChange, title, name, autofocus, className, options, required } = props
    return <div className={`${fromBuilderStub.inputWrapperClass}`}>
        <label>{title}</label>
        <select
            autoFocus={autofocus ? 'autofocus' : false}
            onChange={onChange ? (e) => onChange(e) : ''}
            name={name}
            required={required}
            className={`${fromBuilderStub.iputWrapper} ${className}`}  >
            {options && options.map((option, idx) => {
                if (typeof option === 'object' && option !== null) {
                    const keys = Object.keys(option)
                    return <option key={idx} value={keys[0]}>{option[keys[0]]}</option>
                }
                else if (typeof (option) === 'string' || typeof (option) === 'number')
                    return <option key={idx} value={option}>{option}</option>
            })}
        </select>
    </div>
}

export default Select