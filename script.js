const localAudio = document.getElementById('localAudio');
const remoteAudio = document.getElementById('remoteAudio');
const peerIdInput = document.getElementById('peerIdInput');
const callButton = document.getElementById('callButton');
const endCallButton = document.getElementById('endCallButton');

const peer = new Peer(); // Create a new Peer instance

peer.on('open', (id) => {
    console.log(`My peer ID is: ${id}`);
    document.getElementById('id').innerText='PeerJS Audio Call ID: '+id
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
            const call = peer.call(peerId, stream); // Start a call
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
