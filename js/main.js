
var clickedTime;
var createdTime;
var reactionTime;
var imageCount=0;
var folder=getRndInteger(0,2);

var mapping={"0": {"0": 'nt',
	 "1": 'nt',
	 "2": 'contour',
	 "3": 'contour',
	 "4": 'blended',
	 "5": 'blended',
	 "6": 'blended',
	 "7": 'blended',
	 "8": 'contour',
	 "9": 'blended',
	 "10": 'nt',
	 "11": 'contour',
	 "12": 'blended',
	 "13": 'contour',
	 "14": 'nt',
	 "15": 'blended',
	 "16": 'contour',
	 "17": 'nt',
	 "18": 'nt',
	 "19": 'contour',
	 "20": 'nt'},
"1": {"0": 'blended',
	 "1": 'contour',
	 "2": 'blended',
	 "3": 'nt',
	 "4": 'contour',
	 "5": 'nt',
	 "6": 'contour',
	 "7": 'blended',
	 "8": 'nt',
	 "9": 'contour',
	 "10": 'nt',
	 "11": 'contour',
	 "12": 'nt',
	 "13": 'nt',
	 "14": 'contour',
	 "15": 'contour',
	 "16": 'blended',
	 "17": 'nt',
	 "18": 'blended',
	 "19": 'blended',
	 "20": 'blended'},
"2": {"0": 'nt',
	 "1": 'contour',
	 "2": 'blended',
	 "3": 'contour',
	 "4": 'blended',
	 "5": 'blended',
	 "6": 'contour',
	 "7": 'blended',
	 "8": 'contour',
	 "9": 'contour',
	 "10": 'nt',
	 "11": 'nt',
	 "12": 'nt',
	 "13": 'nt',
	 "14": 'blended',
	 "15": 'contour',
	 "16": 'nt',
	 "17": 'blended',
	 "18": 'blended',
	 "19": 'nt',
	 "20": 'contour'
	}
}

var results={'blended': [], 'nt': [], 'contour': [], 'folder': folder, 'conf': 'none'}

var button = document.getElementById('show_button')
button.addEventListener('click',start,false);

function start() {
    this.style.display = 'none';
    document.getElementById('box').src='imgs/' + folder +'/' + imageCount + '.jpg';
    makeBox();
} 

function getRndInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function makeBox() {
    var time = Math.random();
    time = time * 2000;

    setTimeout(function() {

        var top = Math.random();
        top = top * 200;
        var left = Math.random();
        left = left * 200;

        document.getElementById("box").style.top = top + "px";
        document.getElementById("box").style.left = left + "px";

        document.getElementById("box").style.display = "block";
        createdTime = Date.now();
        imageCount++
    }, time);

}

function theyClicked() {

	if (!document.getElementById("printReactionTime")) {
		return
	}

    clickedTime = Date.now();

    reactionTime = (clickedTime - createdTime) / 1000;

    document.getElementById("printReactionTime").innerHTML="Your last reaction time was: " + reactionTime + "seconds";
    var imType = mapping[String(folder)][String(imageCount)]
    results[imType].push(reactionTime)

    document.getElementById("box").style.display = "none";
	document.getElementById("box").src = 'imgs/' + folder +'/' + imageCount + '.jpg';

	mapping[String(folder)]

	if(imageCount==21){
		document.getElementById("instructions").style.display="none";
		document.getElementById("readfirst").style.display="none";
		document.getElementById("surveytext").style.display= "block";
		document.getElementById("survey-blend").style.display= "inline";
		document.getElementById("survey-nt").style.display= "inline";
		document.getElementById("survey-contour").style.display= "inline";
	}
	else{
	    makeBox();
	}
}

function surveyClickBlend() {
	results['conf'] = 'blended';
	finishAndPostResults();
}

function surveyClickNT() {
	
	results['conf'] = 'nt';
	finishAndPostResults();

}
function surveyClickContour() {

	results['conf'] = 'contour';
	finishAndPostResults();
}

function finishAndPostResults() {
	document.getElementById("surveytext").style.display="none"
	document.getElementById("survey-blend").style.display="none"
	document.getElementById("survey-nt").style.display="none"
	document.getElementById("survey-contour").style.display="none"

	document.getElementById("thanks").innerHTML="Thank you for your kind participation!!";
	document.getElementById("results").innerHTML=JSON.stringify(results);

	const headers = new Headers()
	headers.append("Content-Type", "application/json")

	const options = {
	  method: "POST",
	  headers,
	  mode: "cors",
	  body: JSON.stringify(results),
	}

	fetch("https://2acc6819903828c56b5248a898070f98.m.pipedream.net", options).then(response => {
	  console.log(response)
	}).catch(err => {
	  console.error("[error] " + err.message)
	})
}