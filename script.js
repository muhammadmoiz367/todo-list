var lists = document.querySelector('.lists');
var text = document.querySelector('#input-box');
var tasks = document.querySelector('.tasks');
var tasks = document.querySelector('.tasks');
var taskLength = tasks.childNodes.length;
var nodeLength = taskLength - 3;
var clear = document.querySelector('.clear');
var checkbox=document.querySelectorAll('.checkboxes');

function deleteNode(){
    var listItem = this.parentNode;
    lists.removeChild(listItem);

    document.getElementById('status').style.display="block";
    document.getElementById('status').style.backgroundColor="#e74c3c";
    document.getElementById('status').style.paddingLeft="9%";
    document.getElementById('status').innerText="1 Task deleted succesfully";

    setTimeout(() => {
        document.getElementById('status').style.display="none"; 
        document.getElementById('status').style.paddingLeft="11%";
        document.getElementById('status').style.backgroundColor="#3498db";  
        document.getElementById('status').innerText="1 Task added succesfully";
    }, 1000);
    

}


function compTask(){
    var listItem = this.parentNode;
    listItem.classList.toggle('hide-task');
    let nextLi = listItem.nextElementSibling.nextElementSibling;
      let ul = listItem.parentNode;
      if(nextLi){
       ul.insertBefore(nextLi, listItem);
      }
}


function clearField(){
    var inputField=document.querySelector('#input-box');
    inputField.value="";
    inputField.focus();
    
}

function taskTime(){
    var d = new Date();
    var hr = d.getHours();
    var min = d.getMinutes();
    var s=d.getSeconds();
    if (min < 10) {
        min = "0" + min;
    }
    if (s < 10) {
        s = "0" + s;
    }
    var ampm = "am";
    if( hr > 12 ) {
        hr -= 12;
        ampm = "pm";
    }
    return hr+':'+min+':'+s+' '+ampm
}

function addTask(){
    var input=document.querySelector('#input-box');
    
    if(input.value !== "" && isNaN(input.value)){
        
        var now=taskTime();
        /*var newHtml;
        var html=`<li class="task-list" id="task-list-no"><input type="checkbox" class="checkboxes"><span class="task-text">%text%</span><img class="dlt-btn" src="https://img.icons8.com/material-outlined/24/000000/delete-sign.png"></li>`;
        newHtml = html.replace('no',++taskLength);
        newHtml = newHtml.replace('%text%',text.value);
        document.querySelector('.lists').insertAdjacentHTML('afterend', newHtml);
        */
        taskLength+=1;
        if(taskLength>4){
            document.querySelector('.bg').style.height="758px";
        }
        
        var li=document.createElement('li');
        var inputs=document.createElement('input');
        var span=document.createElement('span');
        var img1=document.createElement('img');
        var date=document.createElement('span');
        li.classList.add('task-list');
        li.setAttribute('id','task-list-'+taskLength);
        inputs.classList.add('checkboxes');
        inputs.setAttribute('type','checkbox');
        span.classList.add('task-text');
        span.innerText=text.value;
        date.classList.add('date');
        date.innerText=now;
        img1.classList.add('dlt-btn');
        img1.setAttribute('src','https://img.icons8.com/material-outlined/24/000000/delete-sign.png');
        li.appendChild(inputs);
        li.appendChild(span);
        li.appendChild(date);
        li.appendChild(img1);
        //lists.appendChild(li);
        lists.insertBefore(li, lists.childNodes[0]);

        document.getElementById('status').style.display="block";

        setTimeout(() => {
            document.getElementById('status').style.display="none";    
        }, 1000);

        clearField();
        deleteTask();
        completedTask();
        
    }
    else{
        input.value="";
        input.focus();
    }
            
}


function editNode()    
{   
    
    var listItem=this.parentNode; //list
    var textsp=document.querySelectorAll('.task-text').innerHTML;
    console.log(textsp)//label
    text.value=textsp;
    text.focus();
    document.querySelector('.add-btn').addEventListener('click',() =>{
        textsp.innerText=text.value;
        lists.removeChild(listItem);
    });
    
}



function editTask(){
    var edits=lists.querySelectorAll('img.edit-btn');
    for(var nodes of edits){
        nodes.addEventListener('click',editNode);
    }
    
}

function deleteTask(){
    
    try{
        var dltNodes=lists.querySelectorAll('img.dlt-btn');
        for(var nodes of dltNodes){
            nodes.addEventListener('click',deleteNode)
        }
    }
    catch(Error){
        console.log(Error);
    }

}



function completedTask(){
    
    var compltNodes=lists.querySelectorAll('input[type="checkbox"]');
    for(var nodes of compltNodes){
        nodes.addEventListener('click',compTask)
    }
    

}

clear.addEventListener('click', () =>{
    lists.innerHTML="";
    taskLength=0;
    if(taskLength < 1){
        document.querySelector('.clear a').style.top="80%";
    }
    document.getElementById('status').style.display="block";
    document.getElementById('status').style.backgroundColor="#2ecc71";
    document.getElementById('status').style.paddingLeft="9%";
    document.getElementById('status').innerText="All tasks cleared succesfully";

    setTimeout(() => {
        document.getElementById('status').style.display="none"; 
        document.getElementById('status').style.paddingLeft="11%";
        document.getElementById('status').style.backgroundColor="#3498db";  
        document.getElementById('status').innerText="1 Task added succesfully";
    }, 1000);
});  
   
document.addEventListener('keypress', function(event) {
    if (event.keyCode === 13 || event.which === 13) {
        addTask();
    }
});
document.querySelector('.add-btn').addEventListener('click', addTask);
editTask();
deleteTask();
completedTask();