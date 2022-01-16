jQuery(document).ready(function($) {
  /**
	 ** Validate some fields before submit
   ** https://stackoverflow.com/questions/28123236/validate-form-before-submit-jquery
	 */

  /**********************************************************************
   ** Generate random numbers
   ** https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript  
   ***********************************************************************/ 
  $.randomIntFromInterval = function(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
   
  /************************************************************************
   ** Scroll to element
   ** https://stackoverflow.com/questions/6677035/jquery-scroll-to-element
   ***********************************************************************/ 
  $.scroll = function(elem) {
    $([document.documentElement, document.body]).animate({
        scrollTop: $(elem).offset().top
    }, 500);
  }

  /**********************
   ** Form Page
   **********************/
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
        ($("#txtMaps").val() && $("#txtCoord").val()) // Local
        ) {
      // The checkboxes are selected and table has an item, RUN PHP File
      // Prevent the default action
      ////e.preventDefault(); 

      // Unclickable button
      $("form #btnSubmit").css({ opacity: 0.2 })/*.prop("disabled", true)*/;
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

        if($("#txtMaps").val() && $("#txtCoord").val()) {
          $(".step-two .hint-error-div").addClass("hide");
        }

        if(needScroll > 1) {
          needScroll = 1;
        }

      }


      // Step Two
      if (!$("#txtMaps").val() || !$("#txtCoord").val()) {
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

      if(grecaptcha.getResponse().length == 0) {
        //$(".final-step .hint-error-div").removeClass("hide");
        $(".final-step .checkbox-group-enter div").removeClass("hide");
      }

      if(hcaptcha.getResponse().length == 0) {
        //$(".final-step .hint-error-div").removeClass("hide");
        $(".final-step .checkbox-group-enter div").removeClass("hide");
      }



      // Step 3
      if (dataTable.length <= 0) {
        $(".step-three .hint-error-div").removeClass("hide");


        // Verify together if txtMaps or txtTitleDeal has value
        if($("#txtMaps").val() && $("#txtCoord").val()) {
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
  /** 
   ** Disable form submit on Enter
   ** https://stackoverflow.com/questions/11235622/jquery-disable-form-submit-on-enter 
  */
  $("#sale-form").on("keyup keypress", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });


  /********************************
   ** Edit Items/Table Items Page
   ********************************/
  $(document).on("click", "form #btnNewTable", function(e) {
    
    /**********************************************************************************
     ** Validate is table has values
     ** https://stackoverflow.com/questions/16805288/jquery-get-values-from-html-table
     *********************************************************************************/
    var dataTable = $("#tbBrief tr.dataRow").map(function (index, elem) { // Get all data and insert in a single array
      var ret = [];
      $(".inputValue", this).each(function () { // Get column     
        var d = $(this).val()||$(this).text();
        ret.push(d);
      });
      return ret;
    });


    if (dataTable.length > 0 ) { 
      // Unclickable button
      $("form #btnNewTable").css({ opacity: 0.2 })/*.prop("disabled", true)*/;
      $("form .animatedLoading").removeClass("hide");
 
    } else {
      e.preventDefault(); // Prevent the default action
      $(".step-three .hint-error-div").removeClass("hide");
      $.scroll(".step-three");

    }
  });


  /**********************
   ** Account Page
   **********************/
  // Account Page
  $("#txtAccountNickname").on("change", function() {
    $("#btnAcchountNickname").prop("disabled", false); // Element(s) are now enabled.
    $(".account-nickname .hint-error-div").addClass("hide");
    $(".account-nickname .hint-div").addClass("hide");
  });

  $("#txtAccountSocial").on("change", function() {
    //alert($("#txtAccountSocial").val());
    $("#btnAcchountSocial").prop("disabled", false); // Element(s) are now enabled.
    $(".account-social .hint-error-div").addClass("hide"); // Hide error
    $(".account-social .hint-div").addClass("hide");
  });
  
  $(document).on("click", "#btnAcchountSocial", function(e) {

    if ($("#txtAccountSocial").val().toLowerCase().indexOf("facebook") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("twitter") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("youtube.com/channel") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("youtube.com/c") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("youtube.com/user") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("@discord") < 0 &&
    $("#txtAccountSocial").val().toLowerCase().indexOf("twitch.tv/") < 0) { // Has no FB or Twitter - ERROR
      // Prevent the default action
      e.preventDefault();

      $(".account-social .hint-error-div").removeClass("hide"); // Show error
      $(".account-social li").addClass("has-error is-focused"); // Highlight the field
    }

  });

  $("#txtUserCoupon").on("change", function() {
    $("#btnUsercoupon").prop("disabled", false); // Element(s) are now enabled.
    $(".user-coupon .hint-error-div").addClass("hide"); // Hide error
  });

  $("#btnEyeAccount .fa-eye-slash").on("click", function() {
    $("#rs-account-id input").attr("type", "text");
    $("#btnEyeAccount .fa-eye").removeClass("hide");
    $("#btnEyeAccount .fa-eye-slash").addClass("hide");
  });
  $("#btnEyeAccount .fa-eye").on("click", function() {
    $("#rs-account-id input").attr("type", "password");
    $("#btnEyeAccount .fa-eye-slash").removeClass("hide");
    $("#btnEyeAccount .fa-eye").addClass("hide");
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

      // Verify also if txtMaps has value
      if($("#txtMaps").val() && $("#txtCoord").val()) {
        $(".step-two .hint-error-div").addClass("hide");
      }
    }

  });

  $(".checkbox-group-week.required :checkbox").change(function() {
    if(this.checked) {
      $(".step-two .item-three .checkbox-group-week div").addClass("hide");

      // Verify also if txtMaps has value
      if($("#txtMaps").val() && $("#txtCoord").val()) {
        $(".step-two .hint-error-div").addClass("hide");
      }
    }
  });

  $(".checkbox-group-enter.required :checkbox").change(function() {
    if(this.checked) {
      $(".final-step .checkbox-group-enter div").addClass("hide");
    }
  });


  /**********************
   ** Offer Form
   **********************/
  /**
   ** Items removed by the author of the post
   */
  $("#btnActionStopOfferRow .fas.fa-ban").on("click", function() {
    $("#offer-form .step-brief .hint-error-div").toggleClass("hide");
  });

  /** 
   ** Disable form submit on Enter
   ** https://stackoverflow.com/questions/11235622/jquery-disable-form-submit-on-enter 
  */
  $("#offer-form").on("keyup keypress", function(e) {
    var keyCode = e.keyCode || e.which;
    if (keyCode === 13) { 
      e.preventDefault();
      return false;
    }
  });

  $(document).on("click", "form #btnSubmitOffer", function(e) {

    if(hcaptcha.getResponse().length > 0) {
      // All good, go ahead
      // Unclickable button
      $("form #btnSubmitOffer").css({ opacity: 0.2 })/*.prop("disabled", true)*/;
      $("form .animatedLoading").removeClass("hide");

    } else {
      e.preventDefault();
      
      $(".step-three .hint-error-div").addClass("hide");
      $(".final-step .checkbox-group-enter div").removeClass("hide");
      
    }


  });

  /***************************************************************
   ** Countdown 
   ** https://www.w3schools.com/howto/howto_js_countdown.asp
   ***************************************************************/
  /** @type {number} Unix timestamp. */ var lastEdition = parseInt($("#last-offer-edition").val());
  // Adding random time to prevent often update 
  lastEdition = (lastEdition + $.randomIntFromInterval(240,720))*1000;

  // Update the count down every 1 second
  var x = setInterval(function() {

    /** @type {number} Unix timestamp in miliseconds now. */var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = lastEdition - now;
      
    // Time calculations for days, hours, minutes and seconds
    //var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
    // Output the result in an element with id="demo"
    $("div.countdown span").text("Aguarde " + minutes + "m " + seconds + "s para fazer uma nova oferta.");
      
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
      $("div.countdown").addClass("hide");
      $("form #btnSubmitOffer").css({ opacity: 1 }).prop("disabled", false);
      
    } else {
      $("div.countdown").removeClass("hide");
      $("form #btnSubmitOffer").css({ opacity: 0.2 }).prop("disabled", true);
    }
  }, 1000);

});