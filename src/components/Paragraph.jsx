import React from 'react'
import { fromBuilderStub } from './helper'

const Paragraph = (props) => {
    const { title, description } = props
    return <div className={`${fromBuilderStub.inputWrapperClass}`}>
        <label>{title}</label>
        <p>{description}</p>
    </div>
}

export default Paragraph