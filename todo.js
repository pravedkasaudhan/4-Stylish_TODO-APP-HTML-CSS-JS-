let btn = document.getElementById("btn");
let cards = document.getElementById("cards");
if (localStorage.getItem('todo-list') == null) {
    document.getElementById("reset").style.visibility = `hidden`;
}

// EVENT TO ADD THE TASK IN LOCAL STORAGE
btn.addEventListener('click', getting);
function getting() {
    document.getElementById("reset").style.visibility = `visible`;
    let desc = document.getElementById("desc");
    // FOR SHOWING ALERT ON ADDING EMPTY TASK IN TEXTAREA
    if (desc.value == '') {
        alert("Fill the task to add in list");
    }
    else {
        if (localStorage.getItem('todo-list') == null) {
            let list = [];
            list.push(desc.value);
            localStorage.setItem('todo-list', JSON.stringify(list));
        }
        else {
            let list = JSON.parse(localStorage.getItem('todo-list'));
            list.push(desc.value);
            localStorage.setItem('todo-list', JSON.stringify(list));
        }
        desc.value = ``;
    }
    update();
}

// for displaying the task list to do
function update() {
    cards.innerHTML = '';
    data = localStorage.getItem('todo-list');
    if (data == null) {
        list = [];
    }
    else {
        list = JSON.parse(data);
    }
    list.forEach((element, index) => {
        cards.innerHTML += `<div id="task">
        <textarea id="to" rows="4" cols="23" disabled>${element}</textarea>
        <button id="delete" onclick="del(${index})">DELETE</button>
        </div>`;
    });
}
update();


// FOR DELETING THE EACH TASK AFTER COMPLETING
function del(index) {
    console.log(index, "deleted");
    list = JSON.parse(localStorage.getItem('todo-list'));
    list.splice(index, 1);
    localStorage.setItem('todo-list', JSON.stringify(list));
    update();
}


// DELETING ENTIRE LIST AFTER COMPLETING
function reset() {
    if (confirm("Do YOU Want to Clear TODO List ")) {
        localStorage.clear();
        update();
        location.reload();
    }
}