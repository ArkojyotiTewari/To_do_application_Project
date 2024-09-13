// console.log("hello world");


// in the browser local storage we have the card infos stored dynamically to view it go to application and the history in teh inspect of the google chrome


// in the console try 
// localStorage.setItem('name','Arko')
// then check out the history
// to view in the console
// localStorage.getItem('name')

// it is also stored in the UI as well 
// it is also stored in the editor in the object called state like below

// var state = {
//     taskList: [
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tags: "",
//             taskDescription: "",

//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tags: "",
//             taskDescription: "",

//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tags: "",
//             taskDescription: "",

//         },
//         {
//             imageUrl: "",
//             taskTitle: "",
//             tags: "",
//             taskDescription: "",

//         },
//     ]
// }


// suppose we have a  function 
// var abc = ()=>{} will be called whenever the add new item is pushed
// and then display that on the screen



/*1st dynamic action:
add new item button


and then on the card open task button is the 2nd dynamic action that is data from card should be loaded in the modal
 */

var state = {
    taskList: []
};


//DOM Operations
var taskContents = document.querySelector(".task_contents");
var taskModel = document.querySelector(".task_modal_body");


// console.log(taskContents);
// console.log(taskModel);

// https://github.com/rohandevtown/105242052410624-2

// https://github.com/rohandevtown/105242052410624-2


// we will embed html in js
// now we will focus on having the cards on the moment I click on the particular save button in the add new item button and then we will be having the implementation


