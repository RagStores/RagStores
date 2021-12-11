jQuery(document).ready(function($) {
    // Remove "Enter" ou Selection dependence 
    ////var controller = true;
    $(".flexdatalist-multiple").focusin(function() {

        //console.log($(this).find("input").attr("id"));

        // Split the string and use only the first piece
        // All input id is like: txtInput-flexdatalist
        var txtFullName = $(this).find("input").attr("id");
        var txtName = txtFullName.split('-');

        // Restrict elements
        if (txtFullName != "txtRefine-flexdatalist" &&
        txtFullName != "txtItens-flexdatalist" &&
        txtFullName != "txtCards-flexdatalist" &&
        txtFullName != "txtEnchants-flexdatalist" &&
        txtFullName != "s-flexdatalist") {

            // Lost focus
            $(".flexdatalist-multiple").focusout(function() {

                // Check if the Controller is ON and if the input has no value
                if (!$("#"+txtName[0]).val()) { // Value = NULL or FALSE
                    ////if (controller && $("#txtAccountSocial").val()) {  

                    $("#"+txtName[0]).val(
                        // Set the value you entered in the input
                        $("#"+txtFullName).val()
                    );
                    ////controller = false;

                } else { // For some reason without this code below, to click on X doesn't work to remove value

                    // Use the Remove Method to clear the entered value 
                    $("#"+txtName[0]).flexdatalist(
                        "remove",
                        $("#"+txtName[0]).val()
                    );
                    ////controller = true;
                }

            });
        }
    });
});