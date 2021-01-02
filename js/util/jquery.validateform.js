jQuery(document).ready(function($) {
  /**
	 ** Validate some fields before submit
   ** https://stackoverflow.com/questions/28123236/validate-form-before-submit-jquery
	 */

   
  /************************************************************************
   ** Scroll to element
   ** https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
   ***********************************************************************/ 
  $.scroll = function(elem) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(elem).offset().top
    }, 500);
  }

  // Page Form-Page
  $(document).on("click", "form #btnSubmit", function(e) {
    
   /**********************************************************************************
    ** Validate is table has values
    ** https://stackoverflow.com/questions/16805288/jquery-get-values-from-html-table
    *********************************************************************************/
    var dataTable = $("#tbBrief tr.dataRow").map(function (index, elem) { // Get all data and insert in a single array
      var ret = [];

      $(".inputValue", this).each(function () { // Get column
            
        var d = $(this).val()||$(this).text();
        ret.push(d);
        // console.log(d);
        // if (d == "N/A") { console.log(true); }
      });

      // console.log(ret);
      return ret;
    });
    // console.log(dataTable);


    /********************************************************************
     ** Validate a group of checkboxs
     ** https://stackoverflow.com/questions/6218494/using-the-html5-required-attribute-for-a-group-of-checkboxes
     ********************************************************************/
    if ($(".checkbox-group-time.required :checkbox:checked").length > 0 && // Checkbox Time
        $(".checkbox-group-week.required :checkbox:checked").length > 0 && // Checkbox Week
        dataTable.length > 0 && // Brief Table
        ((dataTable.length % 7) === 0) && // Has no array modification
        $("#txtTitleDeal").val() && // Title Deal 
        $("#txtLocal").val() // Local
        ) {
      // The checkboxes are selected and table has an item, RUN PHP File
      // Prevent the default action
      ////e.preventDefault(); 

      // Unclickable button
      $("form #btnSubmit").css({ opacity: 0.2 }).attr("disabled");
      $("form .animatedLoading").removeClass("hide");

    } else {
      e.preventDefault(); // Prevent the default action

      /**
       ** Variable to control where to scroll
       ** step-one has priority under step-two and three 
       */
      var needScroll = 3;


      // Step One
      if (!$("#txtTitleDeal").val()) {
        $(".step-one .hint-error-div").removeClass("hide");
        $(".step-one .item-two li").addClass("has-error is-focused"); // Highlight the field

        if($("#txtLocal").val()) {
          $(".step-two .hint-error-div").addClass("hide");
        }

        if(needScroll > 1) {
          needScroll = 1;
        }

      }


      // Step Two
      if (!$("#txtLocal").val()) {
        $(".step-two .hint-error-div").removeClass("hide");
        $(".step-two .item-one li").addClass("has-error is-focused");

        if(needScroll > 2) {
          needScroll = 2;
        }

      }

      if ($(".checkbox-group-time.required :checkbox:checked").length <= 0) {
        $(".step-two .hint-error-div").removeClass("hide");
        $(".step-two .item-three .checkbox-group-time div").removeClass("hide"); // Show Erro Warning

        if(needScroll > 2) {
          needScroll = 2;
        }
      }

      if ($(".checkbox-group-week.required :checkbox:checked").length <= 0) {
        $(".step-two .hint-error-div").removeClass("hide");
        $(".step-two .item-three .checkbox-group-week div").removeClass("hide");

        if(needScroll > 2) {
          needScroll = 2;
        }
      }

      /**
       *! DEPRECATED
       * Using reCaptcha as validator
       *
       *
      if ($(".checkbox-group-enter.required :checkbox:checked").length <= 0) {
        $(".final-step .hint-error-div").removeClass("hide");
        $(".final-step .checkbox-group-enter div").removeClass("hide");

      }*/

      if(grecaptcha.getResponse().length == 0) {
        $(".final-step .hint-error-div").removeClass("hide");
        $(".final-step .checkbox-group-enter div").removeClass("hide");
      }



      // Step 3
      if (dataTable.length <= 0) {
        $(".step-three .hint-error-div").removeClass("hide");


        // Verify together if txtLocal or txtTitleDeal has value
        if($("#txtLocal").val()) {
          $(".step-two .hint-error-div").addClass("hide");
        } else if ($("#txtTitleDeal").val()) {
          $(".step-one .hint-error-div").addClass("hide");
        }
      }


      // Where scroll
      if(needScroll === 1) { // Scroll to step-one
        $.scroll(".sale-form-group");

      } else if(needScroll === 2) { // Scroll to step-two
        $(".step-one .hint-error-div").addClass("hide"); // Remove Error Warning
        $.scroll(".step-one .union-group.item-two"); 

      } else {
        $(".step-one .hint-error-div").addClass("hide");
        $(".step-two .hint-error-div").addClass("hide");
        $.scroll(".step-three");

      }


    }

  });


  /**********************
   ** Page Account
   **********************/
  //Page Account
  $("#txtAccountSocial").on("change", function() {
    //alert($("#txtAccountSocial").val());
    $("#searchsubmit").prop("disabled", false); // Element(s) are now enabled.
  });



  /***********************************
   **     Remove Erro Warnings
   ***********************************/
  /**
   ** Select any checkbox
   */
  $(".checkbox-group-time.required :checkbox").change(function() {
    if(this.checked) {
      $(".step-two .item-three .checkbox-group-time div").addClass("hide"); // Hide 

      // Verify together if txtLocal has value
      if($("#txtLocal").val()) {
        $(".step-two .hint-error-div").addClass("hide");
      }
    }

  });

  $(".checkbox-group-week.required :checkbox").change(function() {
    if(this.checked) {
      $(".step-two .item-three .checkbox-group-week div").addClass("hide");

      // Verify together if txtLocal has value
      if($("#txtLocal").val()) {
        $(".step-two .hint-error-div").addClass("hide");
      }
    }
  });

  $(".checkbox-group-enter.required :checkbox").change(function() {
    if(this.checked) {
      $(".final-step .checkbox-group-enter div").addClass("hide");
    }
  });

})