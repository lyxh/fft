$(document).ready(function() {
   

	$('#enter').click(function () {
	var options = {
		series: {lines: { show: true },points: { show: false}}
		
	};
	var raw_data= $("#raw_data").val();
	//alert("The value of raw_data is " + raw_data);
	var data1=new Array();
	var points=new Array();
	for (i=0;i<raw_data.length;i++){
	       var y=raw_data.charAt(i);
		   if (y==0) y=-1;
	       var from=new Array(i+1, y);
		   var to=new Array(i+2, y);
		   data1.push(new Array(to, from));
		   points.push(from);
		   points.push(to);
	}
	
	//next, go through it and get the positive and negative arrays. Each item of the array specify T1 and center
	//shift all the stuff by 1 at the end
	var previous=raw_data.charAt(0);
	var start=1;
	var end=2;
	var pos=new Array(); var neg=new Array();
	for (i=1;i<raw_data.length;i++){
	     var y=raw_data.charAt(i);
		 // if current item is the same as the previous one. Keep accumulating the length.
		 if (y==previous){
		     previous=y;
		     end=i+2;
		 }
		 else{
		     //adding in the previous square, update start and previous.
			 var item=new Array((start+end)/2, (end-start)/2);
			 if (previous==1){pos.push(item); alert("Adding square of value "+ previous+" from "+ start +" to " + end);}
			 if (previous==0){neg.push(item); alert("Adding square of value "+ previous+ " from "+ start +" to " + end);}
			 start=i+1;end=i+2;previous=y;
		 }
		 
		 if (i==raw_data.length-1){ 
		     var item=new Array((start+end)/2, (end-start)/2);
			 if (previous==1){pos.push(item); alert("Adding square of value "+ previous+" from "+ start +" to " + end);}
			 if (previous==0){neg.push(item); alert("Adding square of value "+ previous+" from "+ start +" to " + end);}}
	}
	
	
	//adding the difference to the data
	var series1= {data:points};
	var final_data=new Array(series1);
	$.plot($("#placeholder1"),final_data,options);
	
	
	//plotting the forier transform by looping through pos and neg
	//var j=new Complex(0,1);
	
	var num_points=50;
	var data2=new Array();
	for (i=0;i <num_points;i++){
	     var w=i*Math.PI*2/num_points;
		 var y_value=0;
	    for (i=0;i<pos.length;i++){
		     var center=pos[i][0]; var t1=pos[i][1]; y_value+=Math.exp(-j*center*w)*(2*Math.sin(w*t1)/w);
		}
        //for (i=0;i<neg.length;i++){var center=neg[i][0]; var t1=neg[i][1]; y_value+=Math.exp(-j*center*w)*(2*Math.sin(w*t1)/w);}
		 // y_value=mag2dc(abd(y_value))
         y_value=Math.abs(y_value);
		 //alert("y_value is " + y_value+ " at w="+w);
	     var point=new Array(w,y_value);
	     data2.push(point);
	}
	var series2= {data:data2};
	var final_data2=new Array(series2);
	$.plot($("#placeholder2"),final_data2,options);
	
	   $("div#title1").text("Bit");
     $("div#title2").text("Frequency");
     $("div#y1").text("Value");
     $("div#y2").text("Magnitude");
 });
});