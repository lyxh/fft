$(document).ready(function() {
	$(function() {
		$("#datepicker").datepicker();
	});
	
	$('#adult_number').change(function() {
		var total= 10*$("#adult_number").val();
$("#price").text("$"+total+ " ("+$("#adult_number").val()+"*$10)");
});


	

	$('#home_image').on("click", function () {

		window.location.replace("index.html");
 });
 
});
