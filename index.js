// variables
var inputText   = document.getElementById("inputText");
var inputAmount = document.getElementById("inputAmount");
var imgContainer= document.getElementById("imgContainer");
var submitBtn   = document.getElementById("submitBtn");
//var firebaseRef = firebase.database().ref();


// buienradar

/*
$('#container').load('http://google.com'); // SERIOUSLY!

$.ajax({
    url: 'http://news.bbc.co.uk',
    type: 'GET',
    success: function(res) {
        var headline = $(res.responseText).find('a.tsh').text();
        alert(headline);
    }

});
*/

var ctx = document.getElementById("buienChart").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});


//$('#buienradar').innerHTML =
//$('#buienradar').load('https://www.buienradar.nl/ #4c73ae97-8c14-4956-ac0a-651a2bb1b1e4');
/*$( "#buienradar" ).load( "www.buienradar.nl" , function(responseTxt, statusTxt, xhr){
    if(statusTxt == "success")
        alert("External content loaded successfully!");
    if(statusTxt == "error")
        alert("Error: " + xhr.status + ": " + xhr.statusText);
});
*/
/*$.ajax({
    url:'http://www.buienradar.nl/',
    type:'GET',
    //dataType: "jsonp",
    success: function(data){
        $('#buienradar').html($(data).find('#4c73ae97-8c14-4956-ac0a-651a2bb1b1e4').html());
    }
});
* /

$("#buienradar")
    //.html('<object data="http://your-website-domain"/>');
    .html('<object data="http://www.buienradar.nl #4c73ae97-8c14-4956-ac0a-651a2bb1b1e4"/>');
    //.load( "http://www.buienradar.nl");

/*
$.getJSON('http://anyorigin.com/get?url=google.com&callback=?', function(data){
    $('#output').html(data.contents);
});*/

// firebase
function submitClick() {
    //firebaseRef.child("BoodschappenLijst").child(inputText.value).set(inputAmount.value);
    //dbRef.child("BoodschappenLijst").child(inputText.value).set(inputAmount.value);
    /*
    dbRef.child("BoodschappenLijst").child(inputText.value).set({
        Amount : inputAmount.value,
        Img : imgContainer.src
        //Img.child((dbRef.child("BoodschappenLijst").child(inputText.value).child("Img")).lenght) : imgContainer.src
    });
    */

    //TOD O its not a get need a snapshot!!//
    //console.log(dbRef.child("BoodschappenLijst").child(inputText.value).child("Amount"));
    //console.log(dbRef.child("BoodschappenLijst").child(inputText.value).child("Amount"));


    dbRef.child("BoodschappenLijst").child(inputText.value).child("Amount").set(inputAmount.value);
    if (imgContainer.src.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        dbRef.child("BoodschappenLijst").child(inputText.value).child("Img").push({
            Scr: imgContainer.src,
            Time: firebase.database.ServerValue.TIMESTAMP
        });
    }

    //var index = (dbRef.child("BoodschappenLijst").child(inputText.value).child("Img")).lenght;
    //dbRef.child("BoodschappenLijst").child(inputText.value).child("Img").child(index).set(imgContainer.src);

    inputText.value = "";
    inputAmount.value = 1;

    imgContainer.src = "";
    imgContainer.classList.add("imgThumbnail");
    imgContainer.classList.remove("imgContainer");


    //ev.preventDefault();
};

//////////////////////////////////////////////////

// drag and drop functions
function allowDrop(ev) {
    ev.preventDefault();
};


function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}


function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.src = data;
    ev.target.classList.add("imgContainer");
    ev.target.classList.remove("imgThumbnail");
};


function dragHtml(ev) {
    //ev.dataTransfer.setData("text/html", ev.target);
    //console.log(ev.target);
    ev.dataTransfer.setData("text/html", '"'+ev.target.innerHTML+'"');
    ev.dataTransfer.effectAllowed = "copy";
    console.log('"'+ev.target.innerHTML+'"');
}

function dropHtml(ev) {
    /*
    var data = ev.dataTransfer.getData("html");
    ev.target.innerHTML += data;
    //console.log(ev.target.innerHTML);
    console.log(data);
    ev.preventDefault();
    */

    var data = ev.dataTransfer.getData("text/html");
    console.log(data);
    //this.content = data;
    ev.target.innerHTML = data;
    ev.preventDefault();
}

/*
 function drop(ev) {
 ev.preventDefault();
 //var data = ev.dataTransfer.getData("text" || "htmlData");
 var data = ev.dataTransfer.getData("html");
 //var data = JSON.parse(ev.dataTransfer.getData("html"));
 this.innerHTML += data;
 console.log(ev);
 //this.target.classList.add("imgContainer");
 //this.target.classList.remove("imgThumbnail");
 }
 */

///////////////////////////////////////////////////////////

// Done btn
function doneBtn(val, index) {
    dbRef.child("BoodschappenLijst").child(val).child("Amount").set(0);
};

// Done edit
function editBtn(val, amount, img) {
    //console.log(val);
    inputText.value = val;
    inputAmount.value = amount;
    imgContainer.src = img;
    imgContainer.classList.add("imgContainer");
    imgContainer.classList.remove("imgThumbnail");

};

///////////////////////////  Handlebars register /////////////////////////////
Handlebars.registerHelper('unpackFBaseImg', function (data) {
    //console.log(data);
    keysSorted = Object.keys(data).sort(function(a,b){return data[a].Time-data[b].Time});
    console.log(data[keysSorted[keysSorted.length-1]].Scr);
    return data[keysSorted[keysSorted.length-1]].Scr || data;
});

Handlebars.registerHelper('imgSliderCreate', function (imgData) {
    console.log(imgData);
    if (imgData != null) {
        keysSorted = Object.keys(imgData).sort(function (a, b) {
            return imgData[a].Time - imgData[b].Time
        });
        //console.log(data[keysSorted[keysSorted.length-1]].Scr);
    }

    var templateData = document.getElementById("imgSliderTemplate").innerHTML;
    var template = Handlebars.compile(templateData);
    var templateRender = template( imgData );
    //imgData["source"] = templateRender; //imgData.html" = templateRender;
    //console.log(imgData);

    imgData.indexValue = 1;

    //return data[keysSorted[keysSorted.length-1]].Scr || data;
    return templateRender;
});

Handlebars.registerHelper('NotEqual', function(v1, v2, options) {
    if(v1 != v2) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper('lastArray', function(list) {
    return list;
});

Handlebars.registerHelper('var',function(name, value, context){
    this[name] = value;
});

Handlebars.registerHelper('?',function(question, trueValue, falseValue){
    if (question == true){
        return trueValue;
    }
    return falseValue;
});