// Web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAn-dOQYlVkZEbUYT27XeSehkt_kAfm9Wg",
  authDomain: "train-schedule-1b4d2.firebaseapp.com",
  databaseURL: "https://train-schedule-1b4d2.firebaseio.com",
  projectId: "train-schedule-1b4d2",
  storageBucket: "",
  messagingSenderId: "216924017587",
  appId: "1:216924017587:web:b03a79a7e602d0a9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// create a variable to reference the database
var database = firebase.database();

// // initial values
// var trainName = "";
// var destination = "";
// var firstTrain = "";
// var frequency = "";
// var nextArrival = "";
// var minuteAway = "";

// button for adding train information
$("#submit").on("click", function(event) {
  event.preventDefault();

  // grabbed the user input
  var trainName = $("#train-input")
    .val()
    .trim();
  var destinationTr = $("#destination-input")
    .val()
    .trim();
  var firstTrain = $("#firstTrain-input")
    .val()
    .trim();
  var frequency = $("#frequency-input")
    .val()
    .trim();
  var newTrainInfo = {
    name: trainName,
    first: firstTrain,
    destination: destinationTr,
    time: frequency
  };

  // upload the train data to the database
  database.ref().push(newTrainInfo);

  // log all the information to console
  console.log(newTrainInfo.name);
  console.log(newTrainInfo.first);
  console.log(newTrainInfo.destination);
  console.log(newTrainInfo.time);

  alert("New Train Information Successfully Added");

  // Clear all of the text-boxed
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// push the value to store in firebase

// database.ref().on("child_added", function(childSnapshot) {
//   var sv = childSnapshot.val();
//   console.log(sv.trainName);
//   console.log(sv.firstTrain);
//   console.log(sv.destination);
//   console.log(sv.frequency);

//   // change the HTML to reflect the value
//   $("#trainList").append(
//     "<tr><td class='trainName'>" +
//       sv.trainName +
//       "</td><td class='destination'>" +
//       sv.destination +
//       "</td><td class='firstTrain'" +
//       sv.firstTrain +
//       "</td><td class='frequency'>" +
//       sv.frequency +
//       "</td>"
//   ),
//     function(errorObject) {
//       console.log("Errrors handled: " + errorObject.code);
//     };
// });
