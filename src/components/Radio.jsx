import React from 'react'
import { fromBuilderStub } from './helper'

const Radio = (props) => {
    const { onChange, title, name, autofocus, className, options, required } = props

    const render = (p, idx) => {
        return <div className="d-inline mr-3" key={idx}>
            <input type="radio"
                id={p.id}
                required={required}
                autoFocus={autofocus ? 'autofocus' : false}
                onChange={onChange ? (e) => onChange(e) : ''}
                name={name}
                value={p.value}

            />
            <label htmlFor={p.id}
                className={"pl-1"}
            >{p.label}
            </label>
        </div>
    }
    return <div className={`${fromBuilderStub.inputWrapperClass} clearfix`}>
        {options && options.map((option, idx) => {
            if (typeof option === 'object' && option !== null) {
                const keys = Object.keys(option)
                const o = { 'id': name + option[keys[0]], 'label': option[keys[0]], value: keys[0] }
                return render(o, idx)
            }
            else if (typeof (option) === 'string' || typeof (option) === 'number') {
                const o = { 'id': name + option, 'label': option, value: option }
                return render(o, idx)
            }
        })}
    </div>
}

export default Radio