const htmlTaskContent= ({id,title,description,type,url})=>
    // in order to write html code in js we use ``
    // in order to use js in html we use ${}

    // in order to create any event please do write event.apply(this,arguments) so it will be applied
    `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
        <div class="card shadow-sm task_card">
            <div class="card-header d-flex justify-content-end gap-2 task_card_header">
                <button type="button" class="btn btn-outline-info mr-2" name=${id} onclick="editTask.apply(this,arguments)">
                    <i class="fas fa-pencil-alt"></i>
                </button>
                <button type="button" class="btn btn-outline-danger mr-2" name=${id} onclick="deleteTask.apply(this,arguments)">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div class="card-body">
                ${
                    // if we have the url then display the image on the screem
                    url? `<img width="100%" src=${url} alt="card image top" class="card-image-top md-3 rounded-lg">`:
                    `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACUCAMAAADLemePAAAAMFBMVEXx8/XCy9L09ve/yNDGztXN1Nrs7/HT2d/o6+7Z3uPh5enJ0dfk6Ovc4eXQ19zV299BB7LwAAAEOElEQVR4nO2a2baDIAwAkU0Utf//t9e17gUCgtyTea7LNBgSgBT/GpL6BZ4F9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9eLDgt3pXXq84KKsqupTdpqHuOF79BgXn0YRukBUW2rO/CL5Fj3Gq0GNbKFUqkp4Cb5Dj+lakr3bbEikKj0E36DHivZKbVWswLdOr9cPy8vA7QU1LILJ9ZhQBrlRUFYcIphaj1XSwm4U/AD8Uus1dnKjoHIPYFI9pi1Dtwg6j9CUeky42Q0BFG5+CfVYJ93kBj/i9gUm1Cud5UZql4o7nV7pODC/AZQOAzSVHgPGjowD1PoxifRYB7YbaG2fk0hPeNkR2lg+x1ePQcp5xv3shg/Qrtv10us70LLshPviget8d+VnlWA89Jhuxw5UNqXjlQ6V2D2ys3gSXI99vx9KbD+FiZ/dnQOdOX5gPbadt6jLbapAdoSWRj+oHtvnPqqAF/r5GSs0cPSaw6PM/+RkFyCtbDD5QfVOMbANX5C0Yu0H1TulB7tEzdqgcsbvD6jHjmPTPE5G/Goxdz+o3qlVo5WFHrdZNnLl1/wH1VMQPRb4w5sR4fXOg9OcOhm0xTOhQ+sVn1NquX/Ggn5Grud2hQmqd3pVi7rsHPFQ3C4Rgqf1+hA+cwFYPWbX9383/RFYT+9yJ22Nds8NzR/Ph5fUfONHa3NecV/1C+Dn0RDxZt7ZodI8KbBQXdCt32VZ4dWtd+0w/SmL3amQfcIdV1+/32JEwXusfnoqA8IjL/7lSCtlTw/NAarO/3QcvQhDc/BrTuGLo/dEJX3ld0qfMfRYsNUVI8fC91ovyImgLzqa3amp3umxQnftdDCoz/f1R/Agx7siZM2FY3rZ6LGiq+XmYNBw7qkuQQcSdjxYa1747eunVW+tQra/JrL2PNf1aK154bf7/FY9cXt4pgGemRm5aHwfZvu2ix479acbqAJsk8z3jZc1F7abR4ueqayoHY8kLHaRh+b0ric94/IjlU5b9l8iZs2Vdcdq1LMbQdJiR+YYvKhZc+U7PAc9216MuuaYGG3QJXJ5TzJs49t+/VQ6blRGqjXPL7oUn2Q4+uRwYf3bZx+843JTRObZjxTcaRHE4VgeE+nsyFycEecdKYs90YkUc8L6llPvR35N5zdXtlYNBU8yJ6xvOS4tga5UNhk09E6eM8NLAi811jCPbZdYM273Q681bVZGbGFv6WcH6KX096k1/eyatCUCrDfsWtwHMHFamemHp8fV6r7GfmYX1hnqVfJeLQuPaSVVLRYWer2px18SuwBcJFD9P2I3cdz6gpzefzP7Jv7xbbzYUCmKaaWQFbwMeh7uFVBSf4TmXIvqP311K5RIqZSS9F/aIQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICn4A49MS2/QrYSCAAAAAElFTkSuQmCC" alt="card image top" class="card-image-top md-3 rounded-lg">`
                }
                <h4 class="card-title">${title}</h4>
                <!-- trim till 3 lines and text-muted is for getting text in grey color -->
                <p class="description tri-3-lines text-muted card-text">${description}</p>
                <div class="tags text-white d-flex flex-wrap">
                    <span class="badge bg-primary m-1">${type}</span>
                </div>
            </div>
            <div class="card-footer">
            <button type="buttons" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick='openTask.apply(this,arguments)'>
            Open Task
                
            </button>
            </div>
        </div>
    </div>
    `



const htmlModalContent = ({id,title,description,url})=>{
    // id will be having the dates 
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
    ${
        // if we have the url then display the image on the screem
        // image fluid makes it much more dynamic
        url? `<img src=${url} width="100%" alt="card image cap" class="image-fluid mb-3">`:
        `<img width="100%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAN4AAACUCAMAAADLemePAAAAMFBMVEXx8/XCy9L09ve/yNDGztXN1Nrs7/HT2d/o6+7Z3uPh5enJ0dfk6Ovc4eXQ19zV299BB7LwAAAEOElEQVR4nO2a2baDIAwAkU0Utf//t9e17gUCgtyTea7LNBgSgBT/GpL6BZ4F9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9XIG9eLDgt3pXXq84KKsqupTdpqHuOF79BgXn0YRukBUW2rO/CL5Fj3Gq0GNbKFUqkp4Cb5Dj+lakr3bbEikKj0E36DHivZKbVWswLdOr9cPy8vA7QU1LILJ9ZhQBrlRUFYcIphaj1XSwm4U/AD8Uus1dnKjoHIPYFI9pi1Dtwg6j9CUeky42Q0BFG5+CfVYJ93kBj/i9gUm1Cud5UZql4o7nV7pODC/AZQOAzSVHgPGjowD1PoxifRYB7YbaG2fk0hPeNkR2lg+x1ePQcp5xv3shg/Qrtv10us70LLshPviget8d+VnlWA89Jhuxw5UNqXjlQ6V2D2ys3gSXI99vx9KbD+FiZ/dnQOdOX5gPbadt6jLbapAdoSWRj+oHtvnPqqAF/r5GSs0cPSaw6PM/+RkFyCtbDD5QfVOMbANX5C0Yu0H1TulB7tEzdqgcsbvD6jHjmPTPE5G/Goxdz+o3qlVo5WFHrdZNnLl1/wH1VMQPRb4w5sR4fXOg9OcOhm0xTOhQ+sVn1NquX/Ggn5Grud2hQmqd3pVi7rsHPFQ3C4Rgqf1+hA+cwFYPWbX9383/RFYT+9yJ22Nds8NzR/Ph5fUfONHa3NecV/1C+Dn0RDxZt7ZodI8KbBQXdCt32VZ4dWtd+0w/SmL3amQfcIdV1+/32JEwXusfnoqA8IjL/7lSCtlTw/NAarO/3QcvQhDc/BrTuGLo/dEJX3ld0qfMfRYsNUVI8fC91ovyImgLzqa3amp3umxQnftdDCoz/f1R/Agx7siZM2FY3rZ6LGiq+XmYNBw7qkuQQcSdjxYa1747eunVW+tQra/JrL2PNf1aK154bf7/FY9cXt4pgGemRm5aHwfZvu2ix479acbqAJsk8z3jZc1F7abR4ueqayoHY8kLHaRh+b0ric94/IjlU5b9l8iZs2Vdcdq1LMbQdJiR+YYvKhZc+U7PAc9216MuuaYGG3QJXJ5TzJs49t+/VQ6blRGqjXPL7oUn2Q4+uRwYf3bZx+843JTRObZjxTcaRHE4VgeE+nsyFycEecdKYs90YkUc8L6llPvR35N5zdXtlYNBU8yJ6xvOS4tga5UNhk09E6eM8NLAi811jCPbZdYM273Q681bVZGbGFv6WcH6KX096k1/eyatCUCrDfsWtwHMHFamemHp8fV6r7GfmYX1hnqVfJeLQuPaSVVLRYWer2px18SuwBcJFD9P2I3cdz6gpzefzP7Jv7xbbzYUCmKaaWQFbwMeh7uFVBSf4TmXIvqP311K5RIqZSS9F/aIQiCIAiCIAiCIAiCIAiCIAiCIAiCIAiCICn4A49MS2/QrYSCAAAAAElFTkSuQmCC" alt="card image top" class="card-image-top md-3 rounded-lg">`
    }
    <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p class="lead">${description}</p>
    </div>
    `

}


