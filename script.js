// add a task function 
// create tasksarray
// save tasksarray to local storage
// check if the task array is empty
// if the task array is not empty push the content to the task array and update the interface


// mark as done function
// clear completed function
// filtiration (active,compleated,all)
// dynamic text showing how many tasks left

const body = $("body")
const todoElement = $("#todo-element") 
const group = $(".group")
const checkedItems = $(".task:checked");
const active = $(".active-filter")
const completed = $(".completed-filter")
const all = $(".all-filter")
let itemNum = 2;
let tasksArray = []


// from JSON to string
getFromLocal()
if(localStorage.getItem("tasks")){
    tasksArray = JSON.parse(localStorage.getItem("tasks"))
    let titles = tasksArray.map(task => task.title);
    console.log(titles)
    let ids = tasksArray.map(task => task.id);
    // ids.forEach((id)=>{
    //     title.forEach(())
    // })
    loadingFromLocal(titles)

    
}



// function to add tasks 
function addTaskToArray(tasktext){
    let taskObj = {
        "id": Date.now(),
        "title": tasktext,
        "isCompleted": false
    }
    tasksArray.push(taskObj)

}
function addTaskToJson(){
    let stringTask = JSON.stringify(tasksArray)
    window.localStorage.setItem("tasks",stringTask)
   
}
function getFromLocal(){
    const data = window.localStorage.getItem("tasks")
    if(data){
        const tasks = JSON.parse(data)
       
    }

}
function updateTaskCompletion(taskId, isCompleted) {
    // Find the task object by its unique ID
    let task = tasksArray.find(task => task.id === taskId);
    
    // If the task exists, update its isCompleted property
    if (task) {
        task.isCompleted = isCompleted;
        addTaskToJson(); // Save the updated array to local storage
    }
}

// load the previouse task that are not done from local storage and add them to user interface
function loadingFromLocal(prevTask){
    prevTask.forEach((task) =>{
           
        let dynamiclist = $("<li></li>")
        dynamiclist.addClass("list-group-item")
        let input = $("<input>")
        input.attr("id", `item${itemNum}`);
        input.addClass("task")
        input.attr("type","checkbox")
        let label = $("<label></label>")
        label.attr("for",`item${itemNum}`)
        label.text(task)
    
        dynamiclist.append(input)
        dynamiclist.append(label)
        group.append(dynamiclist)
       })
}

// adding a new task 
function addTask(){

    let task = $("input").val() 
    let dynamiclist = $("<li></li>")
    dynamiclist.addClass("list-group-item")
    let input = $("<input>")
    input.attr("id", `item${itemNum}`);
    input.addClass("task")
    input.attr("type","checkbox")
    let label = $("<label></label>")
    label.attr("for",`item${itemNum}`)
    label.text(task)

    dynamiclist.append(input)
    dynamiclist.append(label)
    group.append(dynamiclist)
    
    addTaskToArray(task)
    markAsCompleted();
    addTaskToJson()


    
}

//check if the wrapper has checked calss and add them to an array to be cleared from the user interface
function clearCompleted(){
    const warapper = document.querySelectorAll(".list-group-item")
    const toBeCleared = []
    for(let i = 0; i< taskNum();i++){
        if (warapper[i].classList.contains("checked") ){
            toBeCleared.push(warapper[i])
            // updateTaskCompletion(tasksArray.id,true)
        }
    }
    return toBeCleared

}

function taskNum(){
    const warapper = document.querySelectorAll(".list-group-item")
     return warapper.length

}

const clearcompleted =$(".clear-completed")
const tasks = document.querySelectorAll(".task")
// if the function is compleated, edit its class
function markAsCompleted(){
    const warapper = document.querySelectorAll(".list-group-item");
    const tasks = document.querySelectorAll(".task");
    tasks.forEach(function(task, index) {
        task.addEventListener("click", function() {
            // Add 'checked' class to the parent list item
            if (task.checked) {
                warapper[index].classList.add("checked");
            
            } else {
                warapper[index].classList.remove("checked");
            }
        });
    });
}


const button = $(".btn-outline-secondary")
button.on("click",function(){
    
    addTask()
    
    itemNum ++

})
markAsCompleted()

clearcompleted.on("click",function(){
    clearCompleted().forEach(function(taskcompleted){
        
        taskcompleted.remove()
    })
   

})

console.log(tasksArray)