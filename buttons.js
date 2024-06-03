function createButton(text,func,id){
const button = document.createElement('button');
button.textContent = text;
// button.style.position = 'fixed';
// button.style.bottom = '100px';
// button.style.right = '20px';
button.style.padding = '10px 20px';
button.style.border = '2px solid white';
button.style.borderRadius = '20px'; 
button.style.backgroundColor = 'tranparent'; 
button.style.color = '#fff';
button.id=id;
button.style.fontSize = '12px';
button.style.height="95%";
button.style.cursor = 'pointer';
button.onclick = func;
return button;
}


function createIcon(){
   const img= document.createElement('img');
   const button = document.createElement('button');
   img.src=chrome.runtime.getURL("chatgpt-icon.png");
   img.width=50;
   img.height=50;
   img.style.position = 'fixed';
   img.style.bottom = '100px';
   img.style.right = '20px';
      img.style.borderRadius="50px";
   return img;
}

