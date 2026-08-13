const addTaskButton = document.querySelector('.addtask');
const addTaskbtnModal = document.querySelector('#addtaskbtnmodal');
let TaskStorage = JSON.parse(localStorage.getItem("tasks")) || [];
const modalElement = document.getElementById("addtask");
const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
const alertcontainer = document.querySelector('.alertcontainer');
const pushtask = (taskName, taskDescription) => {
    
    TaskStorage.push({
        title: taskName,
        taskDescription: taskDescription,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(TaskStorage));
  

    modal.hide();
    ShowAlert("tets");

};
const ShowAlert = (message) =>
{
   $(".alertcontainer").fadeIn();
    setInterval(HideAlert, 9000);

}

const HideAlert = () =>
{
    $(".alertcontainer").fadeOut();
}
addTaskbtnModal.addEventListener("click", function(){

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
