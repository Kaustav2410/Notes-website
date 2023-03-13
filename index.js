const addBtn = document.querySelector("#Add");
const quoteslisten= document.querySelector("#quotes");
const quotesdisplay= document.querySelector(".display");

const arr=["hello how is it going on are you okay. just focus on today and dont dwell on the past :)","hey there","how is it going?","Keep up the good work","Just do it","I see you started working on yourself Good! Don't fail this time","This year resolution Dont fail this time"];
const searchtext=document.querySelector("#searchbox");

(
    function(){
        showNotes();
        quotesdisplay.innerHTML=arr[Math.floor(Math.random()*arr.length)];
        const displayname=document.querySelector("#name");
        username=localStorage.getItem('username') || '';
        displayname.value=username;

        displayname.addEventListener('change',e=>{
            localStorage.setItem('username',e.target.value);
        })
    }
)()

addBtn.addEventListener("click", function(e) {
    const addTitle=document.querySelector("#Addtitle");
    const addTxt=document.querySelector("#Addtext");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
      notesObj = [];
    } else {
      notesObj = JSON.parse(notes);
    }
    let myObj = {
      title: addTitle.value,
      text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    showNotes();
  });
  


function showNotes(){
    const notes =localStorage.getItem("notes")
    if(notes===null){
        notesObj=[];
    }
    else{
        notesObj=JSON.parse(notes);
        console.log(notesObj);
    }

    let html="";
    notesObj.forEach(function(element,index){
        html += `
            <div class="note">
                    <div class="note-header">
                        <h5 class="card-title">${element.title}</h5>
                        <button id="${index}" onclick="deleteNote(this.id)"><i class="trash fas fa-trash" ></i></button>
                    </div>
                        <textarea class="card-text"> ${element.text}</textarea>
                </div>`;
    });

        let notesele=document.getElementById("note-contain");
        if(notesObj.length!=0){
            notesele.innerHTML=html;
            console.log("Added");
        }
        else{
            notesele.innerHTML=`Nothing to show!`;
            console.log("Nothing to Added");
        }

}
// function deleteNote (note){
//     console.log("Deleted");
//     note.remove();
//     showNotes();
// }


function deleteNote(index){
      console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}


quoteslisten.addEventListener("click",function(){
    console.log("clicked");
    quotesdisplay.innerHTML=arr[Math.floor(Math.random()*arr.length)];
})

searchtext.addEventListener('input',e=>{
    
    let inputVal = searchtext.value;
    let noteCards = document.getElementsByClassName('note');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("textarea")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
            console.log(cardTxt);
        }
        else{
            element.style.display = "none";
        }
    })
})
