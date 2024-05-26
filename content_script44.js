// // let counter = 1;
// let clickedTexts = [];
// let allCont = "";
// const button = document.createElement('button');
// button.textContent = 'Save as file';
// // Apply styles to the button
// button.style.position = 'fixed';
// button.style.bottom = '100px';
// button.style.right = '20px';
// button.style.padding = '10px 20px';
// button.style.border = '2px solid white';
// button.style.borderRadius = '20px'; /* Button border */
// button.style.backgroundColor = 'tranparent'; /* Transparent background */
// button.style.color = '#fff'; /* White text color */
// button.style.fontSize = '12px';
// button.style.cursor = 'pointer';
// button.onclick = generatePDF;

// // Append the button to the document body
// document.body.appendChild(button);

// function generatePDF() {
//     if (clickedTexts.length == 0) {
//         alert("PLEASE SELECT AT LEAST ONE RESPONSE");
//         return;
//     } else {
//         alert("Your request has been downloaded successfully");
//     }
//     const now = new Date();

//     // Get the current date components
//     const year = now.getFullYear(); // Get the year (e.g., 2024)
//     const month = now.getMonth() + 1; // Get the month (0-11, add 1 to make it 1-12)
//     const day = now.getDate(); // Get the day of the month (1-31)

//     // Get the current time components
//     const hours = now.getHours(); // Get the hour (0-23)
//     const minutes = now.getMinutes(); // Get the minute (0-59)
//     const seconds = now.getSeconds(); // Get the second (0-59)

//     // Format the date and time components as needed
//     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//     let content = "";
//     let count = 1;
//     for (let i = 0; i < clickedTexts.length; i++) {
//         content += count + ".   ";
//         content += getStructuredTextContent(elements[clickedTexts[i].id]);
//         if (content.includes("Copy code")) {
//             content = content.replace(/Copy code/g, "\n");
//         }
//         content += "\n\n\n";
//         count++;
//     }
//     const file = new Blob([content], { type: 'text/plain' });

//     // Create a link element
//     const a = document.createElement("a");

//     // Set the Blob as the href attribute of the link
//     a.href = URL.createObjectURL(file);

//     // Set the filename for the download
//     //a.download = formattedDateTime + ".txt";

//     // Append the link to the document body
//     document.body.appendChild(a);
    
//             const doc = new jsPDF();
//             const margin = 10;
//             const pageHeight = doc.internal.pageSize.height - margin * 2;
            
//             const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - margin * 2);
//             let y = margin;

//             lines.forEach(line => {
//                 if (y + 10 > pageHeight) {
//                     doc.addPage();
//                     y = margin;
//                 }
//                 doc.text(line, margin, y);
//                 y += 10;
//             });

//             doc.save("multi-page-text.pdf");
//     // Programmatically click the link to trigger the download
//     //a.click();

//     // Clean up by removing the link
//     document.body.removeChild(a);
// }
// let elements;

// function checkElementAndAppendButton() {
//     elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
//     if (elements.length > 0)
//         for (let i = 0; i < elements.length; i++) {
//             const element = elements[i];
//             // Create a new button element
//             const mainDiv = document.createElement('div');

//             const div = document.createElement('div');
//             const button = document.createElement('button')
//             button.textContent = ' Select ';
//             button.id = i;
//             button.style.border = '2px solid';
//             button.style.borderRadius = '10px';
//             button.style.borderColor = 'white';
//             button.addEventListener('click', clickedELement);
//             ///
//             // Append the button to the div
//             div.appendChild(button);
//             const button2 = document.createElement('button')
//             button2.textContent = ' Copy ';
//             button2.id = i;
//             button2.style.border = '2px solid';
//             button2.style.borderRadius = '10px';
//             button2.style.borderColor = 'white';
//             button2.addEventListener('click', copyText);
//             // Append the button to the div
//             const div2 = document.createElement('div');

//             div2.style.margin = '10px';
//             div2.style.float = "right";
//             div2.appendChild(button2);
//             mainDiv.appendChild(div);
//             mainDiv.appendChild(div2);

