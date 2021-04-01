import React, { Fragment, useEffect, useState } from 'react'
import { textAreaAdjust, fromBuilderStub } from './helper'
import { v4 as uuidv4 } from 'uuid';

const Builder = (props) => {
    const { onSave, onChange, formState, propertyName } = props
    const [showCode, setShowCode] = useState(false)
    const [form, setFormState] = useState(formState ? formState : fromBuilderStub.formStub)
    const [addProperty, setAddProperty] = useState(false)
    const [editProperty, setEditProperty] = useState()


    useEffect(() => {
        onChange && onChange(form)
    }, [form])


    const handleChangeFormInput = (event) => {
        const { target } = event;
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        event.persist();
        setFormState({ ...form, [name]: value });
    }

    const handleChangeFormCode = (e) => {
        const { target } = e
        const { value } = target
        setFormState(JSON.parse(value))
    }

    const removeProperty = (key) => {
        if (!window.confirm(`Remove this property "${form.properties[key].title}" ?`)) return
        const f = { ...form }
        delete f.properties[key]
        setFormState(f)
    }

    const handlePropertyUpdate = (payload) => {
        const ftemp = { ...form }
        const { name, title, description, widget, type, className, autofocus, required, options } = payload
        const optionstemp = mapOptions(options)
        let key = 'hello'
        if (name) key = name
        ftemp.properties[key] = {
            title,
            description,
            type,
            options: optionstemp
        }
        ftemp.ui[key] = {
            className,
            widget,
            autofocus
        }
        required &&
            !ftemp.required.includes(key) && ftemp.required.push(key);
        setFormState(ftemp)
    }

    const mapOptions = (payload) => {
        let t = payload && typeof (payload) === 'string' ? payload.split(/\r?\n/) : [];
        if (t.length > 0) {
            return t.map(x => {
                const y = x.includes(":", 1) && x.split(':')
                if (y) {
                    const z = {}
                    z[y[0]] = y[1];
                    return z
                }
                return x
            })
        }
        return t
    }

    const toggleEdit = (key) => {
        if (editProperty && editProperty === key)
            setEditProperty(null);
        else
            setEditProperty(key);
        setAddProperty(false);
    }

    const toggleAdd = (state) => {
        setAddProperty(state);
        setEditProperty(null);
    }


    return <Fragment>
        <h2>Form Detail <button className={`${fromBuilderStub.btnClass} btn${showCode ? '' : '-outline'}-primary`} onClick={() => setShowCode(!showCode)}><i className="fa fa-code" ></i></button> </h2>

        {showCode && <textarea
            autoFocus={true}
            onFocus={(e) => textAreaAdjust(e)}
            onKeyUp={(e) => textAreaAdjust(e)}
            className="form-control"
            onChange={handleChangeFormCode}
            value={JSON.stringify(form, undefined, 4)}></textarea>}

        {!showCode && <>
            <div className="form-group">
                <label>Form Title</label>
                <input type="text" className={fromBuilderStub.inputClass} name="title" onChange={handleChangeFormInput} value={form.title} />
            </div>
            <div className="form-group">
                <label>Description</label>
                <textarea className={fromBuilderStub.inputClass}
                    name="description"
                    onChange={handleChangeFormInput}
                    value={form.description} ></textarea>
            </div>


            <h3 className="mt-3">Properties</h3>
            <button className={`${fromBuilderStub.btnClass} btn${addProperty ? "" : "-outline"}-primary btn-block`}
                onClick={() => toggleAdd(!addProperty)}><i className="fa fa-plus-circle"></i> Add Property</button>
            {addProperty && <div className="bg-primary rounded p-2">
                <PropertyForm onPropertySubmit={handlePropertyUpdate} name={uuidv4()} />
            </div>}
            <ul className="list-unstyled border-top">
                {Object.keys(form.properties).map((key, idx) => {
                    return <li key={key + idx} className={`border p-2 rounded my-1 ${editProperty === key ? 'bg-primary' : ''}`}>
                        <span onClick={() => toggleEdit(key)}
                            className={`font-weight-bold btn-link btn ${editProperty === key ? 'text-white' : 'text-dark'}`}>
                            {form.properties[key].title} {editProperty === key ? '- Edit' : ''}
                        </span>
                        <button
                            onClick={() => removeProperty(key)}
                            className={`${fromBuilderStub.btnClass}  float-right ${editProperty === key ? 'btn-primary' : 'btn-link'}`}>
                            X
                        </button>
                        {editProperty === key && <PropertyForm
                            onPropertySubmit={handlePropertyUpdate} name={key}
                            property={form.properties[key]}
                            required={form.required}
                            ui={form.ui[key]} />}
                    </li>
                })}
            </ul>
        </>
        }
        <button type="button" className={`${fromBuilderStub.btnClass} btn-primary`} onClick={(e) => onSave(e)}>Save Form</button>
    </Fragment>
}


