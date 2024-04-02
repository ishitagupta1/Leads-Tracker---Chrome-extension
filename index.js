let myLeads = [];
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
const tabBtn=document.getElementById("tab-btn");

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click",function(){

    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads) );
        render(myLeads);
    });    
});

function render(leads){
    let listItems = [];
    for(let i=0;i<leads.length;i++){    
        listItems += `
            <li>
                <a target='_blank' href=${leads[i]}>
                ${leads[i]}
                </a>
                <a class="remove-link" data-index="${i}" style="margin-left:10px;padding-left:10px; text-decoration: underline;">Remove</a> 
            </li>
        `;
    }

ulEl.innerHTML = listItems;
// attach event listeners to remove each lead link
    const removeLinks = document.querySelectorAll(".remove-link");
    removeLinks.forEach(link => {
        link.addEventListener("click",function() {
            const index = parseInt(this.getAttribute("data-index"));
            removeLead(index);
        });
    });
}
        

deleteBtn.addEventListener("dblclick",function(){
    localStorage.clear();
    myLeads=[];
    render(myLeads);
});

document.getElementById("input-btn").addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value=""
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);

    console.log(localStorage.getItem("myLeads"));
});

//To remove a lead from the list
function removeLead(index){
    myLeads.splice(index,1); // splice is removing one element from myLeads array
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
}


