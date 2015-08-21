$(document).ready(function(){
    //Party Add Button
    $("[name=add]").click(function(){
    	var $partyInt = parseInt($("[name=party]").val(),10)+1;
    	$("[name=party]").val($partyInt);
        ifDisableSubButton(($partyInt));
        $("[name=add]").blur();
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
     $(".close_btn").click(function(e){
       // e.preventDefault(); //prevents page jump
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
     //format dollar amount
     $(".dollar-tb").on('input',function(){
      $(this).val(formatDollar($(this).val()));
    });

     //format percent amount
    $(".tip-tb").on('input',function(){
        $(this).val(formatPercent($(this).val()));
    });

     //Textbox highlight when focus
     $(".textbox").focus(function(){
        var name = $(this).attr('name');
        if (name != "party"){
            $(this).parent('div').addClass('tb-select');
        }
     });

     //Textbox remove highligh on blur
    $(".textbox").blur(function(){
        $(this).parent('div').removeClass('tb-select');
     });

    //Info Button Overlay
    $(".tipInfo_btn").click(function(e){
        //e.preventDefault(); //prevents page jump
        $("#how-tip-calc").fadeIn();
    });

    $("[name = 'info-close']").click(function(){
        $("#how-tip-calc").fadeOut();
    });

    //Calculate Button
    $("[name=calculate]").click(function(){
        calculateBill();
        disableForm();
        $("#result_overlay").fadeIn();
    });
});

function calculateBill(){
    var subTotal = parseInt(removeCommaSeperator($("[name=subTotal]").val()),10);
    var total = parseInt(removeCommaSeperator($("[name=postTax]").val()),10);
    
    var party = parseInt($("[name=party]").val(),10);
    var tip = getTip();
    
    var totalTip = (subTotal * tip) * 100;
    var indTip = totalTip / party;

    resetTipHelpOverlay();

    if(isTotalGreater(subTotal,total)){
        showTipHelpTotalGreater();
        
        var indTotal = subTotal/party;
        var indTax = (total - subTotal)/party;
        var indGTotal = indTotal + indTax + indTip; 

        var totalTax = total - subTotal;
        var gTotal = subTotal + totalTax + totalTip;
    }else{
        showTipHelpTotalLessThan();
        
        var indTotal = total/party;
        var indTax = 0;
        var indGTotal = indTotal + indTax + indTip; 

        subTotal = total; //swapping due to total < subTotal
        var totalTax = 0;
        var gTotal = total + totalTax + totalTip;
    }
   
    //Setting Result Overlay values
    $("#ind-total").replaceWith("<td class = 'row-value' id='ind-total'>$"+indTotal.toFixed(2)+"</td>");
    $("#ind-tax").replaceWith("<td class = 'row-value' id='ind-tax'>$"+indTax.toFixed(2)+"</td>");
    $("#ind-tip").replaceWith("<td class = 'row-value row-underline' id='ind-tip'>$"+indTip.toFixed(2)+"</td>");
    $("#ind-g-total").replaceWith("<td class = 'row-value row-double-underline' id='ind-g-total'>$"+indGTotal.toFixed(2)+"</td>");

    $('#total').replaceWith("<td class = 'row-value' id='total'>$"+subTotal.toFixed(2)+"</td>");
    $('#tax').replaceWith("<td class = 'row-value' id='tax'>$"+totalTax.toFixed(2)+"</td>");
    $('#tip').replaceWith("<td class = 'row-value row-underline' id='tip'>$"+totalTip.toFixed(2)+"</td>");
    $('#gtotal').replaceWith("<td class = 'row-value row-double-underline' id='gtotal'>$"+gTotal.toFixed(2)+"</td>");
}

function getTip(){
    var tip = parseFloat($("[name=tip]:checked").val()/100);
    if(isNaN(tip)){
        tip = parseInt($("[name=otherTextbox]").val(),10)/100;
    }
    if(isNaN(tip)){
        tip = 0;
    }
    return tip;
}

function isTotalGreater(subTotal, total){
    var BOOL = false;
    if (subTotal < total){
        BOOL = true;
    }
    return BOOL;
}

function resetTipHelpOverlay(){
    $("#tip_help_TotalLessThan").fadeOut();
    $("#tip_help_TotalGreater").fadeOut();
}

function showTipHelpTotalGreater(){
    $("#tip_help_TotalGreater").fadeIn();
}

function showTipHelpTotalLessThan(){
    $("#tip_help_TotalLessThan").fadeIn();
}

function ifDisableSubButton(party){
    if(party ==1){
        $("[name=subtract]").prop("disabled",true); 
    }else{
        $("[name=subtract]").prop("disabled",false);
    }
}

function disableForm(){
    $(".overlay-shade").fadeIn();

}
function closeOverlay(overlay){
     $(".overlay").fadeOut();
     $(".overlay-shade").fadeOut();
}

function formatDollar(amount){
    var str = amount.replace(".","");
    str = str.replace(",","");
    var strLength = str.length;
    var num = (parseInt(str,10)/100).toFixed(2);
    
    //protects against NaN values
    if(isNaN(num)){
        num = 0;
    }

    //add comma to values greater than 999.99
    if(strLength == 6){
        num = addCommaSeperator(num);
    }

    //prevents numbers greater than 9,999.99
    if(strLength > 6){
        var preAmount = amount.substr(0,8);
        num =  preAmount;
    }

    return num;
}

function formatPercent(amount){
    var strLength = amount.length;
    var num = parseInt(amount,10);

    //protects against NaN values
    if(isNaN(num)){
        num = 0;
    }

    //prevents numbers greater than 999
    if (strLength >3){
        var preAmount = amount.substr(0,3);
        num = preAmount;
    }
    return num;
}

function addCommaSeperator(x) {
    return x.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
}

function removeCommaSeperator(x){
    var str = x.replace(",","");
    return str;
}