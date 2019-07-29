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
    firstTrain: firstTrain,
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

// create firebase event for adding train information to the database
// and a row in the html when user click submit
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // variable to store the information
  var trainName = childSnapshot.val().name;
  var destinationTr = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  console.log(trainName);
  console.log(destinationTr);
  console.log(firstTrain);
  console.log(frequency);

  // create new row to store the new information added by user
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destinationTr),
    $("<td>").text(firstTrain),
    $("<td>").text(frequency)
  );

  // append the new row to the table
  $("#trainList").append(newRow);
});