//             div.style.float = "right";
//             div.style.margin = '10px';


//             // Append the button as a child of the found element
//             element.parentNode.insertBefore(mainDiv, element);

//             //element.appendChild(div);
//             //console.log(element.textContent+" : ")
//         } else {
//             console.log("No matching element found");
//         }
// }
// // const link = document.createElement('link');
// // link.rel = 'stylesheet';
// // link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
// // document.head.appendChild(link);
// function copyText(event) {
//     let id = event.target.id;
//     navigator.clipboard.writeText(elements[id].textContent).then(function() {
//         alert("Successfully copied");
//     }).catch(function(err) {
//         console.error('Could not copy text: ', err);
//     });


// }
// // Call the function after a delay of 10 seconds
// // while(document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark')!=null){
// setTimeout(checkElementAndAppendButton, 5000);

// function clickedELement(event) {

//     let id = event.target.id;
//     //console.log(event.target.id+" clicked");
//     navigator.clipboard.writeText(elements[id].textContent).then(function() {
//         //   console.log('Text successfully copied to clipboard');
//     }).catch(function(err) {
//         console.error('Could not copy text: ', err);
//     });
//     if (event.target.textContent === ' Select ') {
//         allCont += event.target
//         clickedTexts.push(event.target)
//         getStructuredTextContent(elements[event.target.id]);
//         event.target.textContent = " " + (clickedTexts.indexOf(event.target) + 1) + " ";
//         counter++;
//     } else {
//         event.target.textContent = ' Select ';
//         clickedTexts.splice(clickedTexts.indexOf(event.target), 1);
//         toChangeNumber();
//         counter--;
//     }
//     //console.log("THE CELID ......"+elements[id].textContent)

// }

// function toChangeNumber() {
//     for (let i = 0; i < clickedTexts.length; i++) {
//         clickedTexts[i].textContent = " " + (i + 1) + " ";
//     }
// }


// function getStructuredTextContent(element) {
//     let result = '';

//     function traverse(node) {
//         let flag = 1;
//         console.log("Class:  " + node.className)
//         if (node.className === "flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md") {
//             result += '\n\n';
//             return;
//         }

//         if (node.nodeType === Node.TEXT_NODE) {
//             result += node.textContent.trim();
//         } else if (node.nodeType === Node.ELEMENT_NODE) {
//             const tag = node.tagName.toLowerCase();

//             // console.log("Tag: "+node.className);
//             if (tag === 'p') {
//                 result += '\n';
//             } else if (tag === 'li') {
//               result += '\n  \t';
//               // result+="<liiiiii>";
//           } else if (tag === 'h3') {
//               result += '\n\n### ';
//           } else if (tag === 'ol' || tag === 'ul') {
//               // Array.from(node.children).forEach((child, index) => {
//               result += '\n\t';
//               // });
//           } else if (tag === 'pre') {} else {
//               console.log("else got: " + tag);
//               if (tag !== 'div') {
//                   flag = 0;
//                   if (tag === "table") {
//                       result += '\n' + convertHtmlTableToAscii(node.outerHTML);
//                   } else {
//                       result += node.textContent + " ";
//                   }
//               }

//               // result+=" \n";
//           }

//           // if (!['pre', 'code'].includes(tag)) {
//           // Only traverse child nodes for non-code elements
//           if (flag == 1)
//               Array.from(node.childNodes).forEach(traverse);
//           // }
//       }
//   }



//   traverse(element, 0);
//   return result.trim();
// }

// function convertHtmlTableToAscii(htmlTable) {
//   const doc = new DOMParser().parseFromString(htmlTable, 'text/html');
//   const table = doc.querySelector('table');
//   const rows = table.querySelectorAll('tr');
//   const columnWidths = [];
//   const asciiRows = [];

//   // Calculate maximum width for each column
//   rows.forEach(row => {
//       const cells = row.querySelectorAll('th, td');
//       cells.forEach((cell, index) => {
//           const content = cell.textContent.trim();
//           columnWidths[index] = Math.max(columnWidths[index] || 0, content.length);
//       });
//   });

