const cellNamePlaceholder = document.querySelector("#cellInfo");
const fontSizeInput = document.querySelector("#fontsize");
const form = document.querySelector("#form");


let activeElement = null;
const state = {};


const defaultProperties = {
    fontFamily : "Arial",
    fontSize : 14,
    color : "#000000",
    textAlign : "left",
    backgroundColor : "#E7ECEE",
    isBold : false,
    isItalic : false,
    isUnderline : false,
    value : ""
}

function onCellFocus(e){
    const elementId =  e.target.id;
    cellNamePlaceholder.innerText = elementId;
    activeElement = e.target;
    if(state[elementId]){
        // already selected cell
        // fill the options with the state of that cell
        resetOptions(state[elementId]);
    }
    else{
        // selected for the first time
        // fill the option with default state
        resetOptions(defaultProperties);
    }
}

function resetOptions(optionsState){
    // this function verfies if the cell is already selected or not by looking in state object
    form.fontFamily.value = optionsState.fontFamily;
    form.fontSize.value = optionsState.fontSize;
    form.bolt.checked = optionsState.isBold;
    form.italic.checked = optionsState.isItalic;
    form.underline.checked = optionsState.isUnderline;
    form.alignText.value = optionsState.textAlign;
    form.textColor.value = optionsState.color;
    form.bgColor.value = optionsState.backgroundColor;
}
 

function onFormChange(){
    if(!activeElement){
        alert("please select a cell to make chamges");
        form.reset();
        return;
    }

    let currentState = {
        textColor : form.textColor.value,
        backgroundColor : form.bgColor.value,
        fontSize : form.fontSize.value,
        fontFamily : form.fontFamily.value,
        isBold : form.bolt.checked,
        isItalic : form.italic.checked,
        isUnderline : form.underline.checked,
        textAlign : form.alignText.value
    }

    // below function applies all the styles to the active cell.
    applyStylesToCell(currentState);

    // update the state object for the current cell.
    state[activeElement.id] = {...currentState , value : activeElement.innerText};

}

function applyStylesToCell(styleObject){
    // it will take the style object and applies it to the currently selected cell.

    activeElement.style.fontSize = `${styleObject.fontSize}px`;
    activeElement.style.fontFamily = styleObject.fontFamily;
    activeElement.style.color = styleObject.textColor;
    activeElement.style.backgroundColor = styleObject.backgroundColor;
    activeElement.style.justifyContent = styleObject.textAlign;

    if(styleObject.isBold){
        activeElement.style.fontWeight = "bold";
    }

    if(styleObject.isItalic){
        activeElement.style.fontStyle = "italic";
    }

    if(styleObject.isUnderline){
        activeElement.style.textDecoration = "underline";
    }

}
