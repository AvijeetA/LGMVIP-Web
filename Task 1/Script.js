const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const pendingTasksNumb = document.querySelector(".pendingTasks");
myNodelist = document.getElementsByTagName("LI");

inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; 
  if(userEnteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
  }
}

showTasks(); 

addBtn.onclick = ()=>{ 
  let userEnteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData);  
  }
  listArray.push(userEnteredValue); 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
  addBtn.classList.remove("active"); 
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
 
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="material-icons">delete</i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
}

var listArray = document.querySelector('ul');
listArray.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}

deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}