//   // Generate ASCII table rows
//   rows.forEach(row => {
//       const cells = row.querySelectorAll('th, td');
//       const asciiCells = [];

//       cells.forEach((cell, index) => {
//           const content = cell.textContent.trim().padEnd(columnWidths[index], ' ');
//           asciiCells.push(content);
//       });

//       asciiRows.push('| ' + asciiCells.join(' | ') + ' |');
//   });

//   // Generate separator row
//   const separator = '+' + columnWidths.map(width => '-'.repeat(width + 2)).join('+') + '+';

//   // Assemble the ASCII table
//   const asciiTable = [separator, ...asciiRows, separator].join('\n');

//   return asciiTable;
// }

// Dynamically load the html2canvas library
// const script = document.createElement('script');
// script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
// document.head.appendChild(script);

// let counter = 1;
// let clickedTexts = [];
// let allCont = "";
// const button = document.createElement('button');
// button.textContent = 'Save as file';
// // Apply styles to the button
// button.style.position = 'fixed';
// button.style.bottom = '100px';
// button.style.right = '20px';
// button.style.padding = '10px 20px';
// button.style.border = '2px solid white';
// button.style.borderRadius = '20px'; /* Button border */
// button.style.backgroundColor = 'transparent'; /* Transparent background */
// button.style.color = '#fff'; /* White text color */
// button.style.fontSize = '12px';
// button.style.cursor = 'pointer';
// button.onclick = generatePDF;

// // Append the button to the document body
// document.body.appendChild(button);

// function generatePDF() {
//     if (clickedTexts.length == 0) {
//         alert("PLEASE SELECT AT LEAST ONE RESPONSE");
//         return;
//     } else {
//         alert("Your request has been downloaded successfully");
//     }
//     const now = new Date();

//     // Get the current date components
//     const year = now.getFullYear(); // Get the year (e.g., 2024)
//     const month = now.getMonth() + 1; // Get the month (0-11, add 1 to make it 1-12)
//     const day = now.getDate(); // Get the day of the month (1-31)

//     // Get the current time components
//     const hours = now.getHours(); // Get the hour (0-23)
//     const minutes = now.getMinutes(); // Get the minute (0-59)
//     const seconds = now.getSeconds(); // Get the second (0-59)

//     // Format the date and time components as needed
//     const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

//     let content = "";
//     let count = 1;
//     for (let i = 0; i < clickedTexts.length; i++) {
//         content += count + ".   ";
//         content += getStructuredTextContent(elements[clickedTexts[i].id]);
//         if (content.includes("Copy code")) {
//             content = content.replace(/Copy code/g, "\n");
//         }
//         content += "\n\n\n";
//         count++;
//     }
//     const file = new Blob([content], { type: 'text/plain' });

//     // Create a link element
//     const a = document.createElement("a");

//     // Set the Blob as the href attribute of the link
//     a.href = URL.createObjectURL(file);

//     // Set the filename for the download
//     //a.download = formattedDateTime + ".txt";

//     // Append the link to the document body
//     document.body.appendChild(a);

//     const doc = new jsPDF();
//     const margin = 10;
//     const pageHeight = doc.internal.pageSize.height - margin * 2;

//     const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - margin * 2);
//     let y = margin;

//     lines.forEach(line => {
//         if (y + 10 > pageHeight) {
//             doc.addPage();
//             y = margin;
//         }
//         doc.text(line, margin, y);
//         y += 10;
//     });

//     doc.save("multi-page-text.pdf");
//     // Programmatically click the link to trigger the download
//     //a.click();

//     // Clean up by removing the link
//     document.body.removeChild(a);
// }
// let elements;

// function checkElementAndAppendButton() {
//     elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
//     if (elements.length > 0) {
//         for (let i = 0; i < elements.length; i++) {
//             const element = elements[i];
//             // Create a new button element
//             const mainDiv = document.createElement('div');

//             const div = document.createElement('div');
//             const button = document.createElement('button')
//             button.textContent = ' Select ';
//             button.id = i;
//             button.style.border = '2px solid';
//             button.style.borderRadius = '10px';
//             button.style.borderColor = 'white';
//             button.addEventListener('click', clickedELement);
//             // Append the button to the div
//             div.appendChild(button);

