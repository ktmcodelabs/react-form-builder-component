export function textAreaAdjust(el) {
    const element = el.target;
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
}

export const fromBuilderStub = {
    "formStub": {
        "title": "Onboard New Employee",
        "description": "FLowhart to onboard new employee to the organization",
        "required": [],
        "properties": {
            "intro": {
                "title": "Introduction",
                "description": "This is a paragraph element. You can update me or add new form elements."
            }
        },
        "ui": {
            "intro": {
                "widget": "paragraph"
            }
        },
        "values": {}
    },
    "propertyStub": {
        "title": "Title",
        "description": "",
        "options": []
    },
    "uiStub": {
        "widget": "input",
        "autofocus": false,
        "className": ""
    },
    "widgets": [
        "input",
        "textarea",
        "select",
        "checkbox",
        "radio",
        "paragraph",
        "header",
        "hr"
    ],
    "inputClass": "form-control",
    "checkboxClass": "form-check-input",
    "checkboxWrapperClass":"form-check",
    "inputWrapperClass": "form-group",
    "btnClass":"btn"
}