// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRJ3DxdJSF6DohZcGNW_2vUDH0Bbpx_qo",
    authDomain: "example-90dac.firebaseapp.com",
    databaseURL: "https://example-90dac.firebaseio.com",
    projectId: "example-90dac",
    storageBucket: "example-90dac.appspot.com",
    messagingSenderId: "136918496173"
};
firebase.initializeApp(config);

var productPanel = document.getElementById("productPanel");
//var dbRef = firebaseRef.child("BoodschappenLijst");
var dbRef  = firebase.database().ref();

dbRef.on('value', function (snap) {

//dbRef.on('value', snap => {
    //productPanel.innerText = JSON.stringify(snap.val(), null, 3);
    //productPanel.innerHTML += data;



    //////////////////////
    //var dbSnap = snap.val();

    //console.log(dbSnap);
    //console.log(Object.keys(dbSnap).length);


    //var myInfo = "{{#each BoodschappenLijst}} <li>Product name: {{@key}} </li> {{/each}}";
    //var myInfo = "<li>Product name:{{Appel}}</li>";
    var myInfo = document.getElementById("productTemplate").innerHTML;

    //var myInfo="<h3>Product name:{{Appel}}</h3>";
    var template = Handlebars.compile(myInfo);
    //var data = template(dbSnap);
    var data = template(snap.val());


    document.getElementById("productPanel").innerHTML= data;
    document.getElementById("firebaseTitle").innerHTML = "BurningDB" +"<br>"+Object.keys(snap.val())[0];
    console.log(snap.val());
    /////////////////////////

});

//dbRef.on('value', snap => console.log(snap.val()) );