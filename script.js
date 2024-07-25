// add a task function 
// create tasksarray
// save tasksarray to local storage
// check if the task array is empty
// if the task array is not empty push the content to the task array and update the interface


// mark as done function
// clear completed function
// filtiration (active,compleated,all)
// dynamic text showing how many tasks left
const input = $(".form-control")
const body = $("body")
const todoElement = $("#todo-element") 
const group = $(".group")
const checkedItems = $(".task:checked");
const active = $(".active-filter")
const completed = $(".completed-filter")
const all = $(".all-filter")
let itemNum = 0;
let tasksArray = []
const clearcompleted =$(".clear-completed")
const remaining = $(".remaining")


// from JSON to string
getFromLocal()
if(localStorage.getItem("tasks")){
    tasksArray = JSON.parse(localStorage.getItem("tasks"))
    // markAsCompleted()
    let titles = tasksArray.map(task => task.title);
    let ids = tasksArray.map(task => task.id);
    let status = tasksArray.map(task => task.isCompleted)

    if(localStorage.getItem("task number")){
        // itemNum = JSON.parse(localStorage.getItem("task number"))
 
        loadingFromLocal(titles, status)
        remaining.html(`${itemNum} items remaining`)
      
        // addTaskToJson()
    
        removingFromUI()
        addTaskToJson()
        // markAsCompleted()
        updateEventListeners()
        
    }
    
}




// function to add tasks 
function addTaskToArray(tasktext){
    let taskObj = {
        "id": Date.now(),
        "title": tasktext,
        "isCompleted": false
    }
    tasksArray.push(taskObj)
    let itemNum = {
        "taskNum" : 0
    }
    

}
function addNumtoJson(){
    let taskNum = JSON.stringify(itemNum)
    window.localStorage.setItem("task number",taskNum)
   

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
    let task = tasksArray.find(task => task.id == taskId);
    
    // If the task exists, update its isCompleted property
    if (task) {
        
        task.isCompleted = isCompleted;
        addTaskToJson() 

         // Save the updated array to local storage
    }

}
function updateEventListeners() {
    $(".task").off("click").on("click", function() {
        let taskId = $(this).attr("id").replace("item", "");
        let isCompleted = $(this).prop("checked");
        let listItem = $(this).parent();
        listItem.toggleClass("checked", isCompleted);
        updateTaskCompletion(taskId, isCompleted);
    });
}

// load the previouse task that are not done from local storage and add them to user interface
function loadingFromLocal(prevTask, state){
    const warapper = document.querySelectorAll(".list-group-item")
    tasksArray.forEach((taskArr) =>{
        if (taskArr.isCompleted == false){
            let dynamiclist = $("<li></li>")
                dynamiclist.addClass("list-group-item")
                let input = $("<input>")
                input.attr("id", `item${itemNum}`);
                input.addClass("task")
                input.attr("type","checkbox")
                let label = $("<label></label>")
                label.attr("for",`item${itemNum}`)
                label.text(taskArr.title)
            
                dynamiclist.append(input)
                dynamiclist.append(label)
                group.append(dynamiclist)
                itemNum ++
                // markAsCompleted()
                removingFromUI()
                markAsCompleted();
                addTaskToJson()
               
                updateEventListeners()
                // clearCompleted()
              

                

        }
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
    itemNum ++
    remaining.html(`${itemNum} items remaining`)
    
    addTaskToArray(task)
    markAsCompleted();
    removingFromUI()
    addTaskToJson()
    addNumtoJson()
    updateEventListeners()
    


    
}

//check if the wrapper has checked calss and add them to an array to be cleared from the user interface
function clearCompleted(){
    const warapper = document.querySelectorAll(".list-group-item")
    const toBeCleared = []
    for(let i = 0; i< taskNum();i++){
        if (warapper[i].classList.contains("checked") ){
   
            toBeCleared.push(warapper[i])
            itemNum --
            remaining.html(`${itemNum} items remaining`)
           

            
        }
    }
    return toBeCleared

}

function taskNum(){
    const warapper = document.querySelectorAll(".list-group-item")
     return warapper.length

}


const tasks = document.querySelectorAll(".task")
// if the function is compleated, edit its class
function markAsCompleted(){
    const warapper = document.querySelectorAll(".list-group-item");
    const tasks = document.querySelectorAll(".task");
    let ids = tasksArray.map(task => task.id);
    tasks.forEach(function(task, index) {
        task.addEventListener("click", function() {
            // Add 'checked' class to the parent list item
            if (task.checked) {
                warapper[index].classList.add("checked");
                
                warapper[index].setAttribute("id",ids[index])
                console.log(warapper[index].id)
                updateTaskCompletion(warapper[index].id,true)
                addTaskToJson()
            } else {
                warapper[index].classList.remove("checked");
            }
        });
    });
}
function removeCompletedTasks() {
    // Filter tasks to exclude those with isCompleted set to true
    tasksArray = tasksArray.filter(task => !task.isCompleted);
    // Update local storage with the filtered array
    addTaskToJson();
}

// Call the function to remove completed tasks



const button = $(".btn-outline-secondary")
button.on("click",function(){
    addTask()
    input.val("")
    



})
markAsCompleted()
function removingFromUI(){
    clearcompleted.on("click",function(){
        const x = clearCompleted()

        // tasksArray.forEach((task),clearCompleted())
        x.forEach(function(taskcompleted){
            // updateTaskCompletion(taskcompleted.id,true)
            
            taskcompleted.remove()
    
   
            
            addNumtoJson()
        })
        removeCompletedTasks();
       
    
    })

}
updateEventListeners()