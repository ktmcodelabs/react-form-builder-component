import React, { useState } from 'react'

import { FormBuilder, FormRender } from 'react-form-builder-component'
import 'form-builder/dist/index.css'


const predefinedForm = {
  "title": "Form Builder Demo",
  "description": "Demo of form builder component for React JS",
  "required": ["fullname"],
  "properties": {
    "intro": {
      "title": "Introduction",
      "description": "This is a paragraph element. You can update me or add new form elements."
    },
    "fullname": {
      "title": "Full Name",
      "description": "Enter Full Name"
    }
  },
  "ui": {
    "intro": {
      "widget": "paragraph"
    },
    "fullname": {
      "className": "text-success"
    }
  },
  "values": {}
}

const App = () => {
  const [form, setFormState] = useState({})


  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log(JSON.stringify(form))
  }


  const handleSubmitDummy = (payload) => {
    console.log(payload)
  }


  const onFormBuilderUpdate = (payload) => {
    setFormState(payload)
  }
  return <div className="container">
    <div className="row">
      <div className="col-12 col-sm-4"><FormBuilder onSave={handleFormSubmit} formState={predefinedForm} onChange={onFormBuilderUpdate} /></div>
      <div className="col text-muted border-left ">
        <h2>Preview</h2>
        <div className="form-preview border">
          <FormRender {...form}
            onsubmit={handleSubmitDummy} /></div>

      </div>

    </div>
  </div>
}

export default App