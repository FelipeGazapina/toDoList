// selector
    const toDoInput = document.querySelector('.todoInput')
    const toDoButton = document.querySelector('.todoButton')
    const toDoList = document.querySelector('.todoList')
    const filterOption = document.querySelector('.filterToDo')

// event listener
    toDoButton.addEventListener('click', addToDo)
    toDoList.addEventListener('click', deleteCheck)
    filterOption.addEventListener('click', filterToDo)
    window.addEventListener('DOMContentLoaded', getToDos)

// functions
function addToDo(event){
    // prevent form from submit
    event.preventDefault()



    // toDo DIV
    const toDoDiv = document.createElement('div')
    toDoDiv.classList.add('toDo')

    // create Li
    const newToDo = document.createElement('li')
    newToDo.innerHTML = toDoInput.value
    newToDo.classList.add('toDoItem')
    toDoDiv.appendChild(newToDo)
    
    // add toDo to local storage
    saveLocal(toDoInput.value)

    // checked button
    const compretedButton = document.createElement('button')
    compretedButton.innerHTML = '<i class="fas fa-check"></i>'
    compretedButton.classList.add('completeBtn')
    toDoDiv.appendChild(compretedButton)

    // trash button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add('trashBtn')
    toDoDiv.appendChild(trashButton)

    //append to list
    toDoList.appendChild(toDoDiv)

    // clear input todo value
    toDoInput.value = ''
}

function deleteCheck(event){
    const item = event.target
    //delete TODO
    if(item.classList[0] == 'trashBtn'){
        let toDo = item.parentElement
        //animation
        toDo.classList.add('fall')
        //remove
        removeLocal(toDo)
        toDo.addEventListener('transitionend', ()=>{
            toDo.remove()
            
        })
    }

    // check mark
    if(item.classList[0] == 'completeBtn'){
        const toDo = item.parentElement
        toDo.classList.toggle('completed')
    }
}

function filterToDo(event){
    const toDos = toDoList.childNodes
    toDos.forEach((toDo)=>{
        switch(event.target.value){
            case 'all':
                toDo.style.display = 'flex'
                break
            case 'completed':
                if(toDo.classList.contains('completed')){
                    toDo.style.display = 'flex'
                }else{
                    toDo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!toDo.classList.contains('completed')){
                    toDo.style.display = 'flex'
                }else{
                    toDo.style.display = 'none'
                }
                break
        }
    })
}

function saveLocal(toDo){
    // checked
    let toDos = check()

    toDos.push(toDo)
    localStorage.setItem('toDos', JSON.stringify(toDos))
}

function getToDos(){
    // checked
    let toDos = check()

    toDos.forEach((toDo)=>{
        // toDo DIV
        const toDoDiv = document.createElement('div')
        toDoDiv.classList.add('toDo')

        // create Li
        const newToDo = document.createElement('li')
        newToDo.innerHTML = toDo
        newToDo.classList.add('toDoItem')
        toDoDiv.appendChild(newToDo)

        // checked button
        const compretedButton = document.createElement('button')
        compretedButton.innerHTML = '<i class="fas fa-check"></i>'
        compretedButton.classList.add('completeBtn')
        toDoDiv.appendChild(compretedButton)

        // trash button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add('trashBtn')
        toDoDiv.appendChild(trashButton)

        //append to list
        toDoList.appendChild(toDoDiv)

    })

}

function removeLocal(toDo){

    // checked
    let toDos = check()

    let item = toDo

    let itens = toDos.splice(toDos.indexOf(item))
    localStorage.setItem('toDos', JSON.stringify(itens))

}

function check(){
    // checked
    let toDos;

    if(localStorage.getItem('toDos') == null){
        toDos = []
    }else{
        toDos = JSON.parse(localStorage.getItem('toDos'))
    }
    
    return toDos
}