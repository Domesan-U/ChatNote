let clickedTexts = [];
let allCont = "";
let isImageOn=1;
let isDarkTheme=1;
if(window.getComputedStyle(document.body).backgroundColor.includes('255')){
    isDarkTheme=0;
}

checkingSimult();

const button=createButton("Save as file",generatePDF,'save');
const selectAll=createButton("Select All",selectAllFunc,'select');
const clearBut=createButton("Clear",clear,'clear');
const iconsBack=document.createElement('div');
iconsBack.id="iconsBack";
iconsBack.appendChild(button);
iconsBack.appendChild(selectAll);
iconsBack.appendChild(clearBut);
iconsBack.style.position="fixed";
iconsBack.style.border="5px solid #10A37F";
iconsBack.style.margin="2px";
iconsBack.style.height="25%";
iconsBack.style.borderRadius="20px";
iconsBack.style.display="grid";
iconsBack.style.rowGap="10px";
resizeElement();
window.addEventListener("resize",resizeElement);
function resizeElement(){
    if(window.innerWidth>1000){
        iconsBack.style.width="10%";
        }
        else{
        iconsBack.style.width="20%";
        }
        
}
iconsBack.style.bottom="165px";
iconsBack.style.alignContent="center";
//iconsBack.style.height="40%"
iconsBack.style.right="10px";
document.body.appendChild(iconsBack);

const img=createIcon(openButtons);
img.id='image';
img.onclick=function(){
    openButtons(isImageOn);
};
// Function to handle mouse movement while dragging
function onMouseDrag(event) {
    const { movementX, movementY } = event;
   
    // Get the current computed style of the container
    let getContainerStyle = window.getComputedStyle(iconsBack);

    // Parse the left and top values from the container's style
    let bottomValue = parseInt(getContainerStyle.bottom);
    let topValue = parseInt(getContainerStyle.top);
    img.style.top = `${topValue + movementY}px`;
    img.style.bottom = `${bottomValue - movementY}px`;
    // Update the container's position based on mouse movement
    iconsBack.style.top = `${topValue + movementY}px`;
    iconsBack.style.bottom = `${bottomValue - movementY}px`;
}

// Function to handle mouse down event
iconsBack.addEventListener("mousedown", () => {
   
    // Add event listeners for mousemove and mouseup events to the document
    document.addEventListener("mousemove", onMouseDrag);
    document.addEventListener("mouseup", onMouseUp);
});
img.addEventListener("mousedown", () => {
    
    // Add event listeners for mousemove and mouseup events to the document
    document.addEventListener("mousemove", onMouseDrag);
    document.addEventListener("mouseup", onMouseUp);
});


// Function to handle mouse release
function onMouseUp() {
   
    // Remove event listeners for mousemove and mouseup events from the document
    document.removeEventListener("mousemove", onMouseDrag);
    document.removeEventListener("mouseup", onMouseUp);
}
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

function checkingSimult(){
    let targetNode = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert');

    if(window.getComputedStyle(document.body).backgroundColor.includes('255')){
        targetNode = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert');

    }
    
        
//if(targetNode.length<=0){
    const intervalId=setInterval(()=>{
       // console.log("trapped inside "+ targetNode.length);
    if(targetNode.length>0){
        clearInterval(intervalId);
        //console.log("cleared interveal and calling checkELement at 106");
        checkElementAndAppendButton();
        const config = { attributes: true, childList: true, subtree: true };
const callback =  (mutationList) => {
  for (const mutation of mutationList) {
    //console.log("outerMain: "+mutation);
    if (mutation.type === "childList") {
            mutation.addedNodes.forEach(addedNode => {
                try{
                //    console.log("Main: "+addedNode.className+" :  "+addedNode);
                if (addedNode && addedNode.className.includes('result-streaming markdown prose w-full break-words dark:prose-invert')  ) {
                    checkElementAndAppendButton();
                }
                else if( addedNode.className.includes('group fixed bottom-3 end-3')  || addedNode.className.includes('react-scroll-to-bottom--css')){
                    if(document.getElementById(0)==null){
                    resetAll();
                    checkElementAndAppendButton();
                    }
                }
            }
            catch(err){
                //console.error(err);
            }
            });
     } 
     else if(mutation.type==='attributes' && mutation.attributeName === 'style') {
        let newColor = window.getComputedStyle(document.body).backgroundColor;
        if(window.getComputedStyle(document.body).backgroundColor.includes('255')){
            isDarkTheme=0;
            changeTheme(0);
        }
        else{
            isDarkTheme=1;
            changeTheme(1);
        }
    }
     }
};


const observer = new MutationObserver(callback);
let content=document.getElementsByClassName("flex flex-col text-sm");
if(content[0]){
observer.observe(document.body, config);
}
    }
},100);
//}
}

