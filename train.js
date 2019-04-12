
// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyB7Od5wggF8-rKySqXr0USygzkvDS6GRsw",
    authDomain: "trains-4af1b.firebaseapp.com",
    databaseURL: "https://trains-4af1b.firebaseio.com",
    projectId: "trains-4af1b",
    storageBucket: "trains-4af1b.appspot.com",
    messagingSenderId: "928605807533"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#submit-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var trainTime = moment($("#traintime-input").val().trim(), "HH:mm:ss am/pm").format('LTS');
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    train: trainName,
    place: destination,
    time: trainTime,
    cycles: frequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.train);
  console.log(newTrain.place);
  console.log(newTrain.time);
  console.log(newTrain.cycles);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#traintime-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var nTrain = childSnapshot.val().train;
  var nDestination = childSnapshot.val().place;
  var nTime = childSnapshot.val().time;
  var nCycles = childSnapshot.val().cycles;

  // USING moment to obtain next arrival time

var a = moment($("#traintime-input"));

console.log (a + "first train time");

var b = moment().unix();
console.log (b + "now");

var duration = a.diff(b);      
console.log(duration); 
if (duration < 0 ){
    duration = b.diff(a);
};

var c = duration/60000;
console.log (c + "conversion in minutes");

//var startTime= moment("03:00:00 am", "HH:mm:ss a");
//var endTime = moment().format('LTS');
//console.log(endTime + " now");
//This function is not working, not sure why
//var duration = moment(startTime).diff(moment(endTime));
//console.log(duration);


//var minutes = parseInt(duration.Minutes());
//console.log ( minutes +'total minutes difference');

//var trainCycle = nCycles ;
//var completeTrack = c/trainCycle;

var completeTrack = c/nCycles;

console.log (completeTrack + "total cycles already ran");

var totalminutes = nCycles * completeTrack;
console.log (totalminutes + "total minutes for all cycles");

var minutesAway = totalminutes - c;
console.log (minutesAway + "minutes away");


  //first leaving time, and you have a frequency.
  //if now - leaving > frequency, add frequency to leaving and recheck.

  //if now - leaving !> frequency, then now % leaving will return the time remaining.

  // 10am
  // 30min.
  // 1:15

  // 1:15 - 1pm = 1hr, 15min. 1:15 % 1 = 

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(nTrain),
    $("<td>").text(nDestination),
    $("<td>").text(nTime),
    $("<td>").text(nCycles),
    $("<td>").text(minutesAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

