var Q = {};

function getQ(id){
	jQuery.ajax({
		url : 'getQuestionnaire',
		processData : true,
		dataType : "json",
		data : {
			id:id,
		},
		success : function(data) {
			formQ(data);
		}
	});
}

function formQ(data){
	Q = data;
	var title = data['title'];
	var introduction = data['introduction'];
	var questions = data['questions'];
	var length = questions.length;
	var result = [];
	
	//create title & introduction
	$("#questionnaire").html("<h1 class='text-muted' style='color:black' align='center'><font size='10'>" + title + "</font></h1>" +
			"<p align='center'>" + introduction + "</head>");
	//create questions
	for(var i = 0 ; i < length ; i++){
		var question = questions[i];
		addStem(question, i);
		var type = question['type'];
		if(type=="Subjective") result[i] = addSubjective(question, i);
		else if(type=="Single") result[i] = addSingle(question, i);
		else if(type=="Multiple") result[i] = addMultiple(question, i);
		else if(type=="Slider") result[i] = addSlider(question, i);
	}
	//alert(result);
}

function addStem(question, i){
	var form = document.getElementById("form");
	//create stem
	var div = document.createElement("div");
	div.id = i;
	div.className = "container";
	form.appendChild(div);
	$("#"+i).html("<p2><font size='4'>" + (i+1)  + " "+ question['stem'] + "</font>")
	if(question['required']==true){
		$("#"+i).append("<font color='red' size='4'>&nbsp*</font>");
	}
	$("#"+i).append("</p2>");
}

function addSubjective(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 0);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	if(question['required']==true){
	$("#"+i + "div").html("<div class='col-lg-10'><div><input class='form-control' required name=" + i + "></input></div></div>" +
			"");
	}
	else{
		$("#"+i + "div").html("<div class='col-lg-10'><input class='form-control' name=" + i + "></input></div>" +
		"");
	}
	return;
}

