      var config = {
        apiKey: "AIzaSyDRlLk8PSaKx_qXe-NIU37Xwz644X6HUXo",
        authDomain: "my-project-test-15b01.firebaseapp.com",
        databaseURL: "https://my-project-test-15b01.firebaseio.com",
        projectId: "my-project-test-15b01",
        storageBucket: "my-project-test-15b01.appspot.com",
        messagingSenderId: "899760887490"
  };


  firebase.initializeApp(config);

var database = firebase.database();


  database.ref("/trains").on("child_added", function(snapshot) {

      var name = snapshot.val().name;
      var Destination = snapshot.val().Destination;
      var time = snapshot.val().time;
      var Frequency = snapshot.val().Frequency;
      var timeMoment = moment(time, "HH:mm");  

      var nextTrainTime = timeMoment;
      // This is where it calculates if the next train time is in the past and provides new time. 
      if (moment().isAfter(timeMoment)){
         nextTrainTime = getNextTrain(timeMoment, Frequency);

      }

      var minutesAway = nextTrainTime.diff(moment(),'minutes');

      var tableRow = $("<tr>");
      var tableDisplay = $("<td>");
      tableRow.append(tableDisplay);
      tableDisplay.text(name);  

      var tableDisplay2 = $("<td>");
      tableRow.append(tableDisplay2);
      tableDisplay2.text(Destination);  

      var tableDisplay3 = $("<td>");
      tableRow.append(tableDisplay3);
      tableDisplay3.text(Frequency); 

      var tableDisplay4 = $("<td>");
      tableRow.append(tableDisplay4);
      tableDisplay4.text(nextTrainTime.format("HH:mm"));  

      var tableDisplay5 = $("<td>");
      tableRow.append(tableDisplay5); 
      tableDisplay5.text(minutesAway);

      $("tbody").append(tableRow); 

    

  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
 

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      // prevent form from trying to submit/refresh the page
      event.preventDefault();

      // Capture User Inputs and store them into variables
      var name = $("#name-input").val().trim();
      var Destination = $("#Destination-input").val().trim();
      var time = $("#time-input").val().trim();
      var Frequency = $("#Frequency-input").val().trim();
      

    

      // Save the new price in Firebase
        database.ref("/trains").push({
         name: name, 
         Destination: Destination,  
         time: time,  
         Frequency: Frequency 
        });

      // Output all of the new information into the relevant HTML sections
      
      
    });


      function getNextTrain(firstTime, frequency){ 
        var currentTime = moment(); 
        var timeBetween = currentTime.diff(firstTime, 'minutes');
        var remainder = timeBetween % frequency;
        var addedTime = frequency - remainder; 
         
        return  currentTime.add(addedTime, 'minutes'); 
      }
