let clickedTexts = [];
let allCont = "";
let isImageOn=1;

const button=createButton("Save as file",generatePDF,'save');
const selectAll=createButton("Select All",selectAllFunc,'select');
const clearBut=createButton("Clear",clear,'clear');
const iconsBack=document.createElement('div');
iconsBack.id="iconsBack";
iconsBack.appendChild(button);
iconsBack.appendChild(selectAll);
iconsBack.appendChild(clearBut);
iconsBack.style.position="fixed";
iconsBack.style.display="flex";
iconsBack.style.width="300px";
iconsBack.style.bottom="105px";
iconsBack.style.right="73px";
iconsBack.style.justifyContent="space-evenly";
document.body.appendChild(iconsBack);

const img=createIcon(openButtons);
img.id='image';
img.onclick=function(){
    openButtons(isImageOn);
};
document.body.appendChild(img);
const link = document.createElement('link');

function generatePDF() {
    if (clickedTexts.length == 0) {
        alert("Please select atleast one response");
        return;
    } else {
        alert("Your request has been downloaded successfully");
    }
    const now = new Date();
    let content = "";
    let count = 1;
    for (let i = 0; i < clickedTexts.length; i++) {
        content += count + ".   ";
        content += getStructuredTextContent(elements[clickedTexts[i].id]);
        if (content.includes("Copy code")) {
            content = content.replace(/Copy code/g, "\n");
        }
        content += "\n\n\n";
        count++;
    }
    const file = new Blob([content], { type: 'text/plain' });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download="ChatNote.txt";
    document.body.appendChild(a);
  a.click();
    document.body.removeChild(a);
}
let elements;
checkingSimult();
function checkingSimult(){
let targetNode = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
if(targetNode.length<=0){
    const intervalId=setInterval(()=>{
    if(targetNode.length>0){
        clearInterval(intervalId);
        checkElementAndAppendButton();
        const config = { attributes: true, childList: true, subtree: true };
const callback =  (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.className==='result-streaming markdown prose w-full break-words dark:prose-invert dark' || addedNode.className.includes("markdown prose w-full break-words dark:prose-invert dark") ) {
                    checkElementAndAppendButton();
                }
            });
     } 
     }
};
const observer = new MutationObserver(callback);
let content=document.getElementsByClassName("flex flex-col text-sm");
if(content[0]){
observer.observe(content[0], config);
}
    }
},100);
}
}
let theLastButton=0;
async function checkElementAndAppendButton() {
    elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
 if (elements.length > 0){
        for (let i = theLastButton; i < elements.length; i++) {
            
            const element = elements[i];
            const mainDiv = document.createElement('div');
            const div = document.createElement('div');
            const checkbox = document.createElement('input')
            checkbox.type="checkbox";
            checkbox.id = i;
            checkbox.addEventListener('click', clickedELement);
            const label = document.createElement('label')
            label.htmlFor=i;
            label.textContent="Select  ";
            div.appendChild(label);
            div.appendChild(checkbox);
          mainDiv.appendChild(div);
            div.style.float = "right";
            div.style.margin = '10px';
            element.parentNode.insertBefore(mainDiv, element);
        } theLastButton=elements.length; 
    }
    
}
//checkElementAndAppendButton();
let counter=0;
function clickedELement(event) {
    let id = event.target.id;
    navigator.clipboard.writeText(elements[id].textContent).then(function() {
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
    if (event.target.checked) {
        allCont += event.target
        clickedTexts.push(event.target)
        getStructuredTextContent(elements[event.target.id]);
        counter++;
    } else {
        clickedTexts.splice(clickedTexts.indexOf(event.target), 1);
        toChangeNumber();
        counter--;
    }
}

function toChangeNumber() {
    for (let i = 0; i < clickedTexts.length; i++) {
        clickedTexts[i].textContent = " " + (i + 1) + " ";
    }
}


function getStructuredTextContent(element) {
    let result = '';

    function traverse(node) {
        let flag = 1;
        if (node.className === "flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md") {
            result += '\n\n';
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            result += node.textContent.trim();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            if (tag === 'p') {
                result += '\n';
            } else if (tag === 'li') {
              result += '\n-\t';
              // result+="<liiiiii>";
          } else if (tag === 'h3') {
              result += '\n\n### ';
          } else if (tag === 'ol' || tag === 'ul') {
              // Array.from(node.children).forEach((child, index) => {
              result += '\n\t';
              // });
          } else if (tag === 'pre') {} else {
              if (tag !== 'div') {
                  flag = 0;
                  if (tag === "table") {
                      result += '\n' + convertHtmlTableToAscii(node.outerHTML);
                  } else {
                      result += node.textContent + " ";
                  }
              }

          }

          if (flag == 1)
              Array.from(node.childNodes).forEach(traverse);
          
      }
  }



  traverse(element, 0);
  return result.trim();
}

function convertHtmlTableToAscii(htmlTable) {
  const doc = new DOMParser().parseFromString(htmlTable, 'text/html');
  const table = doc.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const columnWidths = [];
  const asciiRows = [];

  // Calculate maximum width for each column
  rows.forEach(row => {
      const cells = row.querySelectorAll('th, td');
      cells.forEach((cell, index) => {
          const content = cell.textContent.trim();
          columnWidths[index] = Math.max(columnWidths[index] || 0, content.length);
      });
  });

  // Generate ASCII table rows
  rows.forEach(row => {
      const cells = row.querySelectorAll('th, td');
      const asciiCells = [];

      cells.forEach((cell, index) => {
          const content = cell.textContent.trim().padEnd(columnWidths[index], ' ');
          asciiCells.push(content);
      });

      asciiRows.push('| ' + asciiCells.join(' | ') + ' |');
  });

  // Generate separator row
  const separator = '+' + columnWidths.map(width => '-'.repeat(width + 2)).join('+') + '+';

  // Assemble the ASCII table
  const asciiTable = [separator, ...asciiRows, separator].join('\n');

  return asciiTable;
}


    
function selectAllFunc(){
    clickedTexts=[];
    for(let i=0; i<elements.length; i++){
        document.getElementById(i).checked=true;
        clickedTexts.push(document.getElementById(i));
    }
}
function clear(){
    clickedTexts=[];
    for(let i=0; i<elements.length; i++){
        document.getElementById(i).checked=false;
    }
}

function openButtons(){
    if(isImageOn===1){
        document.getElementById('image').style.transform="rotate(90deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        document.getElementById('iconsBack').hidden=true;
        document.getElementById('save').hidden=true;
        document.getElementById('select').hidden=true;
        document.getElementById('clear').hidden=true; 
        isImageOn=0;
    }
    else{
        document.getElementById("image").style.transform="rotate(0deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        document.getElementById('iconsBack').hidden=false;
        document.getElementById('save').hidden=false;
        document.getElementById('select').hidden=false;
        document.getElementById('clear').hidden=false; 
        isImageOn=1;
    }
}