const updateLocalStorage = ()=>{
    // from array of the objects to array of strings
    // local storage should always have the key and value in the string format
    localStorage.setItem('task',JSON.stringify({
        tasks: state.taskList,
    }))
}



const loadInitialData = ()=>{
    // we are going to store the data from the local storage to the tasklist to display in the card
    const localStorageCopy = JSON.parse(localStorage.task);
    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate)=>{
        // in the following method we have 2 properties like position and text respectively
        // positions are beforebegin afterbegin beforeend afterend

        taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardDate))
    })
}

const handleSubmit = (event) => {
    // `` is a template literal that is a way of creating strings
    //  ${} is used to express an expression within a template literal
    const id = `${Date.now()}`
    const input = {
        url: document.getElementById("image_url").value,
        title: document.getElementById("task_title").value,
        
        description: document.getElementById("task_description").value,
        type: document.getElementById('task_type').value,

    };

    if(input.title === "" || input.description==="" || input.type===""){
        return alert("please fill out all fields");
    }
    taskContents.insertAdjacentHTML("beforeend",htmlTaskContent({...input,id}))
    state.taskList.push({...input,id});
    updateLocalStorage();
}

// ... operator(spread operator)
// create an object data
// console.log(data) gives you a printing of the object
// console.log({data}) gives you the an object of the object data
// to avoid this we can use 
// console.log({...data})
// so ... can neutralise the {}

