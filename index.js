const inputEl= document.getElementById("input-el")
const addItemEl= document.getElementById("add-item")
const pendingListEl= document.getElementById("pending-list")
const completedListEl= document.getElementById("completed-list")
const doneButtonEl= document.querySelectorAll("done-button")
let numberOfItems= 0
let pendingItemsList= []
let completedItemsList= []

getItemsFromLocalStorage()

function getItemsFromLocalStorage() {
    let pendingItems= localStorage.getItem("pending_todo_list")
    let completedItems= localStorage.getItem("completed_todo_list")
    if(!(pendingItems === null || pendingItems === 'undefined')) {
        addPendingListItems(JSON.parse(pendingItems));
    } 
    if(!(completedItems === null || completedItems === 'undefined')) {
        addCompletedListItems(JSON.parse(completedItems));
    } 
}

function addPendingListItems(items) {
    pendingListEl.innerHTML = ""
    for (let i=0; i<items.length; i++){
        pendingListEl.innerHTML += `<li> <span>${items[i]}</span>
                                    <div>
                                    <button class=done-button onclick=moveTocompletedList(this)>Done</button>
                                    <button class=remove-item onclick=removeItemFromPendingList(this)>Remove</button>
                                    </div>
                                    </li>`
    }
    pendingItemsList= items
}

function addCompletedListItems(items) {
    completedListEl.innerHTML = ""
    for (let i=0; i<items.length; i++){
        completedListEl.innerHTML += `<li> <span>${items[i]}</span></li>`
    }
    completedItemsList= items
}

addItemEl.addEventListener('click', function () {
    console.log('hi')
    let item= inputEl.value
    if(item !== "") {
        let H = `<li> <span>${inputEl.value}</span>
                <div>
                <button class=done-button onclick=moveTocompletedList(this)>Done</button>
                <button class=remove-item onclick=removeItemFromPendingList(this)>Remove</button>
                </div>
                </li>`
        pendingItemsList.push(inputEl.value)
        updateLocalStorage("pending_todo_list", pendingItemsList)
        numberOfItems++ 
        pendingListEl.innerHTML += H
        inputEl.value= ""
    }
})

function moveTocompletedList(item) {
    const parent= item.parentElement.parentElement
    const child= parent.querySelectorAll("span")
    completedListEl.innerHTML += `<li><span>${child[0].innerHTML}</span></li>` // add the completed item into the completed list
    completedItemsList.push(child[0].innerHTML)
    removeItemFromPendingList(item)
    updateLocalStorage("completed_todo_list", completedItemsList)
}

function removeItemFromPendingList(item) {
    const parent= item.parentElement.parentElement
    const itemContent= parent.querySelectorAll("span")[0].innerHTML
    // now we need to remove that item from the list variable 
    for (let i=0; i< pendingItemsList.length; i++){
        if(pendingItemsList[i] === itemContent){
            pendingItemsList.splice(i, 1)
        }
    }
    parent.remove()
    console.log(itemContent)
    updateLocalStorage("pending_todo_list", pendingItemsList)
    console.log(pendingItemsList)
}

function updateLocalStorage(key, items) {
    localStorage.setItem(key, JSON.stringify(items))
}