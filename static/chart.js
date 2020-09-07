$(document).ready(function(){

    const xlabels = [1, 2, 3, 4, 5];
    const ylabels = [1, 2, 3, 4, 5];

    const firebaseConfig = {
      apiKey: "AIzaSyBYtzx3Pr2zAUbIGfcn1vs8yJpO9GrcAIY",
      authDomain: "masalacomedyclub-2d11a.firebaseapp.com",
      databaseURL: "https://masalacomedyclub-2d11a.firebaseio.com",
      projectId: "masalacomedyclub-2d11a",
      storageBucket: "masalacomedyclub-2d11a.appspot.com",
      messagingSenderId: "83902325262",
      appId: "1:83902325262:web:acdcbdf6f98798edc7525f",
      measurementId: "G-KSW6820C2R"
    };
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();


  var count = 10;
  var data = {
    labels : ['4 min ago', '  3 min ago', '2 min ago', '1 min ago', 'now'],
    datasets : [
      {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : xlabels
      },
      {
        fillColor : "rgba(151,187,205,0.5)",
        strokeColor : "rgba(151,187,205,1)",
        pointColor : "rgba(151,187,205,1)",
        pointStrokeColor : "#fff",
        data : ylabels
      }
    ]
  }
  // this is ugly, don't judge me
  var updateData = function(oldData){
    var dataSetA = oldData["datasets"][0]["data"];
    var dataSetB = oldData["datasets"][1]["data"];
    
    labels.shift();
    count++;
    labels.push(count.toString());

    var leadsRef = firebase.database().ref('testdata');
    leadsRef.on('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var childData = childSnapshot.val();
            var myJSON = JSON.stringify(childData);
            var pricenum = myJSON.match(/[\d\.]+/);
            pricenum = pricenum.join("");
            var pricenum = parseFloat(pricenum);


            
            console.log(ylabels);
        });
        
    
       });
      
  var optionsAnimation = {
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 10,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
  }
  
  // Not sure why the scaleOverride isn't working...
  var optionsNoAnimation = {
    animation : false,
    //Boolean - If we want to override with a hard coded scale
    scaleOverride : true,
    //** Required if scaleOverride is true **
    //Number - The number of steps in a hard coded scale
    scaleSteps : 20,
    //Number - The value jump in the hard coded scale
    scaleStepWidth : 10,
    //Number - The scale starting value
    scaleStartValue : 0
  }
  
  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("chart").getContext("2d");
  var optionsNoAnimation = {animation : false}
  var myNewChart = new Chart(ctx);
  myNewChart.Line(data, optionsAnimation);	
  
  setInterval(function(){
    updateData(data);
    myNewChart.Line(data, optionsNoAnimation)
    ;}, 2000
  );

  }
});