// to add anything in the properties
// console.log({...data,company:"Devtown"})
// then data object will be having the property company with value Devtown

const openTask = (e)=>{
    // if the event is not there we will tell the window as event
    if(!e) e= window.event;
    // e.target means the event's target
    const getTask = state.taskList.find(({id}) => id === e.target.id);
    taskModel.innerHTML = htmlModalContent(getTask);
}

// my-3 is the margin along the vertical direction in the y axis like top and bottom respectively

const deleteTask = (e)=>{
    // if the event is not there we will tell the window as event
    if(!e) e= window.event;
    const targetId = e.target.getAttribute("name");
    // by the above you will get the id
    const type = e.target.tagName;
    // console.log(type);
    const removeTask = state.taskList.filter(({id})=> id!==targetId);
    // console.log(removeTask);
    state.taskList = removeTask;
    updateLocalStorage();
    // but here after refreshing it will get deleted
    if(type === "BUTTON"){
        // console.log(e.target.parentNode.parentNode.parentNode);
        // parentNode means one level top
        // to remove a child I need to be out of there
        // it works like a stack and in order to delete the 5th step we need to delete the 4th step as well
        return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode);
        // remove child means how many levels I want to delete that is 4 levels for the button
        // therefore the container would be deleted
    }
    return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode.parentNode.parentNode);

}

const editTask = (e)=>{
    // console.log("edit triggered");
    // if the event is not there we will tell the window as event
    if(!e) e= window.event;


    const targetId= e.target.id;
    const type = e.target.tagName;

    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;

    if(type==="BUTTON"){
        parentNode = e.target.parentNode.parentNode;
    }
    else{
        parentNode = e.target.parentNode.parentNode.parentNode;
    }
    // we will directly go to the parentNode
    // se the console for the child nodes only and accordingly we can select the thing to be written into
    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[7];
    taskType = parentNode.childNodes[3].childNodes[9].childNodes[1];
    // console.log(taskTitle,taskDescription,taskType);
    submitButton = parentNode.childNodes[5].childNodes[1];
    // console.log(submitButton);

    // to allow editing we need some permission by setting some attributes

    taskTitle.setAttribute("contenteditable",true);
    taskDescription.setAttribute("contenteditable",true);
    taskType.setAttribute("contenteditable",true);


    // now we want a save functionality
    submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");
    // I donot want to open the modal while editing is going on
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML="Save Changes";
}



const saveEdit = (e)=>{
    console.log("SaveEdit just worked!!!");
    if(!e) e= window.event;
    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[7];
    const taskType = parentNode.childNodes[3].childNodes[9].childNodes[1];
    // console.log(taskTitle,taskDescription,taskType);
    const submitButton = parentNode.childNodes[5].childNodes[1];

    const updateData = {
        taskTitle: taskTitle.innerHTML,
        taskDescription: taskDescription.innerHTML,
        taskType: taskType.innerHTML,
    }
    let stateCopy = state.taskList;
    stateCopy = stateCopy.map((task) => task.id === targetId?{
        id: task.id,
        title: updateData.taskTitle,
        description: updateData.taskDescription,
        type: updateData.taskType,
        url: task.url

    } : task);

    state.taskList = stateCopy;
    updateLocalStorage();


    // now remove the permissions

    taskTitle.setAttribute("contenteditable",false);
    taskDescription.setAttribute("contenteditable",false);
    taskType.setAttribute("contenteditable",false);


    submitButton.setAttribute("onclick","openTask.apply(this,arguments)");
    // I donot want to open the modal while editing is going on
    submitButton.setAttribute("data-bs-toggle","modal");
    submitButton.setAttribute("data-bs-target","#showTask");
    submitButton.innerHTML="Open Task";
}


const searchTask = (e)=>{
    if(!e) e=window.event;

    while(taskContents.firstChild){
        taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({title})=>title.includes(e.target.value));
    resultData.map((cardData)=>{
        return taskContents.insertAdjacentHTML("beforeend",htmlTaskContent(cardData));
    })
}