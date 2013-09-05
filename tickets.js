$(document).ready(function() {

    var cookie=getCookie("ticket");
    
	if ( cookie== "set") {
		
		document.location.href="thank_you.html";
	}

	$("#datepicker").datepicker();
	$("#datepicker").datepicker("setDate", new Date());
	$("#datepicker").datepicker('option', {
		minDate : new Date(),
		maxDate : '+1y'
	});

	$('#child_number').change(function() {
		var child = 0;
		var adult = 0;
		var num = 1000000;
		window.localStorage.setItem("adult", adult);
		window.localStorage.setItem("number", num);
		window.localStorage.setItem("adult", adult);
		//check if child_number and adult_number is integer
		n = ~~Number($("#child_number").val());
		if (String(n) === $("#child_number").val() && n >= 0) {
			var child = $("#child_number").val();
			window.localStorage.setItem("child", child);
		}
		n2 = ~~Number($("#adult_number").val());
		if (String(n2) === $("#adult_number").val() && n2 >= 0) {
			var adult = $("#adult_number").val();
			window.localStorage.setItem("adult", adult);
		}
		var total = 10 * adult + 5 * child;
		window.localStorage.setItem("price", total);
		$("#price").text("$" + total + " (" + adult + "*$10+ " + child + "*$5)");
	});

	$('#adult_number').change(function() {
		var child = 0;
		var adult = 0;
		//check if child_number and adult_number is integer
		n = ~~Number($("#child_number").val());
		if (String(n) === $("#child_number").val() && n >= 0) {
			var child = $("#child_number").val();
			window.localStorage.setItem("child", child);
		}
		n2 = ~~Number($("#adult_number").val());
		if (String(n2) === $("#adult_number").val() && n2 >= 0) {
			var adult = $("#adult_number").val();
			window.localStorage.setItem("adult", adult);
		}
		var total = 10 * adult + 5 * child;
		window.localStorage.setItem("price", total);
		$("#price").text("$" + total + " (" + adult + "*$10+ " + child + "*$5)");

	});

	$('.dialog').dialog({
		autoOpen : false,
		resizable : false,
		draggable : false,

		//width : 350,
		//open: function(event, ui) {
		//    $(".ui-dialog").css({'margin-left':"30px"}); },
		buttons : {
			Cancel : function() {
				$(this).dialog("close");
			},
			"Purchase" : function() {
					setCookie("ticket", "set", 365);
				document.location.href = "thank_you.html";
			}
		}

	});

});

function myFunction() {
	var first = $("#firstForm").valid();
	var sec = $("#secForm").valid();
	if (first && sec) {

		//redirect to another page
		var adult = window.localStorage.getItem("adult");
		var child = window.localStorage.getItem("child");
		var price = window.localStorage.getItem("price");
		var cstr = "";
		var astr = "";
		if (child == 0) {
		} else if (child == 1) {
			cstr = child + " Child.";
		} else {
			cstr = child + " Children.";
		}

		if (adult == 0) {
		} else if (adult == 1) {
			astr = adult + " Adult;   "
		} else {
			astr = adult + " Adults;  "
		}

		$("#count1").text("Tickets for " + astr + cstr);
		$("#totalprice").text("Total price is " + price + ".");
		$(".dialog").dialog("open");
		//document.location.href="thank_you.html";
	} else {
		//alert("You did not fill the form properly. Please check.");
	}
}

function cancel() {
	$(".dialog").dialog("close");
}

function purchase() {
	setCookie("ticket", "set", 365);
	document.location.href = "thank_you.html";
}



function getCookie(c_name)
{
var c_value = document.cookie;
var c_start = c_value.indexOf(" " + c_name + "=");
if (c_start == -1)
  {
  c_start = c_value.indexOf(c_name + "=");
  }
if (c_start == -1)
  {
  c_value = null;
  }
else
  {
  c_start = c_value.indexOf("=", c_start) + 1;
  var c_end = c_value.indexOf(";", c_start);
  if (c_end == -1)
    {
    c_end = c_value.length;
    }
  c_value = unescape(c_value.substring(c_start,c_end));
  }
return c_value;
}

function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

