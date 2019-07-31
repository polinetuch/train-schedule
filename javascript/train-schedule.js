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

// button for adding train information
$("#submit").on("click", function(event) {
  event.preventDefault();

  // grabbed the user input
  var trainName = $("#train-input")
    .val()
    .trim();
  var destination = $("#destination-input")
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
    destination: destination,
    frequency: frequency,
    dataAdded: firebase.database.ServerValue.TIMESTAMP
  };

  // upload the train data to the database
  database.ref().push(newTrainInfo);

  // log all the information to console
  console.log(newTrainInfo.name);
  console.log(newTrainInfo.first);
  console.log(newTrainInfo.destination);
  console.log(newTrainInfo.frequency);

  alert("New Train Information Successfully Added");

  // Clear all of the text-boxes
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
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  // First
  console.log(firstTrain);
  var firstTrainTime = moment(firstTrain, "hh:mm");
  console.log(firstTrainTime);

  // Current Time
  var currentTime = moment();
  console.log(currentTime);
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTrainTime), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var nextArrivalTime = diffTime % frequency;
  console.log(nextArrivalTime);

  // Minute Until Train
  var tMinutesTillTrain = frequency - nextArrivalTime;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrainTime = moment()
    .add(tMinutesTillTrain, "minutes")
    .format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("hh:mm"));

  // create new row to store the new information added by user
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrainTime),
    $("<td>").text(tMinutesTillTrain),
    refreshTimeAndMinute()
  );

  // append the new row to the table
  $("#trainList").append(newRow);

  function refreshTimeAndMinute() {
    x = 60;
    setTimeout(refreshTimeAndMinute, 60000);
  }
});