const PropertyForm = (props) => {
    const { name, property, ui, onPropertySubmit, required } = props
    const temp = property ? { ...property } : { ...fromBuilderStub.propertyStub }
    Object.assign(temp, ui ? ui : fromBuilderStub.uiStub);
    if (!temp.name) temp.name = name;
    temp.required = required ? required.includes(name) : false
    const [form, setFormState] = useState(temp)
    const [formO, setFormOState] = useState(temp)

    const handleChangeFormInput = (event) => {
        const { target } = event;
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        event.persist();
        setFormState({ ...form, [name]: value });
    }
    useEffect(() => {
        onPropertySubmit(form)
    }, [form])

    const discardChanges = () => {
        setFormState(formO)
    }

    const handleOptions = (t) => {
        if (typeof (t) === 'string')
            return t
        if (t.length > 0)
            return t.map(u => {
                if (typeof u === 'object' && u !== null) {
                    return Object.keys(u).map(k => {
                        return k + ':' + u[k]
                    })
                }
                else if (typeof (u) === 'string' || typeof (u) === 'number')
                    return u
            }).join('\n')
        return ''
    }

    return <div className="border p-3 bg-white rounded">
        <div className={`${fromBuilderStub.inputWrapperClass}`}>
            <label>Widget</label>
            <select className={`${fromBuilderStub.inputClass}`} value={form?.widget} name="widget" onChange={handleChangeFormInput}  >
                {fromBuilderStub.widgets.map((widget, idx) => {
                    return <option key={widget + idx} value={widget}>{widget}</option>
                })}
            </select>
        </div>
        <div className="form-row">
            <div className={`${fromBuilderStub.inputWrapperClass} col`}>
                <label>Title</label>
                <input type="text" value={form?.title} name="title"
                    onChange={handleChangeFormInput} className={`${fromBuilderStub.inputClass}`} />
            </div>
            <div className={`${fromBuilderStub.inputWrapperClass} col`}>
                <label>Type</label>
                <input type="text" value={form?.type} name="type"
                    onChange={handleChangeFormInput} className={`${fromBuilderStub.inputClass}`} />
            </div>
        </div>
        <div className={`form-row ${fromBuilderStub.inputWrapperClass}`}>
            <div className="col">
                <div className={`${fromBuilderStub.checkboxWrapperClass}`}>
                    <input type="checkbox" name="required"
                        checked={form?.required} onChange={handleChangeFormInput}
                        className={`${fromBuilderStub.checkboxClass}`} id="required" />
                    <label className="form-check-label" htmlFor="required">Required</label>
                </div>
            </div>
            <div className="col">
                <div className={`${fromBuilderStub.checkboxWrapperClass}`}>
                    <input type="checkbox" name="autofocus"
                        checked={form?.autofocus} onChange={handleChangeFormInput}
                        className={`${fromBuilderStub.checkboxClass}`} id="autofocus" />
                    <label className="form-check-label" htmlFor="autofocus">Autofocus</label>
                </div>
            </div>
        </div>
        <div className={`${fromBuilderStub.inputWrapperClass}`}>
            <label>Class Name</label>
            <input type="text" value={form?.className}
                onChange={handleChangeFormInput} name="className" className={`${fromBuilderStub.inputClass}`} />
        </div>
        <div className={`${fromBuilderStub.inputWrapperClass}`}>
            <label>Options <small>(Add options separated by new line)</small></label>
            <textarea className={`${fromBuilderStub.inputClass}`} name="options"
                onChange={handleChangeFormInput}
                value={form.options ? handleOptions(form.options) : ''} ></textarea>
        </div>
        <div className={`${fromBuilderStub.inputWrapperClass}`}>
            <label>Description</label>
            <textarea className={`${fromBuilderStub.inputClass}`} name="description"
                onChange={handleChangeFormInput}
                value={form.description ? form.description : ''} ></textarea>
        </div>

        <button type="button" className={`${fromBuilderStub.btnClass} btn-outline-warning btn-sm`} onClick={() => discardChanges()}>
            <i className="fa fa-history"></i> Discard Changes</button>
    </div>
}

export default Builder