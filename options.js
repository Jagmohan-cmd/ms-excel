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
    text : ""
}


function applyStylesToCell(styleObject){

    if(!activeElement){
        alert("please select a cell to make chamges");
        form.reset();
        return;
    }

    // it will take the style object and applies it to the currently selected cell.
    let activeCell = document.getElementById(activeElement);

    activeCell.style.fontSize = `${styleObject.fontSize}px`; 
    activeCell.style.fontFamily = styleObject.fontFamily;
    activeCell.style.color = styleObject.textColor;
    activeCell.style.backgroundColor = styleObject.backgroundColor;
    activeCell.style.justifyContent = styleObject.textAlign;

    if(styleObject.isBold){
        activeCell.style.fontWeight = "bold";
    }
    else{
        activeCell.style.fontWeight = "normal";
    }

    if(styleObject.isItalic){
        activeCell.style.fontStyle = "italic";
    }
    else{
        activeCell.style.fontStyle = "normal";
    }

    if(styleObject.isUnderline){ 
        activeCell.style.textDecoration = "underline";
    }
    else{
        activeCell.style.textDecoration = "none";
    }
    // console.log(applyStylesToCell());
    state[activeElement] = styleObject;

}



function onFormChange(){
   
    let currentState = {
        textColor : form.textColor.value,
        backgroundColor : form.bgColor.value,
        fontSize : form.fontSize.value,
        fontFamily : form.fontFamily.value,
        isBold : form.bolt.checked,
        isItalic : form.italic.checked,
        isUnderline : form.underline.checked,
        textAlign : form.alignText.value
    };

    // below function applies all the styles to the active cell.
    applyStylesToCell(currentState);

    state[activeElement] = {...currentState , text : activeElement.innerText};
}

function onChangeFormText(event){
    let changedText = event.target.innerText;
    if(state[activeElement]){
        state[activeElement].text = changedText;
    }
    else{
        // update the state object for the current cell.
        state[activeElement] = {...defaultProperties , text : activeElement.innerText};

    }
}

function onCellFocus(e){
    const elementId =  e.target.id;
    cellNamePlaceholder.innerText = elementId;
    activeElement = elementId;
    if(state[activeElement]){
        // already selected cell
        // fill the options with the state of that cell
        resetOptions(state[activeElement]);
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


 
function exportData() {
    const jsonData = JSON.stringify(state);
    const blob = new Blob([jsonData] , {type: "text/plain"});

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
    console.log(jsonData);
}