function resetAll(){
    theLastButton=0;
    elements=[];
    clickedTexts=[];

}
let theLastButton=0;
async function checkElementAndAppendButton() {
    elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert');
    if(window.getComputedStyle(document.body).backgroundColor.includes('255')){
        elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert');
    }
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
            label.id="selectLabel";
            label.textContent="Select  ";
            div.appendChild(label);
            div.appendChild(checkbox);
            mainDiv.appendChild(div);
            div.style.float = "right";
            div.style.margin = '10px';
            if(window.getComputedStyle(document.body).backgroundColor.includes('255')){
                changeTheme(0);
            }
            else{
                changeTheme(1);
            }
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
   //     console.error('Could not copy text: ', err);
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
    if(elements.length==0){
        alert("Oops there are no responses");
    }
    for(let i=0; i<elements.length; i++){
        document.getElementById(i).checked=true;
        clickedTexts.push(document.getElementById(i));
    }
}
function clear(){
    clickedTexts=[];
    if(elements.length==0){
        alert("Oops there are no responses");
    }
    
    for(let i=0; i<elements.length; i++){
        document.getElementById(i).checked=false;
    }
}

function openButtons(){
    if(isImageOn===1){
        document.getElementById('image').style.transform="rotate(90deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        iconsBack.style.visibility='hidden';
        document.getElementById('save').hidden=true;
        document.getElementById('iconsBack').hidden=true;
        document.getElementById('select').hidden=true;
        document.getElementById('clear').hidden=true; 
        isImageOn=0;
    }
    else{
        iconsBack.style.visibility='visible';
        document.getElementById('iconsBack').hidden=false;
        document.getElementById("image").style.transform="rotate(0deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        document.getElementById('iconsBack').hidden=false;
        document.getElementById('save').hidden=false;
        document.getElementById('select').hidden=false;
        document.getElementById('clear').hidden=false; 
        isImageOn=1;
    }
}

function changeTheme(theme){
    if(theme==0){
        //console.log("called cahngetheme white");
        //white background
    document.getElementById('save').style.color="black";
    if(document.getElementById('selectLabel')!=null)
    document.getElementById('selectLabel').style.color="black";
    document.getElementById('select').style.color="black";
    document.getElementById('clear').style.color="black";
    document.getElementById('save').style.fontWeight="bold";
    document.getElementById('select').style.fontWeight="bold";
    document.getElementById('clear').style.fontWeight="bold";
    document.getElementById('clear').style.borderColor="black";
    document.getElementById('save').style.borderColor="black";
    document.getElementById('select').style.borderColor="black";
    
}
else{
   // console.log("called cahngetheme black");
    
    //black background
    document.getElementById('save').style.color="white";
    if(document.getElementById('selectLabel')!=null)
    document.getElementById('selectLabel').style.color="white";
    document.getElementById('select').style.color="white";
    document.getElementById('clear').style.color="white";
    document.getElementById('save').style.fontWeight="bold";
    document.getElementById('select').style.fontWeight="bold";
    if(document.getElementById('selectLabel')!=null)
    document.getElementById('selectLabel').style.fontWeight="bold";
    document.getElementById('clear').style.fontWeight="bold";
    document.getElementById('clear').style.borderColor="white";
    document.getElementById('save').style.borderColor="white";
    document.getElementById('select').style.borderColor="white";
}
}
