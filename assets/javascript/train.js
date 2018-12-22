  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKpLL91iT_C6lecsRRJr2qj6OMw0MtmXc",
    authDomain: "trainhomework-a0ba0.firebaseapp.com",
    databaseURL: "https://trainhomework-a0ba0.firebaseio.com",
    projectId: "trainhomework-a0ba0",
    storageBucket: "trainhomework-a0ba0.appspot.com",
    messagingSenderId: "681349730871"
  };
  firebase.initializeApp(config);

  const database = firebase.database();



  $("#trainSubmit").on("click", function (event) {
    event.preventDefault();
        // Grabs user input
        let trName = $("#trainName").val().trim();
        let trDestination = $("#trainDestination").val().trim();
        let trArrival = $("#trainArrivalTime").val().trim(); 
        let trFrequency = $("#trainFrequency").val().trim();




        console.log(trArrival);

        // Creates local "temporary" object for holding employee data
        let newTr = {
            name: trName,
            destination: trDestination,
            arrival: trArrival,
            frequency: trFrequency
        };

        // Uploads employee data to the database
        database.ref().push(newTr);

        console.log(newTr.name);
        console.log(newTr.destination);
        console.log(newTr.arrival);
        console.log(newTr.frequency);


          // Clears all of the text-boxes
          $("#trainName").val("");
          $("#trainDestination").val("");
          $("#trainArrivalTime").val("");
          $("#trainFrequency").val("");


  });


database.ref().on("child_added", function(childSnapshot){

  let trName = childSnapshot.val().name;
  let trDestination =  childSnapshot.val().destination;
  let trArrival =  childSnapshot.val().arrival;
  let trFrequency =  childSnapshot.val().frequency;

  console.log(trName);
  console.log(trDestination);
  console.log(trArrival);
  console.log(trFrequency);


// *** Minutes until next Train *** //



// Create now variable and put it in HH:mm format
let now = moment().format("HH:mm");

// This is grabbing the string the user input, is expecting it in HH:mm format (make sure it matches how user is entering)
// and is creating a momentjs object that it can work with
let arrivalTime = moment(trArrival, "HH:mm");

// this is taking the now moment, expecting it in HH:mm format, then creates a moment object to use in comparison below.

let newNow = moment(now, "HH:mm");

// making comparison and spitting out minutes difference
let trDiff = arrivalTime.diff(newNow, "m");


console.log(now);
console.log(arrivalTime);
console.log(newNow);
console.log(trDiff);




//  console.log(minutesRemaining);











  let newRow = $("<tr>").append(
    $("<td>").text(trName),
    $("<td>").text(trDestination),
    $("<td>").text(trFrequency + " minutes"),
    $("<td>").text(trArrival),
    $("<td>").text(trDiff)
  );

  // Append the new row to the table
  $("#trainTable > tbody").append(newRow);



    // *** Nice Add. Add current time to header *** //


  function currentTime (){
    let date = moment().format("lll");
    $("#currentTime").text(date);
    setInterval(currentTime, 1000);
  }

  currentTime();
});