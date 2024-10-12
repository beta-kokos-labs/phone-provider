/*    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }*/
alert(document.cookie)
function getCookie(name) {
    // Split document.cookie into individual cookies
    const cookies = document.cookie.split(';');

    // Loop through the cookies array
    for (let i = 0; i < cookies.length; i++) {
        // Trim whitespace and split the cookie name and value
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            // Return the value of the cookie
            return cookie.substring(name.length + 1);
        }
    }

    // Return null if the cookie is not found
    return null;
}

// Example usage

console.log(getCookie('phonenum'))
const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const peerIdInput = document.getElementById('peerIdInput');
const callButton = document.getElementById('callButton');
const endCallButton = document.getElementById('endCallButton');

const peer = new Peer('phone-user-number'+getCookie('phonenum')); // Create a new Peer instance
 
peer.on('open', (id) => {
    console.log(`My peer ID is: ${id}`);
    document.getElementById('id').innerText='PeerJS Audio Call number: '+getCookie('phonenum')
});

peer.on('call', (call) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            localAudio.srcObject = stream;
            call.answer(stream); // Answer the call with our audio stream
            call.on('stream', (remoteStream) => {
                remoteAudio.srcObject = remoteStream; // Play the remote audio stream
            });
            endCallButton.disabled = false;
        })
        .catch(err => console.error('Failed to get local stream', err));
});

callButton.addEventListener('click', () => {
    const peerId = peerIdInput.value;
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
            localAudio.srcObject = stream;
            const call = peer.call('phone-user-number'+peerId, stream); // Start a call
            call.on('stream', (remoteStream) => {
                remoteAudio.srcObject = remoteStream; // Play the remote audio stream
            });
            endCallButton.disabled = false;
        })
        .catch(err => console.error('Failed to get local stream', err));
});

endCallButton.addEventListener('click', () => {
    // Logic to end the call (you might want to keep track of call references)
    peer.disconnect(); // Disconnect the peer
    endCallButton.disabled = true;
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('worker.js');
}
