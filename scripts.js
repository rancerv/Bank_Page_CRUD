const container = document.querySelector('#container');
const accountButton = document.querySelector('#accountButton')
const title = document.querySelector('#title')
const url = "http://63.135.170.173:5000";
const newTra = document.querySelector("#new_tra");
const newT = document.querySelector("#new_b");
const transferButton = document.querySelector("#transferButton");
const accountSelect = document.querySelector("#accounts_select");
const sumitButton = document.querySelector("#summit_b")
const editButton = document.querySelector("#edit")
const editCard = document.querySelector("#edit_card")
let card;



var transactions = [];
var accounts = [];

LoadTransactions();
Loadacounts();


transferButton.addEventListener("click", () =>{LoadTransactions()});
accountButton.addEventListener('click', () => {Acountdisplay()})
newT.addEventListener("click", ()=>{newTra.classList.toggle("hide")})
sumitButton.addEventListener("click", ()=>{ NewTransaction()})
editButton.addEventListener("click", ()=>{editCard.classList.toggle("hide")})

function Loadacounts() {
  fetch(url+"/accounts", {
    method: "GET",
      headers: {
          'Authorization': '7399c3fe-456c-4459-9750-c6402b00d0cd'
          }
    
  })
    .then(resp => resp.json())
    .then(data => {console.log(data)
      accounts = data;
      for(let i = 0; i < data.data.length; i++){
        const h = document.createElement("option");
        h.innerHTML = ""
        h.value = `${data.data[i].id}`
        h.innerHTML = `${data.data[i].type}`;
        accountSelect.append(h);}
    })
}

function LoadTransactions() {
  fetch(url+"/transactions", {
    method: "GET",
      headers: {
          'Authorization': '7399c3fe-456c-4459-9750-c6402b00d0cd'
          }
    
  })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      transactions = data;
      container.innerHTML = "";
      for(let n = 0; n < data.data.length; n++){
        
           const p = document.createElement('div');
           p.innerHTML = `<div class="card" id="${data.data[n].id}">
                            <p class="concept">${data.data[n].concept}</p>
                            <p class="ammount">${(data.data[n].ammount).toLocaleString('en-US', {style: 'currency',currency: 'DOP',})}</p>
                          </div>
                          <p class="deleteButton" idAsign=${data.data[n].id}>Delete</p>
                          `;
          p.classList.add('divCard');
          
        //Append everything to main container
            container.append(p);  
      }

      document.querySelectorAll('.deleteButton').forEach(e => {
        e.addEventListener('click', el => {
          console.log(`${url}/transactions/${e.getAttribute('idAsign')}`);
          console.log({
            method: "DELETE",
            headers: {
          'Authorization': '7399c3fe-456c-4459-9750-c6402b00d0cd'
          }
          })
          fetch(`${url}/transactions/${e.getAttribute('idAsign')}`,{
            method: "DELETE",
            headers: {
          'Authorization': '7399c3fe-456c-4459-9750-c6402b00d0cd'
          }

          }).then(res => LoadTransactions()).catch(err => console.log(err));
        })
      })

      card = document.querySelectorAll('.card');

      card.forEach(e => {
        e.addEventListener('click', el => {
          const id = e.id;
          for(let i = 0; i < transactions.data.length; i++){
            if(transactions.data[i].id == id){
              container.innerHTML = `
              <div class="transDescrip">
                <p class="desc1ndP">Concept: </p>
                <p class="desc2ndP">${transactions.data[i].concept}</p>
                <input type="button" value="Back" class="back">
                <input type="button" value="Edit" class="edit">
              </div>
              <div class="transDescrip">
                <p class="desc1ndP">Ammount: </p>
                <p class="desc2ndP">${transactions.data[i].ammount}</p>
              </div>
              <div class="transDescrip">
                <p class="desc1ndP">Date: </p>
                <p class="desc2ndP">${new Date(transactions.data[i].date).toLocaleDateString()}</p>
              </div>
              `
              if(transactions.data[i].description != ''){
                container.innerHTML +=`
              <div class="transDescrip">
                <p class="desc1ndP">Description: </p>
                <p class="desc2ndP">${transactions.data[i].description}</p>
              </div>
            
              `
              }
              container.classList.add('descp');

              var back = document.querySelector('.back');
              document.querySelector('#title').innerHTML = 'Description'

              back.addEventListener('click', e =>{
                LoadTransactions();
                document.querySelector('#title').innerHTML = 'Transactions'
                container.classList.remove('descp');

              })

              break;
            }
          }
        })
      })
  })
    .catch(function(error) {
      console.log(error);
    });
}


function Acountdisplay() {
  container.innerHTML = '';
    title.innerHTML = 'Cuentas';
    for(let n = 0; n < accounts.data.length; n++){
      
      const p = document.createElement('div');
      p.innerHTML = `<div class="card" id="${accounts.data[n].id}">
       <div class="card-info">
         <h2>${(accounts.data[n].type)}</h2>
         <p>${accounts.data[n].currency}</p>
       </div>
     </div>`;
   //Append everything to main container
       container.append(p);
       
 }

}

 function NewTransaction() {
  const conceptTra = document.querySelector("#concepto").value;
  const ammountTra = document.querySelector("#monto").value;
  const descTra = document.querySelector("#descripcion").value;
  const idAcount = document.querySelector("#accounts_select").value;
  const idUser = '7399c3fe-456c-4459-9750-c6402b00d0cd';
  let today = new Date();
  
  const infoTra = {"concept": `${conceptTra}`, 
                "description": `${descTra}`, 
                "ammount": ammountTra, 
                "date": `${today}`, 
                "accountId": `${idAcount}`,
                "candidateId": '7399c3fe-456c-4459-9750-c6402b00d0cd'}

                
                  fetch(url+"/transactions", {
                    method: "POST",
                    headers: {
                      "Authorization" : '7399c3fe-456c-4459-9750-c6402b00d0cd',
                      "Content-type" :"application/json"
                    },
                    body: JSON.stringify(infoTra)
                    
                
                 }).then(res => {res.json()})
                  .then(data => console.log(data))

                }
              
  