//             const button2 = document.createElement('button');
//             button2.textContent = ' Copy ';
//             button2.id = i;
//             button2.style.border = '2px solid';
//             button2.style.borderRadius = '10px';
//             button2.style.borderColor = 'white';
//             button2.addEventListener('click', copyText);
//             // Append the button to the div
//             const div2 = document.createElement('div');
//             div2.style.margin = '10px';
//             div2.style.float = "right";
//             div2.appendChild(button2);

//             const button3 = document.createElement('button');
//             button3.textContent = ' Copy as Image ';
//             button3.id = i;
//             button3.style.border = '2px solid';
//             button3.style.borderRadius = '10px';
//             button3.style.borderColor = 'white';
//             button3.addEventListener('click', copyTextAsImage);
//             // Append the button to the div
//             const div3 = document.createElement('div');
//             div3.style.margin = '10px';
//             div3.style.float = "right";
//             div3.appendChild(button3);

//             mainDiv.appendChild(div);
//             mainDiv.appendChild(div2);
//             mainDiv.appendChild(div3);

//             div.style.float = "right";
//             div.style.margin = '10px';

//             // Append the button as a child of the found element
//             element.parentNode.insertBefore(mainDiv, element);
//         }
//     } else {
//         console.log("No matching element found");
//     }
// }

// function copyText(event) {
//     let id = event.target.id;
//     navigator.clipboard.writeText(elements[id].textContent).then(function() {
//         alert("Successfully copied");
//     }).catch(function(err) {
//         console.error('Could not copy text: ', err);
//     });
// }

// function copyTextAsImage(event) {
//     let id = event.target.id;
//     let element = elements[id];

//     html2canvas(element).then(function(canvas) {
//         canvas.toBlob(function(blob) {
//             navigator.clipboard.write([
//                 new ClipboardItem({ 'image/png': blob })
//             ]).then(function() {
//                 alert("Image copied to clipboard successfully.");
//             }, function(error) {
//                 console.error('Unable to copy image to clipboard:', error);
//             });
//         }, 'image/png');
//     });
// }

// // Call the function after a delay of 5 seconds
// setTimeout(checkElementAndAppendButton, 5000);

// function clickedELement(event) {
//     let id = event.target.id;
//     navigator.clipboard.writeText(elements[id].textContent).then(function() {
//         // Text successfully copied to clipboard
//     }).catch(function(err) {
//         console.error('Could not copy text: ', err);
//     });
//     if (event.target.textContent === ' Select ') {
//         clickedTexts.push(event.target);
//         getStructuredTextContent(elements[event.target.id]);
//         event.target.textContent = " " + (clickedTexts.indexOf(event.target) + 1) + " ";
//     } else {
//         event.target.textContent = ' Select ';
//         clickedTexts.splice(clickedTexts.indexOf(event.target), 1);
//         toChangeNumber();
//     }
// }

// function toChangeNumber() {
//     for (let i = 0; i < clickedTexts.length; i++) {
//         clickedTexts[i].textContent = " " + (i + 1) + " ";
//     }
// }

// function getStructuredTextContent(element) {
//     let result = '';

//     function traverse(node) {
//         let flag = 1;
//         if (node.className === "flex items-center relative text-token-text-secondary bg-token-main-surface-secondary px-4 py-2 text-xs font-sans justify-between rounded-t-md") {
//             result += '\n\n';
//             return;
//         }

//         if (node.nodeType === Node.TEXT_NODE) {
//             result += node.textContent.trim();
//         } else if (node.nodeType === Node.ELEMENT_NODE) {
//             const tag = node.tagName.toLowerCase();

//             if (tag === 'p') {
//                 result += '\n';
//             } else if (tag === 'li') {
//                 result += '\n  \t';
//             } else if (tag === 'h3') {
//                 result += '\n\n### ';
//             } else if (tag === 'ol' || tag === 'ul') {
//                 result += '\n\t';
//             } else if (tag === 'pre') {
//             } else {
//                 if (tag !== 'div') {
//                     flag = 0;
//                     if (tag === "table") {
//                         result += '\n' + convertHtmlTableToAscii(node.outerHTML);
//                     } else {
//                         result += node.textContent + " ";
//                     }
//                 }
//             }

