import React, { useState } from 'react'
import Input from './Input'
import Select from './Select'
import Checkbox from './Checkbox'
import Textarea from './Textarea'
import Radio from './Radio'
import Paragraph from './Paragraph'
import Header from './Header'
import { fromBuilderStub } from './helper'

const Form = (props) => {
    const { properties, required, ui, description, title, onsubmit, values } = props
    const [requiredFields, setRequiredFields] = useState(required ? required : [])
    const [form, setFormState] = useState(values ? values : {})

    const render = (property, key, pid) => {
        property.name = key
        const widget = ui[key] && ui[key].widget ? ui[key].widget : key === 'hr' ? 'hr' : 'input'
        switch (widget) {
            case 'input':
                return <Input key={key + pid}
                    value={form?.[key]}
                    required={requiredFields.includes(key)}
                    {...property} {...ui[key]}
                    onChange={handleInputChange} />
            case 'select':
                return <Select key={key + pid} {...property} {...ui[key]}
                    required={requiredFields.includes(key)}
                    onChange={handleInputChange} />
            case 'radio':
                return <Radio key={key + pid} {...property} {...ui[key]}
                    required={requiredFields.includes(key)}
                    onChange={handleInputChange} />
            case 'checkbox':
                return <Checkbox key={key + pid} {...property} {...ui[key]}
                    required={requiredFields.includes(key)}
                    onChange={handleInputChange} />
            case 'textarea':
                return <Textarea key={key + pid} {...property} {...ui[key]}
                    required={requiredFields.includes(key)}
                    onChange={handleInputChange} />
            case 'paragraph':
                return <Paragraph key={key + pid} {...property} {...ui[key]} />
            case 'header':
                return <Header key={key + pid} {...property} {...ui[key]} />
            case 'hr':
                return <hr key={key + pid} />
        }
    }


    const handleInputChange = (event) => {
        const { target } = event;
        const { name, type } = target;
        const value = type === 'checkbox' ? target.checked : target.value;
        event.persist();
        setFormState({ ...form, [name]: value });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        onsubmit && onsubmit(form)
    }

    return <form onSubmit={(e) => handleFormSubmit(e)}>
        <h2 className="my-3">{title}</h2>
        <p>{description}</p>
        {properties && Object.keys(properties).map((key, pid) => {
            return properties[key] && render(properties[key], key, pid)
        })}
        <button type="submit" className={`${fromBuilderStub.btnClass} btn-primary`}>Submit</button>
    </form>
}

export default Form;