$(document).ready(function(){

    $("[name=add]").click(function(){
    	console.log("add!");
    	var $partyInt = parseInt($("[name=party]").val(),10);
    	$("[name=party]").val($partyInt + 1);
    });

    $("[name=subtract]").click(function(){
    	console.log("subtract!");
    	var $partyInt = parseInt($("[name=party]").val(),10);
        	if($partyInt >1){
        		$("[name=party]").val($partyInt - 1);
        	}
    });
    //on focus of Other textbox, Other Radio checked=true
     $("[name=otherTextbox]").focus(function(){
        $("[name=tip][value='']").prop("checked",true);
    });

     $("[name=otherTextbox]").blur(function(){
        $("[name=otherTextbox]").val($("[name=otherTextbox]").val() + "%");
     });

    
    $("[name=calculate]").click(function(){
        $("body").append(tipAmmount());
    });

   
});

function calculateBill(){
    var $party = parseInt($("[name=party]").val(),10);
    var $preTax = parseInt($("[name=preTax]").val(),10);
    var $postTax = parseInt($("[name=postTax]").val(),10);
    var $tax = $postTax - $preTax;


    return ($preTax * 1.2)/$party + $tax/$party;
}

function tipAmmount(){
    var $tip = $("[name=tip]:checked").val();
    if($tip == ""){
        $tip = $("[name=other]").val();
    }

    console.log("tip selected " + $tip);
    return $tip;
}
