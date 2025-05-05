

console.log('Nuevo Ticket HTML');


const  lastTicket = document.querySelector("#lbl-new-ticket");
const generateTicket = document.querySelector("button")


function fetchLastTicket(){
    fetch('http://localhost:3000/api/ticket/last')
    .then(response => response.json())
    .then(data => {
        lastTicket.innerHTML = `Último ticket: ${data}`;
    })
}
const lastTicketText = fetchLastTicket();

generateTicket.addEventListener('click', () => {
    fetch('http://localhost:3000/api/ticket/', {method: 'POST'})
    
    fetchLastTicket();
}
);



console.log(lastTicket.innerHTML);
