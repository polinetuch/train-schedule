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

// initial values
var firstTrain = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minuteAway = "";

// capture button click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // grabbed the values from text-boxes
  firstTrain = $("#train-input")
    .val()
    .trim();
  destination = $("#destination-input")
    .val()
    .trim();
  frequency = $("#frequency-input")
    .val()
    .trim();

  // push the value to store in firebase
  database.ref().push({
    firstTrain: firstTrain,
    destination: destination,
    frequency: frequency
  });
});
