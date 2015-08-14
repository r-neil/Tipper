$(document).ready(function(){
    //Party Add Button
    $("[name=add]").click(function(){
    	var $partyInt = parseInt($("[name=party]").val(),10)+1;
    	$("[name=party]").val($partyInt);
        ifDisableSubButton(($partyInt));
    });

    //Party Subtract Button
    $("[name=subtract]").click(function(){
    	var $partyInt = parseInt($("[name=party]").val(),10);
        	if($partyInt >1){
        		$("[name=party]").val($partyInt - 1);
                ifDisableSubButton(($partyInt - 1));
        	}
    });

     //Tip Selection Button Color
     $("input[name='tip']").change(function(){
        $("label[name='tip-amount-btn']").removeClass('tip-btn-select');
        if($("input[name='tip']").is(':checked')) { $(this).parent("label").addClass('tip-btn-select'); }
    });

     //Enter Tip Overlay Appear
     $("input[class='enter_tip_btn']").click(function(){
        disableForm();
        $("#tip_overlay").fadeIn();
     });

     //Close button action in overlays
     $(".close_btn").click(function(){
        closeOverlay(this);
     });
     // "use tip" button in overlay
     $("button[name='use_tip']").click(function(){
        console.log("use tip");
        var displayTip = parseFloat($("input[name='enterTip']").val());
        var enteredTip =  displayTip/100;
        
        $(".enter_tip_btn").val(enteredTip);
        $("#editTipValue").replaceWith("<div id='editTipValue'>" + displayTip + "%</div>");
        closeOverlay();
    });

     //Dollar Amount Textbox, format value on keyup.
     $(".dollar-tb").keyup(function(){
        $(this).val(formatDollar($(this).val()));
     });

     //Dollar Amount Textbox highlight when focus
     $(".textbox").focus(function(){
        $(this).parent('div').addClass('tb-select');
     });

     //Dollar Amount Textbox remove highligh on blur
    $(".textbox").blur(function(){
        $(this).parent('div').removeClass('tb-select');
     });

    //Calculate Button
    $("[name=calculate]").click(function(){
        calculateBill();
        disableForm();
        $("#result_overlay").fadeIn();
    });
});

function calculateBill(){
    var party = parseInt($("[name=party]").val(),10);
    var total = parseInt($("[name=preTax]").val(),10);
    var postTax = parseInt($("[name=postTax]").val(),10);
    var tax = postTax - total;
    var tip = getTip();
    var totalTip = (total * tip) * 100;
    var gTotal = total + tax + totalTip;

    var indTotal = total/party;
    var indTax = (postTax - total)/party;
    var indTip = totalTip / party;
    var indGTotal = indTotal + indTax + indTip;
    
    //Setting Result Overlay values
    $("#ind-total").replaceWith("<td class = 'row-value' id='ind-total'>$"+indTotal.toFixed(2)+"</td>");
    $("#ind-tax").replaceWith("<td class = 'row-value' id='ind-total'>$"+indTax.toFixed(2)+"</td>");
    $("#ind-tip").replaceWith("<td class = 'row-value row-underline' id='ind-tip'>$"+indTip.toFixed(2)+"</td>");
    $("#ind-g-total").replaceWith("<td class = 'row-value row-double-underline' id='ind-g-total'>$"+indGTotal.toFixed(2)+"</td>");

    $('#total').replaceWith("<td class = 'row-value' id='total'>$"+total.toFixed(2)+"</td>");
    $('#tax').replaceWith("<td class = 'row-value' id='tax'>$"+tax.toFixed(2)+"</td>");
    $('#tip').replaceWith("<td class = 'row-value row-underline' id='tip'>$"+totalTip.toFixed(2)+"</td>");
    $('#gtotal').replaceWith("<td class = 'row-value row-double-underline' id='gtotal'>$"+gTotal.toFixed(2)+"</td>");
}

function getTip(){
    var tip = parseFloat($("[name=tip]:checked").val()/100);
    if(isNaN(tip)){
        tip = parseInt($("[name=otherTextbox]").val(),10)/100;
    }
    return tip;
}

function ifDisableSubButton(party){
    if(party ==1){
        $("[name=subtract]").prop("disabled",true); 
    }else{
        $("[name=subtract]").prop("disabled",false);
    }
}

function formatDollar(amount){
    var str = amount.replace(".","");
    var num = parseInt(str,10)/100;
    if(isNaN(num)){
        num = 0;
    }
    return num;
}

function disableForm(){
    // $(".btn").prop("disabled",true);
    $(".overlay-shade").fadeIn();

}
function closeOverlay(overlay){
    // $(".btn").prop("disabled",false);
     $(".overlay").fadeOut();
     $(".overlay-shade").fadeOut();
}