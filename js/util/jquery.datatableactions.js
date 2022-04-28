jQuery(document).ready(function($) {
  /**
	 ** Data Table Configs
   ** https://datatables.net/
   **
   ** Filter Datatable from External Link
   ** https://datatables.net/forums/discussion/43352/filter-datatable-from-external-link
	 */

  /**
   * How to get URL parameter
   * https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
   */
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
  };


  if (top.location.pathname == '/tlm/cards/') {
    var search = getUrlParameter('search'); // Get parameter
    var usrlang = navigator.language || navigator.userLanguage; // User Language

    if (search) { // Not null

      if (usrlang.indexOf("pt") >= 0) { //pt-BR

        $(".tlm-cards .card-en-us").addClass("hide");
        $(".tlm-cards .card-pt-br").removeClass("hide");

        // Portuguese
        $("#tlm-card-list-pt").dataTable({
          "iDisplayLength": 10,
          "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
          "pagingType": "full",
          "ordering": false,
          "search": {
            "search": search
          },
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
          }
        });

        // English
        $("#tlm-card-list-en").dataTable({
          "iDisplayLength": 10,
          "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
          "pagingType": "full",
          "ordering": false,
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/English.json"
          }
        });


      } else {

        $(".tlm-cards .card-pt-br").addClass("hide");
        $(".tlm-cards .card-en-us").removeClass("hide");

        // Portuguese
        $("#tlm-card-list-pt").dataTable({
          "iDisplayLength": 10,
          "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
          "pagingType": "full",
          "ordering": false,
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
          }
        });

        // English
        $("#tlm-card-list-en").dataTable({
          "iDisplayLength": 10,
          "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
          "pagingType": "full",
          "ordering": false,
          "search": {
            "search": search
          },
          language: {
            url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/English.json"
          }
        });

      }

    } else { // Render the complete page without search

      /**
       * TLM - The Lost Memories
       */
      $("#tlm-card-list-pt").dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
        "pagingType": "full",
        "ordering": false,
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
        }
      });

      $("#tlm-card-list-en").dataTable({
        "iDisplayLength": 10,
        "aLengthMenu": [[10, 18, 45, 90, -1], [10, 18, 45, 90, "Todos"]],
        "pagingType": "full",
        "ordering": false,
        language: {
          url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/English.json"
        }
      });

    }
    
  }
  

  // Clipboard
  $("a.clip-content") 
        .on("click", function(){
          /* Copy the text inside the text field */
          navigator.clipboard.writeText($(this).attr("clip"));

          /* Effect */
          $(this).hide();
          $(this).siblings(".confirm-clip").removeClass("hide");

          /* Run after 3000ms */
          setTimeout( function(){ 
            $("a.clip-content").siblings(".confirm-clip").addClass("hide");
            $("a.clip-content").fadeIn(); 
          }, 3000 );
        });
});