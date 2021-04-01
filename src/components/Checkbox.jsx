
import React from 'react'
import { fromBuilderStub } from './helper'

const Checkbox = (props) => {
    const { onChange, title, name, autofocus } = props
    return <div className={`${fromBuilderStub.checkboxWrapperClass} mb-3`}>
        <input type="checkbox"
            id={name}
            autoFocus={autofocus ? 'autofocus' : false}
            onChange={onChange ? (e) => onChange(e) : ''}
            name={name}
            className={`${fromBuilderStub.checkboxClass}`}
        />
        <label className="form-check-label" htmlFor={name}>{title}</label>
    </div>

}

export default Checkbox