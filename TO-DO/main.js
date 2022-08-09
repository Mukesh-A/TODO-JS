let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e)=>{e.preventDefault();
    formValidation();
    });

let formValidation = ()=>{
    if(textInput.value=== ""){
        msg.innerHTML = "Task field empty"
    }
    else{
        console.log("s")
        msg.innerHTML = ""
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal")  
        add.click();  
        
        // ()() IIFE  can run only once
        (()=>{add.setAttribute("data-bs-dismiss", "")  })()
            }
}

let data = [{}];

let acceptData = ()=>{

    data.push({
        text:  textInput.value,
        date:  dateInput.value,
        description:  textarea.value,
    });

    localStorage.setItem("data",JSON.stringify(data));
    console.log(data);
    createTasks();
 }

 let createTasks = ()=>{
        // if u add + then old data is not updated, new data in new line
    
        tasks.innerHTML = ""

        //x is number of items in data 
        //y is iterating of x like 0 1 2 3 4 5
        data.map((x,y)=>{
            return(tasks.innerHTML += `<div id=${y}>
                <span class="fw-bold">${x.text}</span>
                <span class="small text-secondary">${x.date}</span>
                <p>${x.description}</p>
        
                <span class="options">
                  <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
                  <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
                </span>
              </div>
              `);
        });

        
        resetForm();
     };
     

 let deleteTask = (props)=>{
    //now when u put props.remove it remove only icon
    // i want to remove its parent dive then use parentElement,here parent element is options

    // if u want to delete that above element then add it twice
     props.parentElement.parentElement.remove();
     data.splice(props.parentElement.parentElement.id,1);
     localStorage.setItem("data",JSON.stringify(data));
     
 }

 let editTask = (props)=>{

        //we r jumping from the current div to its parent div and capturing its inner html value and passing it to the input field.
    
        
        let selectedTask = props.parentElement.parentElement; 
        textInput.value = selectedTask.children[0].innerHTML;
        dateInput.value = selectedTask.children[1].innerHTML;
        textarea.value = selectedTask.children[2].innerHTML;

        deleteTask(props);
     }

    
let resetForm = () =>{
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
}


//every tym the page reload or startup all the data is fetched and passed to the data array'
(()=>{
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
})()


