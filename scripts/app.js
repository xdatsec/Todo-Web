let TaskStorage = JSON.parse(localStorage.getItem("tasks")) || [];
const modalElement = document.getElementById("addtask");
const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
const cureentdate = new Date()
let tabhandle = 0;
const ActionsContainer = document.querySelector('.btnactions');
let ContainerStatus = 0;
const  daysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const difference = Math.abs(d2 - d1);

    return Math.floor(difference / (1000 * 60 * 60 * 24));
}


const pushtask = (taskName, taskDescription) => {

    let id = TaskStorage.length;
    if(id != 0)
        id = TaskStorage.length+1;

    TaskStorage.push({
        id: id,
        title: taskName,
        taskDescription: taskDescription,
        completed: false,
        date:cureentdate,
        container:0,
    });
    localStorage.setItem("tasks", JSON.stringify(TaskStorage));

    modal.hide();
    console.log(TaskStorage);
    ShowAlert("A task has been added to your task list");
    FechTask(1);
};
const ShowAlert = (message) =>
{
    $(".alertcontainer").fadeIn();
    $(".alertcontet").text(message);
    setInterval(HideAlert, 3000);

}
const HideAlert = () =>
{
    $(".alertcontainer").fadeOut();
}
$("#addtaskbtnmodal").click(function(){
    const taskName = document.querySelector('#taskinput').value;
    const taskDescription = document.querySelector('#taskdescinput').value;

    if(!taskName && !taskDescription)
        alert("Please fill all fields");
    else if(taskName.length < 4)
       alert("Name must be at least 10 characters long");
    else if(taskDescription.length < 20)
        alert("Descript must be at least 20 characters long");
    else
        pushtask(taskName, taskDescription);
});

$(".taskbtn").click(function()
{

    
    setTabsStorage(1);
    FechTask(1);
});

$(".completedtask").click(function()
{
    setTabsStorage(0);
    FechTask(2);
});
const getTabsStorage = () =>
{
    return localStorage.getItem("tabhandle");
}
const setTabsStorage = (item) =>
{
    localStorage.setItem("tabhandle", item);
}
const setDataTask = (element) =>
{
    const between = daysBetween(element.date, cureentdate);
    const emptyTask = document.createElement("div");
    const dateitem  = between == 0? "Today" : between+" Days Ago";

    emptyTask.innerHTML = `
                <a id="`+element.id+`" href="#" style="border:none; background: #0c0b0c !important;" class="taskitem list-group-item mb-1 list-group-item-action flex-column align-items-start active">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1" style="overflow-wrap: break-word;word-wrap: break-word;white-space: normal;max-width: 80%;">`+element.title+`</h5>
                    <small>`+dateitem+`</small>
                </div>
                <p class="mb-1" style="overflow-wrap: break-word;word-wrap: break-word;white-space: normal;max-width: 100%;">`+element.taskDescription+`</p>
                
                <div class="btnaction w-100 " id="action`+element.id+`" style="display:none">
                    <button id="`+element.id+`" class="markcomp me-2 btnactions btn btn-primary rounded-0" >Mark as Complete</button>
                    <button id="`+element.id+`" class="removetask btnactions btn btn-primary rounded-0">Remove Task</button>
                </div>
                </a>`;
             
                $(".taskcontainer").append(emptyTask);
}
const setDataEmptyTask= (header, text) =>
{
    const emptyTask1 = document.createElement("div");
        emptyTask1.innerHTML = `<h5 class="no-tasks md-1  fw-bold text-danger">`+header+`</h5>
        <p class="text-muted mb-4">`+text+`</p>`;
    $(".taskcontainer").append(emptyTask1);
}
const FechTask = (type) =>
{
    $(".taskcontainer").html("");
    let count = 0;
    if(type == 1)
    {
        $('.taskbtn').css("background","#0c0b0c")
        $('.completedtask').css("background","transparent")
        $('.addtask').show();
        $('.todotitle').text("Tasks");
        TaskStorage.forEach(element => {
            setTabsStorage(1);
            if(element.completed == false)
            {
                setDataTask(element)
                count++;
            }
               
        });
    }else{
        $('.completedtask').css("background","#0c0b0c")
        $('.taskbtn').css("background","transparent")
        $('.addtask').hide();
        $('.todotitle').text("Completed Task");
        TaskStorage.forEach(element => {
            setTabsStorage(2);
          
            if(element.completed == true)
            {
                setDataTask(element);
                count++;
            }
        });
    }
    if(count == 0)
    {
        if(type == 1)
        {
            setDataEmptyTask("Your Task is Empty", "Add a new task to fill your list");
        }else{
            setDataEmptyTask("Completed Task is Empty", "Please complete a task to fill your list");
        }
    }
    const RemoveTask = document.querySelectorAll('.removetask');

    const MarkComplete = document.querySelectorAll('.markcomp');

    const ActionsContainer = document.querySelectorAll('.taskitem');

    ActionsContainer.forEach(task => {
    task.addEventListener("click", function(event) {
        event.preventDefault();
        event.stopPropagation();

        const elementId = event.currentTarget.id;
        const action = $('#action' + elementId);

        action.stop(true, true).fadeToggle(200);


    });

    
    if(getTabsStorage() == 1)
    {
        MarkComplete.forEach(task => {
            if(task)
            {
                task.addEventListener("click", function(event) {
                    event.preventDefault();
                    event.stopPropagation();
                    
                
                    const elementId = event.currentTarget.id;

                    const taskz = TaskStorage.find(task => task.id == elementId);
                    
            
                    const confirmation = confirm("Mark as Complete?");
                    if(confirmation)
                        taskz.completed = true;
                
                    localStorage.setItem("tasks", JSON.stringify(TaskStorage));
                    FechTask(1);
                });
            }
        });
    }else{
        $(".markcomp").hide();
    }
  
    RemoveTask.forEach(task => {
        if(task)
        {
            task.addEventListener("click", function(event) {
                event.preventDefault();
                event.stopPropagation();
                
              
                const elementId = event.currentTarget.id;
         
                const taskIndex = TaskStorage.findIndex(task => task.id == elementId);
                
                if (taskIndex !== -1) {
                    const confirmation = confirm("Remove this Task?");

                    if (confirmation) {
                        TaskStorage.splice(taskIndex, 1);
                        localStorage.setItem("tasks",JSON.stringify(TaskStorage));

               
                    }
                }
                FechTask(1);
            });
        }
    });
});
}

$( document ).ready(function() {
    if(getTabsStorage() == null)
        setTabsStorage(1);
    else if(getTabsStorage() == 1)
        FechTask(1);
    else
        FechTask(2);
});