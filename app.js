// get peer id (hash) from URL (mata in din Id efter we adressen med ¤+id ex "#raf")
const myPeerId = location.hash.slice(1);

// connect to peer server
peer = new Peer(myPeerId, {
  // stor bokstav i new Peer betyder att dett är en ny class
  host: "glajan.com",
  port: 8443,
  path: "/myapp",
  secure: true,
});
// Print peer Id on connetion "open" event.
peer.on("open", (id) => {
  const myPeerIdEl = document.querySelector(".my-peer-id");
  myPeerIdEl.innerText = myPeerId;
});
peer.on("error", (errorMessage) => {
  console.error(errorMessage);
});

// event lsitener for click "refresh list "
const ListPeersButtonEl = document.querySelector(".list-all-peers-button");
const peersEl = document.querySelector(".peers");
ListPeersButtonEl.addEventListener("click", () => {
  // go in på Peerjs.com / lägg till
  peer.listAllPeers((peers) => {
    const listItems = peers.filter((peerId) => {
      if (peerId === peer._id) return false;
      return true;
    });
    const listItemsString = listItems
      .map((peer) => {
        return `<li>
        <button class ="connect-button peerId-${peer}">${peer}</button>
        </li>`;
      })
      .join("");
    const newPeerListItem = document.createElement("ul");
    newPeerListItem.innerHTML = listItemsString;
    peersEl.appendChild(newPeerListItem);
  });
});
