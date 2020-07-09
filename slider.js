
						/*<!-- example html:
						<div slider id="f-time"
							data-min="<?php print $timeMinMax->min; ?>"
							data-max="<?php print $timeMinMax->max; ?>"
							data-low="<?php print $timeMinMax->low; ?>"
							data-high="<?php print $timeMinMax->high; ?>"
							>
						</div>
						-->*/

$(document).ready(function(){

	$.each( $("div[slider]") , function(k,v) {
		
		var sliderId = $(v).attr("id");
		var vData = $(v).data();

		if ( ! vData.min ) { vData.min = 0; }
		if ( ! vData.max ) { vData.max = 100; }
		if ( ! vData.low ) { vData.low = vData.min; }
		if ( ! vData.high ) { vData.high = vData.max; }
		console.log(vData);

		$(v).append(
			$("<DIV></DIV>").attr("id",sliderId+"_data").append(
				$("<DIV></DIV>").attr("inverse-left","").css("width","70%")
			).append(
				$("<DIV></DIV>").attr("inverse-right","").css("width","70%")
			).append(
				$("<DIV></DIV>").css("right","40%").css("left","30%").attr("range","").attr("id",sliderId+"_range")
			).append(
				$("<SPAN></SPAN>").css("left","30%").attr("thumb","").attr("thumb-left","")
			).append(
				$("<SPAN></SPAN>").css("left","60%").attr("thumb","").attr("thumb-right","")
			).append(
				$("<DIV></DIV>").attr("sign","").attr("sign-left","").css("left","30%").append(
					$("<SPAN></SPAN>").attr("id",sliderId+"_left_value").html("30")
				)
			).append(
				$("<DIV></DIV>").attr("sign","").attr("sign-right","").css("left","60%").append(
					$("<SPAN></SPAN>").attr("id",sliderId+"_right_value").html("60")
				)
			)
		).append(
			$("<INPUT></INPUT>")
				.attr("type","range")
				.attr("slider-left","")
				.attr("name",sliderId+"_low")
				.attr("id",sliderId+"_low")
				.attr("min",vData.min)
				.attr("max",vData.max)
				.val(vData.low)
				.attr("step",1)
				.on("input",function(){
					sliderLeft(sliderId)
				})
		).append(
			$("<INPUT></INPUT>")
				.attr("type","range")
				.attr("slider-right","")
				.attr("name",sliderId+"_high")
				.attr("id",sliderId+"_high")
				.attr("min",vData.min)
				.attr("max",vData.max)
				.val(vData.high)
				.attr("step",1)
				.on("input",function(){
					sliderRight(sliderId)
				})
		);

		sliderLeft(sliderId);
		sliderRight(sliderId);

	});

});


function sliderLeft(wrapperId) {

	$wrapper = $("div#"+wrapperId);
	$right = $wrapper.find("[slider-right]");
	left = $wrapper.find("[slider-left]");
	
	left.val( parseInt( Math.min(left.val(),$right.val()-1) ) );

	leftMin = parseInt(left.attr("min"));
	leftMax = parseInt(left.attr("max"));
	leftDiff = leftMax - leftMin;

	var value = ( 100/leftDiff ) * left.val() - ( 100 / leftDiff ) * leftMin;

	$data = $wrapper.find("div#"+wrapperId+"_data");
	$($data.find("[inverse-left]")).css("width",value+"%");
	$($data.find("[range]")).css("left",value+"%");
	$($data.find("[thumb-left]")).css("left",value+"%");
	$($data.find("[sign-left]")).css("left",value+"%");
	$($data.find("[sign-left] span")).html(left.val());

}

function sliderRight(wrapperId) {

	$wrapper = $("div#"+wrapperId);
	$left = $wrapper.find("[slider-left]");
	right = $wrapper.find("[slider-right]");

	right.val( parseInt( Math.max(right.val(),$left.val()-(-1) ) ) );

	rightMin = parseInt(right.attr("min"));
	rightMax = parseInt(right.attr("max"));
	rightDiff = rightMax - rightMin;

	var value = ( 100/rightDiff ) * right.val() - ( 100/rightDiff ) * rightMin;

	$data = $wrapper.find("div#"+wrapperId+"_data");
	$($data.find("[inverse-right]")).css("width",(100-value)+"%");
	$($data.find("[range]")).css("right",(100-value)+"%");
	$($data.find("[thumb-right]")).css("left",value+"%");
	$($data.find("[sign-right]")).css("left",value+"%");
	$($data.find("[sign-right] span")).html(right.val());

}
