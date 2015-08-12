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
        $("#tip_overlay").fadeIn();
     });

     //Close button action in overlays
     $(".close_btn").click(function(){
       $(this).parent('div').fadeOut();
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
        $("#result_overlay").fadeIn();
    });
});

function calculateBill(){
    var party = parseInt($("[name=party]").val(),10);
    var preTax = parseInt($("[name=preTax]").val(),10);
    var postTax = parseInt($("[name=postTax]").val(),10);
    var tax = postTax - preTax;
    var tip = tipAmmount();

    console.log("perTax: "+preTax);

    var singlePreTax = preTax/party;
    var singleTax = (postTax - preTax)/party;
    var singleTip = (preTax * tip)/ party;
    var singleTotal = (preTax * (1+tip))/party + tax/party;

    return "<p>Divided Check Total: " + singlePreTax +
            "<br> Divided Tax Total: " + singleTax +
            "<br> Divided Tip Total: " + singleTip +
            "<br> Diviced Total: " + singleTotal + "</p>"
}

function tipAmmount(){
    var tip = parseFloat($("[name=tip]:checked").val());
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