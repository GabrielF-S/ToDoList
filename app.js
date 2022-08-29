//definir variaveis de UI
const form = document.querySelector('#task-form');
const taskLits = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


// Carregar todo os Event Listeners 

loadEventListeners();

// Carregar todo os Event Listeners 


function loadEventListeners(){
    //carregar eventos do Local Storage
    document.addEventListener('DOMContentLoaded', loadTask);
    // adicionar Task 
    form.addEventListener('submit', addTask);
    // remover  Task
    taskLits.addEventListener('click', removeTask);
    // limpar Task
    clearBtn.addEventListener('click', clearTask);
    //filtrar task
    filter.addEventListener('keyup', filterTask);
}

// Carrear Task

function loadTask(){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');

        // adicionar classe
        li.className = 'collection-item';

        //criar nó de texto e adiciona ao li

        li.appendChild(document.createTextNode(task));

        //criar link 

        const link = document.createElement('a');
        //adicionar classe
        link.className = 'delete-item secondary-content';
        //adicionar icone 
        link.innerHTML = '<i class="fa fa-remove"></i>';
        //adicionar o link ao li
        li.appendChild(link);
        //adicionar o li ao ul
        taskLits.appendChild(li);


    })

}

//adicionando taks

function addTask(e){
    
    if(taskInput.value === ''){
        alert('Add uma tarefa');

    }else{

         // criar elemento li

    const li = document.createElement('li');

    // adicionar classe
    li.className = 'collection-item';

    //criar nó de texto e adiciona ao li

    li.appendChild(document.createTextNode(taskInput.value));

    //criar link 

    const link = document.createElement('a');
    //adicionar classe
    link.className = 'delete-item secondary-content';
    //adicionar icone 
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //adicionar o link ao li
    li.appendChild(link);
    //adicionar o li ao ul
    taskLits.appendChild(li);

    //armazenar no LocalStorage
    storageTaskInLocalStorage(taskInput.value);    

    //limpar o  input
    taskInput.value ="";   
    }

       e.preventDefault();
}


// função para armazenar
function storageTaskInLocalStorage(task){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.push(task);


    localStorage.setItem('tasks', JSON.stringify(tasks));
}


// Remover Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Tem certeza da remoção?")){
            e.target.parentElement.parentElement.remove();

            // remover do LS

            removeTaskFromLocalStorage(e.target.parentElement.parentElement)

        }
        
    }
    e.preventDefault();
}

// remover do LS
function removeTaskFromLocalStorage(item){
    let tasks;

    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
        
    }
    tasks.forEach(function(task, index){
        if(item.textContent === task){
            tasks.splice(index, 1);

        }

    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

 //Limpar tasks

 function clearTask(e){
    if(confirm("Deseja limpar a lista?")){
        while(taskLits.firstChild){
        taskLits.removeChild(taskLits.firstChild);
        }
    }
    //limpar LS

    clearTaskFromLS();
    

    e.preventDefault();
 }

 //limpar LS

 function clearTaskFromLS(){
    localStorage.clear();

 }

 //filtrar task

 function filterTask(e){

    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if (item.toLocaleLowerCase().indexOf(text) != -1) {
            task.style.display = "block";
            
        } else {
            task.style.display = "none";
            
        }
    })

    e.preventDefault();
 }