let counter=1;
let allCont="";
const button = document.createElement('button');
button.textContent = 'Save';
// Apply styles to the button
button.style.position = 'fixed';
button.style.bottom = '100px';
button.style.right = '20px';
button.style.padding = '10px 20px';
button.style.border = '2px solid white'; /* Button border */
button.style.backgroundColor = 'transparent'; /* Transparent background */
button.style.color = '#fff'; /* White text color */
button.style.fontSize = '16px';
button.style.cursor = 'pointer';
button.onclick=generatePDF

// Append the button to the document body
document.body.appendChild(button);

function generatePDF() {
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
  console.log("calling that")
  console.log(clickedTexts)
  // Send a message to the background page or popup page
  let content = "";
  let count=1;
  for(let i=0; i<clickedTexts.length; i++){
    content+=count+".   ";
    content+=elements[clickedTexts[i].id].textContent;
    content+="\n\n\n";
    count++;
  }
  const file = new Blob([content], { type: 'text/plain' });

  // Create a link element
  const a = document.createElement("a");

  // Set the Blob as the href attribute of the link
  a.href = URL.createObjectURL(file);

  // Set the filename for the download
  a.download = formattedDateTime+".txt";

  // Append the link to the document body
  document.body.appendChild(a);

  // Programmatically click the link to trigger the download
  a.click();

  // Clean up by removing the link
  document.body.removeChild(a);console.log("Hope so called him")
 }   
let elements
let clickedTexts=[]
function checkElementAndAppendButton() {
  // Find all elements with the specified class name
  elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
  // if(elements==null){
  //   elements=document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark')
  // }

  // Check if any matching element is found
  if(elements.length>0)
  for(let i=0; i<elements.length; i++) {
    // Select the first matching element
    const element = elements[i];

    // Create a new button element
    const div = document.createElement('div');

div.style.padding = '5px';
const button = document.createElement('button')
button.textContent = ' Copy Response ';
button.textContent.padding='10px'
button.style.margin='10px'
button.style.color = '#fff'
button.id=i;
button.style.backgroundColor = 'black'
button.style.border = '2px solid blue'
button.style.borderRadius='10px'
button.style.borderColor='white'
button.style.cursor = 'pointer'
button.addEventListener('click', clickedELement);
// Append the button to the div
div.appendChild(button);
const button2 = document.createElement('button')
button2.textContent = 'Copy to Clipboard';
button2.textContent.padding='10px'
button2.style.margin='10px'
button2.style.color = '#fff'
button2.id=i;
button2.style.backgroundColor = 'black'
button2.style.border = '2px solid blue'
button2.style.borderRadius='10px'
button2.style.borderColor='white'
button2.style.cursor = 'pointer'
button2.addEventListener('click', copyText);
// Append the button to the div
const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'icon');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.innerHTML = `
      <path fill="none" d="M0 0h24v24H0V0z"/>
      <path d="M17 1H7c-1.1 0-1.99.9-1.99 2L5 21c0 1.1.89 2 1.99 2H17c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 18H7V4h10v15z"/>
    `;

    // Append the icon to the desired location
    // Add click event listener to the icon
    svg.addEventListener('click', copyText);


div.appendChild(svg);

    
    // Append the button as a child of the found element
    element.parentNode.insertBefore(div, element);
    //element.appendChild(div);
    //console.log(element.textContent+" : ")
  } else {
    console.log("No matching element found");
  }
}
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
document.head.appendChild(link);
function copyText(event){
  let id = event.target.id;
  console.log(event.target.id+" clicked");
  navigator.clipboard.writeText(elements[id].textContent).then(function() {
    console.log('Text successfully copied to clipboard');
    event.target.textContent="Copy to ClipBoard"
}).catch(function(err) {
    console.error('Could not copy text: ', err);
});

 
}
// Call the function after a delay of 10 seconds
//while(document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark')!=null){
setTimeout(checkElementAndAppendButton, 5000);

function clickedELement(event){

  let id = event.target.id;
  console.log(event.target.id+" clicked");
  navigator.clipboard.writeText(elements[id].textContent).then(function() {
    console.log('Text successfully copied to clipboard');
}).catch(function(err) {
    console.error('Could not copy text: ', err);
});
  if(event.target.textContent===' Copy Response '){
    allCont+=event.target
    clickedTexts.push(event.target)
    event.target.textContent=" "+(clickedTexts.indexOf(event.target)+1)+" ";
    counter++;
  }
  else{
    event.target.textContent=' Copy Response ';
    clickedTexts.splice(clickedTexts.indexOf(event.target),1);
    toChangeNumber();
    counter--;
  }
console.log(elements[id].textContent)

}
function toChangeNumber(){
  for(let i=0; i<clickedTexts.length; i++){
    clickedTexts[i].textContent=" "+(i+1)+" ";
  }
}
//}
