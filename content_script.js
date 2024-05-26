// let counter = 1;
let clickedTexts = [];
let allCont = "";
let isImageOn=1;

const button=createButton("Save as file",generatePDF,'save');
//document.body.appendChild(button);

const selectAll=createButton("Select All",selectAllFunc,'select');
//selectAll.style.right="140px";
//document.body.appendChild(selectAll);

const clearBut=createButton("Clear",clear,'clear');
//clearBut.style.right="240px";
//document.body.appendChild(clearBut);

const iconsBack=document.createElement('div');
iconsBack.id="iconsBack";
iconsBack.appendChild(button);
iconsBack.appendChild(selectAll);
iconsBack.appendChild(clearBut);
// iconsBack.style.borderColor="white";
// iconsBack.style.border="2px solid";
// iconsBack.style.borderRadius="10px";
iconsBack.style.position="fixed";
iconsBack.style.display="flex";

//iconsBack.style.height="100px";
// iconsBack.style.transitionProperty="width";
// iconsBack.style.transitionDelay="2s";
// iconsBack.style.transitionDuration="2s";
iconsBack.style.width="300px";
iconsBack.style.bottom="105px";
iconsBack.style.right="73px";
iconsBack.style.justifyContent="space-evenly";

document.body.appendChild(iconsBack);
const img=createIcon(openButtons);
img.id='image';
img.onclick=function(){
    console.log("clicked button: "+isImageOn);
    openButtons(isImageOn);
    console.log("after Clieck"+isImageOn);
};
document.body.appendChild(img);
const link = document.createElement('link');

// Set the attributes for the link element
// link.rel = 'stylesheet';
// link.type = 'text/css';
// link.href = chrome.runtime.getURL("styles.css");
// document.head.appendChild(link);
function openButtons(){
    if(isImageOn===1){
        //document.getElementById('iconsBack').style.width="0px";
        document.getElementById('image').style.transform="rotate(90deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        document.getElementById('iconsBack').hidden=true;
        document.getElementById('save').hidden=true;
        document.getElementById('select').hidden=true;
        document.getElementById('clear').hidden=true; 
        isImageOn=0;
    }
    else{
        //document.getElementById('iconsBack').style.width="300px";
        document.getElementById("image").style.transform="rotate(0deg)";
        document.getElementById('image').style.transition="transform 0.5s ease";
        document.getElementById('iconsBack').hidden=false;
        document.getElementById('save').hidden=false;
        document.getElementById('select').hidden=false;
        document.getElementById('clear').hidden=false; 
        isImageOn=1;
    }
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
function generatePDF() {
    if (clickedTexts.length == 0) {
        alert("Please select at least one response");
        return;
    } else {
        alert("Your request has been downloaded successfully");
    }
    const now = new Date();

    // const year = now.getFullYear(); // Get the year (e.g., 2024)
    // const month = now.getMonth() + 1; // Get the month (0-11, add 1 to make it 1-12)
    // const day = now.getDate(); // Get the day of the month (1-31)

    // const hours = now.getHours(); // Get the hour (0-23)
    // const minutes = now.getMinutes(); // Get the minute (0-59)
    // const seconds = now.getSeconds(); // Get the second (0-59)

    // // Format the date and time components as needed
    // const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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

    
            // const doc = new jsPDF();
            // const margin = 10;
            // const pageHeight = doc.internal.pageSize.height ;

            // //doc.setProperties({width:screen.width*2});
            // const maxWidth = 2000; 
            // //doc.setPageSize({ width: maxWidth, height: Infinity });
            
            // const lines = doc.splitTextToSize(content, doc.internal.pageSize.width);
            // let y = margin;
            // doc.setFontSize(12);
            // lines.forEach(line => {
            //     if (y + 10 > pageHeight) {
                    
            //         doc.addPage();
            //         y = margin;
            //     }
            //     doc.text(line, 0, y);
            //     y += 10;
            // });
            // // doc.text(content,10,10);
            // doc.save("multi-page-text.pdf");
    a.click();
    document.body.removeChild(a);
}
let elements;
checkingSimult();
function checkingSimult(){
let targetNode = document.getElementsByClassName('flex flex-col text-sm');
//let targetNode = document.body;

console.log("t: "+targetNode);
if(targetNode.length<=0){
    const intervalId=setInterval(()=>{console.log("checking"+targetNode.length);
    if(targetNode.length>0){
        clearInterval(intervalId);
        checkElementAndAppendButton();
        const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback =  (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
            mutation.addedNodes.forEach(addedNode => {
                if (addedNode.className==='result-streaming markdown prose w-full break-words dark:prose-invert dark') {
                    // Call your function here
                    console.log("calling checkElemenet");
       
                    checkElementAndAppendButton();
                }
            });
     } 
     }
};
const observer = new MutationObserver(callback);
let currTar=document.getElementsByClassName("flex flex-col text-sm");
if(currTar[0]){
observer.observe(currTar[0], config);
console.log("observed"+currTar[0]);
}
else{
    console.log("cannot observe"+currTar[0]+" : "+currTar);
}
    }targetNode = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
},100);
}
}
let theLastButton=0;
async function checkElementAndAppendButton() {
    elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');

    console.log("leng: "+elements.length+" : the last"+theLastButton);
    if (elements.length > 0){
        for (let i = theLastButton; i < elements.length; i++) {
            
            const element = elements[i];
            const mainDiv = document.createElement('div');
            const div = document.createElement('div');
            const checkbox = document.createElement('input')
            checkbox.type="checkbox";
            //checkbox.textContent = ' Select ';
            checkbox.id = i;
            checkbox.addEventListener('click', clickedELement);
            const label = document.createElement('label')
            label.htmlFor=i;
            label.textContent="Select  ";
            div.appendChild(label);
            div.appendChild(checkbox);


            // const button2 = document.createElement('button')
            // button2.textContent = ' Copy ';
            // button2.id = i;
            // button2.style.border = '2px solid';
            // button2.style.borderRadius = '10px';
            // button2.style.borderColor = 'white';
            // button2.addEventListener('click', copyText);
            //  const div2 = document.createElement('div');

            // div2.style.margin = '10px';
            // div2.style.float = "right";
            // div2.appendChild(button2);
             mainDiv.appendChild(div);
            // mainDiv.appendChild(div2);

            div.style.float = "right";
            div.style.margin = '10px';


            // Append the button as a child of the found element
            element.parentNode.insertBefore(mainDiv, element);

            //element.appendChild(div);
            //console.log(element.textContent+" : ")
        } theLastButton=elements.length; 
    }
    else {
            console.log("No matching element found");
        }
    
}
// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
// document.head.appendChild(link);
function copyText(event) {
    let id = event.target.id;
    navigator.clipboard.writeText(elements[id].textContent).then(function() {
        alert("Successfully copied");
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });


}
// Call the function after a delay of 10 seconds
// while(document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark')!=null){
 //setInterval(checkElementAndAppendButton, 5000);
 checkElementAndAppendButton();
