var firebaseConfig = {
      apiKey: "AIzaSyDL3WFvgdGJeYNs328L7PDRVrr42zwr6L8",
      authDomain: "kwitter-665da.firebaseapp.com",
      databaseURL: "https://kwitter-665da-default-rtdb.firebaseio.com",
      projectId: "kwitter-665da",
      storageBucket: "kwitter-665da.appspot.com",
      messagingSenderId: "382606967465",
      appId: "1:382606967465:web:65ed34f681d2f2c538dfb8"
};
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome, " + user_name + "!";

function getData() {
      firebase.database().ref("/").on('value', function(snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function(childSnapshot) {
                  childKey  = childSnapshot.key;
                  Room_names = childKey;
                  //Start code
                  console.log("Room - " + Room_names);
                  document.getElementById("output").innerHTML += 
                  "<div class='room_name' id=" + Room_names + " onclick='goToRoom(this.id)'>#" + Room_names + "</div>"
                  //End code
            });
      });
}
getData();

function addRoom() {
      var roomName = document.getElementById("room_name").value;
      firebase.database().ref("/").child(roomName).update({});
      goToRoom(roomName);
}

function goToRoom(room) {
      localStorage.setItem("room", room);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room");
      location = "index.html";
}