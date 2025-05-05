const lbPneding = document.querySelector("#lbl-pending");
const deskHeader = document.querySelector("h1");
const noMoreAlert = document.querySelector(".alert");
const btnDraw = document.querySelector("#btn-draw");
const btnFinish = document.querySelector("#btn-finish");
const currentTicket = document.querySelector("small");



const searchParams = new URLSearchParams( window.location.search )
console.log(searchParams);


if ( !searchParams.has('escritorio') ) {
    console.log('si entro');
    
    window.location = 'index.html';
    throw new Error('Escritorio es requerido')
}

const deskNumber = searchParams.get("escritorio")
let workingTicket = null;
deskHeader.innerText = deskNumber

function checkTicketCount( initialCount = 0 ){
    if ( initialCount === 0 ) {
        noMoreAlert.classList.remove('d-none');
    }else{
        noMoreAlert.classList.add('d-none');
    }
    lbPneding.innerHTML = initialCount
}


async function loadInitialCount() {
    const pendingTickets = await fetch('/api/ticket/pending').then( resp => resp.json() )
    checkTicketCount( pendingTickets.length )

}

async function getTicket(){
    await finishTicket();
    const { status, ticket, message } = await fetch(`/api/ticket/draw/${ deskNumber }`).then( resp => resp.json() );

    if(status === 'error' ){
        currentTicket.innerText = message
        return
    }

    workingTicket = ticket;
    currentTicket.innerText = ticket.number

}

async function finishTicket() {
    if (!workingTicket) return;

    const { status, message } = await fetch(`/api/ticket/done/${ workingTicket.id }`, {method: 'PUT'}).then( resp => resp.json() );

    if( status === 'ok' ){
        workingTicket = null;
        currentTicket.innerText = 'Nadie'
    }
}




function connectToWebSockets() {

    const socket = new WebSocket( 'ws://localhost:3000/ws' );
  
    socket.onmessage = ( event ) => {
        
        
      const { payload, type } = JSON.parse( event.data )
      if (type === 'on-ticket-count-changed') {

        checkTicketCount( payload )
      }
    //   console.log(payload);
    return
      
    };
  
    socket.onclose = ( event ) => {
      console.log( 'Connection closed' );
      setTimeout( () => {
        console.log( 'retrying to connect' );
        connectToWebSockets();
      }, 1500 );
  
    };
  
    socket.onopen = ( event ) => {
      console.log( 'Connected' );
    };
  
}
  


btnDraw.addEventListener('click', getTicket)
btnFinish.addEventListener('click', finishTicket)



loadInitialCount();
connectToWebSockets();