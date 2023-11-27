const column = 26;
const row = 100;

const headerContainer = document.querySelector(".header");
const serialNumberContainer = document.querySelector(".sno");
const mainContainer = document.querySelector(".main");


function createHeaderCells(){
    for(let i = 0; i <= column; i++){
        const headerCell = document.createElement("div");
        headerCell.className = "header-cell";
        if(i !== 0){
            headerCell.innerText = String.fromCharCode(64 + i);
        }
        else if(i == 0){
            headerCell.innerText = "S.NO";
        }
        headerContainer.appendChild(headerCell);
    }
}


function createSerialNumberCells(){
    for(let i = 1; i <= row; i++){
        const snoCell = document.createElement("div");
        snoCell.className = "sno-cells"
        snoCell.innerText = i;
        serialNumberContainer.appendChild(snoCell);
    }
}

function createRow(rowNumber){
    const row = document.createElement("div");
    row.className = "row";

    for(let i = 1; i <= column; i++){
        const cell = document.createElement("div");
        cell.className = "main-cell";
        cell.contentEditable = true;
        row.appendChild(cell);
        cell.id = String.fromCharCode(64 + i) + rowNumber;

        // add cell ID into the cellInfo div
        cell.addEventListener("focus" , onCellFocus);

        cell.addEventListener("input" , onFormChange);
        
    }
    mainContainer.appendChild(row);
}

function buildMainSection(){
    for(let i = 1; i <= row; i++){
        createRow(i);
    }
}



createHeaderCells();
createSerialNumberCells();
buildMainSection();