//             if (flag == 1)
//                 Array.from(node.childNodes).forEach(traverse);
//         }
//     }

//     traverse(element, 0);
//     return result.trim();
// }

// function convertHtmlTableToAscii(htmlTable) {
//     const doc = new DOMParser().parseFromString(htmlTable, 'text/html');
//     const table = doc.querySelector('table');

//     if (!table) {
//         return '';
//     }

//     const rows = table.rows;
//     const colWidths = [];

//     // Calculate the width of each column
//     for (let row of rows) {
//         Array.from(row.cells).forEach((cell, index) => {
//             const cellText = cell.textContent.trim();
//             colWidths[index] = Math.max(colWidths[index] || 0, cellText.length);
//         });
//     }

//     const result = [];

//     // Create the ASCII table
//     for (let row of rows) {
//         const rowText = Array.from(row.cells).map((cell, index) => {
//             const cellText = cell.textContent.trim();
//             return cellText.padEnd(colWidths[index], ' ');
//         }).join(' | ');

//         result.push(rowText);
//     }

//     return result.join('\n');
// }


// const script = document.createElement('script');
// script.src = 'html2canvas.min.js'; // Assuming html2canvas.min.js is in the same directory
// document.head.appendChild(script);

let counter = 1;
let clickedTexts = [];
let allCont = "";
const button = document.createElement('button');
button.textContent = 'Save as file';
// Apply styles to the button
button.style.position = 'fixed';
button.style.bottom = '100px';
button.style.right = '20px';
button.style.padding = '10px 20px';
button.style.border = '2px solid white';
button.style.borderRadius = '20px'; /* Button border */
button.style.backgroundColor = 'transparent'; /* Transparent background */
button.style.color = '#fff'; /* White text color */
button.style.fontSize = '12px';
button.style.cursor = 'pointer';
button.onclick = generatePDF;

// Append the button to the document body
document.body.appendChild(button);

function generatePDF() {
    if (clickedTexts.length == 0) {
        alert("PLEASE SELECT AT LEAST ONE RESPONSE");
        return;
    } else {
        alert("Your request has been downloaded successfully");
    }
    const now = new Date();

    // Get the current date components
    const year = now.getFullYear(); // Get the year (e.g., 2024)
    const month = now.getMonth() + 1; // Get the month (0-11, add 1 to make it 1-12)
    const day = now.getDate(); // Get the day of the month (1-31)

    // Get the current time components
    const hours = now.getHours(); // Get the hour (0-23)
    const minutes = now.getMinutes(); // Get the minute (0-59)
    const seconds = now.getSeconds(); // Get the second (0-59)

    // Format the date and time components as needed
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

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

    // Create a link element
    const a = document.createElement("a");

    // Set the Blob as the href attribute of the link
    a.href = URL.createObjectURL(file);

    // Set the filename for the download
    //a.download = formattedDateTime + ".txt";

    // Append the link to the document body
    document.body.appendChild(a);

    const doc = new jsPDF();
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height - margin * 2;

    const lines = doc.splitTextToSize(content, doc.internal.pageSize.width - margin * 2);
    let y = margin;

    lines.forEach(line => {
        if (y + 10 > pageHeight) {
            doc.addPage();
            y = margin;
        }
        doc.text(line, margin, y);
        y += 10;
    });

    doc.save("multi-page-text.pdf");
    // Programmatically click the link to trigger the download
    //a.click();

    // Clean up by removing the link
    document.body.removeChild(a);
}
let elements;