function addSingle(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 1);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	for(var j = 0 ; j < question['options'].length; j++){
		if(question['options'][j]['hasWords']==true){
			if(question['required']==false){
	$("#"+i + "div").append("<p><div class='radio' ><label  style='float:left'><input type='radio' value=" + j +" name=" + i + ">" +
			"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
		$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'></div>");
	}else{
		$("#"+i + "div").append("<p><div class='radio' ><label  style='float:left'><input required type='radio' value=" + j +" name=" + i + ">" +
				"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'></div>");
	}
			}
		else{
			if(question['required']==false){
			$("#"+i + "div").append("<p><div class='radio' ><label><input type='radio' value=" + j +" name=" + i + ">" +
					"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			}
			else{
				$("#"+i + "div").append("<p><div class='radio' ><label><input required type='radio' value=" + j +" name=" + i + ">" +
						"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
			}
		}
	$("#"+i + "div").append("</div></p>");
	}
	return;
}

function addMultiple(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 2);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	$("#"+i + "div").append("<strong><div id='" + i + "message' class='error'></div></strong>")
	for(var j = 0 ; j < question['options'].length; j++){
		if(question['options'][j]['hasWords']==true){
			if(question['required']==false){
			$("#"+i + "div").append("<p><label  style='float:left'><input type='checkbox' value=" + j +" name=" + i + 
					 ">" +
					"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
				$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'>");
			}
			else{
				$("#"+i + "div").append("<p><label  style='float:left'><input required type='checkbox' value=" + j +" name=" + i +
						">" +
						"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					$("#"+i + "div").append("<div><input  name='" + i + "_" + j + "words'>");
			}
			}
				else{
					if(question['required']==false){
					$("#"+i + "div").append("<p><label><input type='checkbox' value=" + j +" name=" + i +
							">" +
							"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					}
					else{
						$("#"+i + "div").append("<p><label><input required type='checkbox' value=" + j +" name=" + i + 
								">" +
								"<font size='4'><strong>" + question['options'][j]['option'] + "</strong></font></label>");
					}
				}
			$("#"+i + "div").append("</p>");
			}
	return;
}

function addSlider(question, i){
	var div = document.getElementById(i);
	div.setAttribute("value", 3);
	var newDiv = document.createElement("div");
	newDiv.id = i + "div";
	newDiv.className = "container";
	div.appendChild(newDiv);
	if(question['required']==true){
	$("#"+i + "div").append("<p><div class='row'><div class='col-lg-6'  style='padding-top:10px'><div id='"+ i + "slider' style='padding-up:100px'></div>" +
			"<div class='col-lg-6'>" + question['min'] + "  " + question['mintext'] + "</div>" +
			"<div class='col-lg-6' align='right'>" + question['maxtext'] + "  " + question['max'] + "</div>" +
			"</div>" +
			"<div class='col-lg-1'><input class='form-control' id='"+ i +"input' name=" + i +" type='number' step='1' min=" + question['min'] + " max=" + question['max'] +"></div></div>" +
			"</p>");
	}
	else{
		$("#"+i + "div").append("<p><div class='row'><div class='col-lg-6'  style='padding-top:10px'><div id='"+ i + "slider' style='padding-up:100px'></div>" +
				"<div class='col-lg-6'>" + question['min'] + "  " + question['mintext'] + "</div>" +
				"<div class='col-lg-6' align='right'>" + question['maxtext'] + "  " + question['max'] + "</div>" +
				"</div>" +
				"<div class='col-lg-1'><input class='form-control' id='"+ i +"input' name=" + i +" type='number' step='1' min=" + (question['min']*1-1) + " max=" + question['max'] +"></div></div>" +
				"</p>");
	}
    var slider = $( "#"+i+"slider" ).slider({
        range: "min",
        min: question['min'] * 1,
        max: question['max'] * 1,
        value: question['min'],
        slide: function( event, ui ) {
            $( "#"+i+"input" ).val(ui.value );
          }
    });
    $( "#"+i+"input" ).val(question['min']*1 -1);
    $( "#"+i+"input" ).change(function() {
        slider.slider( "value", this.value );
      });
	return;
}

function submit(){
	var form = document.getElementById("form");
	var questions = form.childNodes;
	var length = questions.length;
	var result=[];
	for(var i = 0; i < length; i++){
		var answer = {};
		var type = document.getElementById(i).getAttribute("value");
		switch(type){
		case'0':
			answer['words'] = $("input[name='" + i +"'").val();
			//alert($("input[name='" + i + "'").val())}
			break;
		case'1':
			var optionid = $("input[name='" + i +"']:checked").val();
			answer['option'] = optionid;
			if(optionid == null) {
				answer['option'] = "";
				break;
			}
			if(Q['questions'][i]['options'][optionid*1]['hasWords']==true){
				answer['words'] = $("input[name='" + i +"_" + optionid + "words']").val();;
			}
			break;
		case'2':
	    	var a = document.getElementsByName(i);
	    	answer['option']="";
	    	answer['words']=[];
	    	var count = 0;
	    	for(var j=0; j<a.length; j++){
	    		if(a[j].checked){
	    			answer['option'] += j +",";
	    			if(Q['questions'][i]['options'][j*1]['hasWords']==true){
	    				var word = {};
	    				word['optionid'] = j;
	    				word['word'] = $("input[name='" + i +"_" + j + "words']").val();
	    				answer['words'].push(word);
	    				if(word['word']==""){
	    					document.getElementById(i + "message").innerText = "Please enter the message of option " + j;
	    		    		return;
	    				}
	    			}
	    			count += 1;
	    		}
	    	}
	    	if(count < Q['questions'][i]['min'] && count > 0){
	    		document.getElementById(i + "message").innerText = "Please choose equal or more than " + Q['questions'][i]['min'] + " options";
	    		return;
	    	}
	    	if(count > Q['questions'][i]['max']){
	    		$("#" + i + "message").innerText = "Please choose equal or less than " + Q['questions'][i]['max'] + " options";
	    		return;
	    	}
	    	break;
		case'3':
			var num = $("input[name='" + i +"'").val();
			answer['number'] = num;
		}
		result.push(answer);
	}
	alert(JSON.stringify(Q));
	if(!$("#form").validate().form()){
		return;
	}         
	jQuery.ajax({
		url : 'addAnswer',  //get content
		processData : true,
		dataType : "json",
		data : {
			time : ordertime,
			content : encodeURI(encodeURI(JSON.stringify(result)))
		},
		success : function(data) { //把title，id都放在里面
			alert("success")
		}
	});


}