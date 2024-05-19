let counter=1;
let clickedTexts=[];
let allCont="";
const button = document.createElement('button');
button.textContent = 'Save as file';
//Apply styles to the button
button.style.position = 'fixed';
button.style.bottom = '100px';
button.style.right = '20px';
button.style.padding = '10px 20px';
button.style.border = '2px solid white'; 
button.style.borderRadius='20px';/* Button border */
button.style.backgroundColor = 'tranparent'; /* Transparent background */
button.style.color = '#fff'; /* White text color */
button.style.fontSize = '12px';
button.style.cursor = 'pointer';
button.onclick=generatePDF

// Append the button to the document body
document.body.appendChild(button);

function generatePDF() {
  if(clickedTexts.length==0){
    alert("PLEASE SELECT ATLEAST ONE RESPONSE");
    return;
  }
  else{
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

function checkElementAndAppendButton() {
  elements = document.getElementsByClassName('markdown prose w-full break-words dark:prose-invert dark');
  if(elements.length>0)
  for(let i=0; i<elements.length; i++) {
  const element = elements[i];
    // Create a new button element
const mainDiv = document.createElement('div');

const div = document.createElement('div');
const button = document.createElement('button')
button.textContent = ' Select ';
// button.textContent.padding='10px'
// button.style.margin='10px'
// button.style.color = '#fff'
button.id=i;
// button.style.backgroundColor = 'black'
button.style.border = '2px solid'
button.style.borderRadius='10px'
button.style.borderColor='white'
// button.style.cursor = 'pointer'

button.addEventListener('click', clickedELement);
///
// Append the button to the div
div.appendChild(button);
const button2 = document.createElement('button')
button2.textContent = ' Copy ';
// button2.textContent.padding='10px'
// button2.style.margin='10px'
// button2.style.color = '#fff'
 button2.id=i;
button2.style.border = '2px solid'
button2.style.borderRadius='10px'
button2.style.borderColor='white'
button2.addEventListener('click', copyText);
// Append the button to the div
const div2 = document.createElement('div');

div2.style.margin='10px';
div2.style.float="right";
div2.appendChild(button2);
mainDiv.appendChild(div);
mainDiv.appendChild(div2);

div.style.float="right";
div.style.margin='10px';


    // Append the button as a child of the found element
    element.parentNode.insertBefore(mainDiv, element);
    
    //element.appendChild(div);
    //console.log(element.textContent+" : ")
  } else {
    console.log("No matching element found");
  }
}
// const link = document.createElement('link');
// link.rel = 'stylesheet';
// link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
// document.head.appendChild(link);
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
  if(event.target.textContent===' Select '){
    allCont+=event.target
    clickedTexts.push(event.target)
    event.target.textContent=" "+(clickedTexts.indexOf(event.target)+1)+" ";
    counter++;
  }
  else{
    event.target.textContent=' Select ';
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
