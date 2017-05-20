$(document).ready(function() {

    function checkSelection() {

        if ($("#contract_term").val() === "1") {
            $("#year_one_channels").removeAttr("disabled");
            $("#year_two_channels").attr("disabled", "disabled");
            $("#year_three_channels").attr("disabled", "disabled");
        }
        else if($("#contract_term").val() === "2") {
            $("#year_one_channels").removeAttr("disabled");
            $("#year_two_channels").removeAttr("disabled");
            $("#year_three_channels").attr("disabled", "disabled");
        }  
        else {
            $("#year_one_channels").removeAttr("disabled");
            $("#year_two_channels").removeAttr("disabled");
            $("#year_three_channels").removeAttr("disabled"); 
        }
    }

    $('#contract_term').focusout(function(){
        checkSelection();
    })
})