//  if (
//     document.readyState === "complete" 
//   ) {
//     checkElementAndAppendButton();
//   } else {
//     document.addEventListener("DOMContentLoaded", checkElementAndAppendButton);
//   }
  
let counter=0;
function clickedELement(event) {

    let id = event.target.id;
    //console.log(event.target.id+" clicked");
    navigator.clipboard.writeText(elements[id].textContent).then(function() {
        //   console.log('Text successfully copied to clipboard');
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
    if (event.target.checked) {
        allCont += event.target
        clickedTexts.push(event.target)
        getStructuredTextContent(elements[event.target.id]);
        //event.target.textContent = " " + (clickedTexts.indexOf(event.target) + 1) + " ";
        counter++;
    } else {
        //event.target.textContent = ' Select ';
        clickedTexts.splice(clickedTexts.indexOf(event.target), 1);
        toChangeNumber();
        counter--;
    }
    //console.log("THE CELID ......"+elements[id].textContent)

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
        console.log("Class:  " + node.className)
        if (node.className === "flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md") {
            result += '\n\n';
            return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
            result += node.textContent.trim();
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            const tag = node.tagName.toLowerCase();

            // console.log("Tag: "+node.className);
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
              console.log("else got: " + tag);
              if (tag !== 'div') {
                  flag = 0;
                  if (tag === "table") {
                      result += '\n' + convertHtmlTableToAscii(node.outerHTML);
                  } else {
                      result += node.textContent + " ";
                  }
              }

              // result+=" \n";
          }

          // if (!['pre', 'code'].includes(tag)) {
          // Only traverse child nodes for non-code elements
          if (flag == 1)
              Array.from(node.childNodes).forEach(traverse);
          // }
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