function checkElementAndAppendButton() {
    elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
    if (elements.length > 0) {
        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];
            // Create a new button element
            const mainDiv = document.createElement('div');

            const div = document.createElement('div');
            const button = document.createElement('button')
            button.textContent = ' Select ';
            button.id = i;
            button.style.border = '2px solid';
            button.style.borderRadius = '10px';
            button.style.borderColor = 'white';
            button.addEventListener('click', clickedELement);
            // Append the button to the div
            div.appendChild(button);

            const button2 = document.createElement('button');
            button2.textContent = ' Copy ';
            button2.id = i;
            button2.style.border = '2px solid';
            button2.style.borderRadius = '10px';
            button2.style.borderColor = 'white';
            button2.addEventListener('click', copyText);
            // Append the button to the div
            const div2 = document.createElement('div');
            div2.style.margin = '10px';
            div2.style.float = "right";
            div2.appendChild(button2);

            const button3 = document.createElement('button');
            button3.textContent = ' Copy as Image ';
            button3.id = i;
            button3.style.border = '2px solid';
            button3.style.borderRadius = '10px';
            button3.style.borderColor = 'white';
            button3.addEventListener('click', copyTextAsImage);
            // Append the button to the div
            const div3 = document.createElement('div');
            div3.style.margin = '10px';
            div3.style.float = "right";
            div3.appendChild(button3);

            mainDiv.appendChild(div);
            mainDiv.appendChild(div2);
            mainDiv.appendChild(div3);

            div.style.float = "right";
            div.style.margin = '10px';

            // Append the button as a child of the found element
            element.parentNode.insertBefore(mainDiv, element);
        }
    } else {
        console.log("No matching element found");
    }
}

function copyText(event) {
    let id = event.target.id;
    // navigator.clipboard.writeText(elements[id].textContent).then(function() {
    //     alert("Successfully copied");
    // }).catch(function(err) {
    //     console.error('Could not copy text: ', err);
    // });
    copyTextAsImage(event);
}

function copyTextAsImage(event) {
    let id = event.target.id;
    let element = elements[id];
    console.log("the fetched val is"+element.textContent);
        
    html2canvas(element).then(function(canvas) {
        // canvas.toBlob(function(blob) {
        //     navigator.clipboard.write([
        //         new ClipboardItem({ 'image/png': blob })
        //     ]).then(function() {
        //         alert("Image copied to clipboard successfully.");
        //     }, function(error) {
        //         console.error('Unable to copy image to clipboard:', error);
        //     });
        // }, 'image/png');
        const imgData = canvas.toDataURL("image/png",0.9);
        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'capture.png';

        // Append the link to the body (required for Firefox)
        document.body.appendChild(link);

        // Trigger a click on the link to start the download
        link.click();

        // Remove the link from the document
        
    });
}

// Call the function after a delay of 5 seconds
setTimeout(checkElementAndAppendButton, 5000);

function clickedELement(event) {
    let id = event.target.id;
    navigator.clipboard.writeText(elements[id].textContent).then(function() {
        // Text successfully copied to clipboard
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
    if (event.target.textContent === ' Select ') {
        clickedTexts.push(event.target);
        getStructuredTextContent(elements[event.target.id]);
        event.target.textContent = " " + (clickedTexts.indexOf(event.target) + 1) + " ";
    } else {
        event.target.textContent = ' Select ';
        clickedTexts.splice(clickedTexts.indexOf(event.target), 1);
        toChangeNumber();
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
                result += '\n  \t';
            } else if (tag === 'h3') {
                result += '\n\n### ';
            } else if (tag === 'ol' || tag === 'ul') {
                result += '\n\t';
            } else if (tag === 'pre') {
            } else {
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

    if (!table) {
        return '';
    }

    const rows = table.rows;
    const colWidths = [];

    // Calculate the width of each column
    for (let row of rows) {
        Array.from(row.cells).forEach((cell, index) => {
            const cellText = cell.textContent.trim();
            colWidths[index] = Math.max(colWidths[index] || 0, cellText.length);
        });
    }

    const result = [];

    // Create the ASCII table
    for (let row of rows) {
        const rowText = Array.from(row.cells).map((cell, index) => {
            const cellText = cell.textContent.trim();
            return cellText.padEnd(colWidths[index], ' ');
        }).join(' | ');

        result.push(rowText);
    }

    return result.join('\n');
}


