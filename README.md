# form-builder

> React JS Form Builder package from json

[![NPM](https://img.shields.io/npm/v/form-builder.svg)](https://www.npmjs.com/package/react-form-builder-component) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-form-builder-component
```

## Usage
Form Builder
```jsx
import { FormBuilder } from 'react-form-builder-component'
...
<FormBuilder/>
```

Render Form
```jsx
import { FormRender } from 'react-form-builder-component'
...
<FormRender/>
```

Combining FormBuilder with FormRender to preview form on the go
```jsx
import React, { useState } from 'react'

import { FormBuilder, FormRender } from 'react-form-builder-component'
import 'react-form-builder-component/dist/index.css'


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
    // handle form builder property save action
    console.log(JSON.stringify(form))
  }


  const handleSubmitDummy = (payload) => {
    // handle form submit action
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
```

## License

MIT © [ktmcodelabs](https://github.com/ktmcodelabs)
