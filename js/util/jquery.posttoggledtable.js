jQuery(document).ready(function($) {

	/**
	 ** This functions will make a post item table show and hide row's information.
   ** https://stackoverflow.com/questions/13450771/toggle-table-row-with-jquery
   ** There is an easy way to show and hide elements, see:
   ** https://www.w3schools.com/jquery/jquery_hide_show.asp
	 */

  // Post Item Detail
  $(".a-table-toggle")
        .on("click", function(){
            var idOfParent = $(this).parents("tr").attr("id");
            var childRow = ".child-"+idOfParent;
            var childTable = ".second-body-table-sale-form-post-"+idOfParent;
            //console.log(".second-body-table-sale-form-post-"+idOfParent);

            if ($(childTable).hasClass( "hide" )) {
              $(childTable).removeClass("hide");
              $(childRow).removeClass("hide");
              //console.log("Show");

              $("#"+idOfParent+" .name-dataRow .fa-caret-right").addClass("fa-caret-down"); // -
              $("#"+idOfParent+" .name-dataRow .fa-caret-right").removeClass("fa-caret-right"); // +
              
              
            } else {
              $(childTable).addClass("hide");
              $(childRow).addClass("hide");
              //console.log("Hide");

              $("#"+idOfParent+" .name-dataRow .fa-caret-down").addClass("fa-caret-right");
              $("#"+idOfParent+" .name-dataRow .fa-caret-down").removeClass("fa-caret-down");
            }
            
        });

  // Search Item Detail
  $(".a-search-toggle")
        .on("click", function(){
            var idOfParent = $(this).parents("tr").attr("id");
            //var childRow = ".child-"+idOfParent;
            var childTable = ".second-body-table-sale-form-post-"+idOfParent;
            //console.log(".second-body-table-sale-form-post-"+idOfParent);

            if ($(childTable).hasClass( "hide" )) {
              $(childTable).removeClass("hide");
              //console.log("Show");

              $("#name-dataRow-"+idOfParent+" .fa-caret-right").addClass("fa-caret-down"); // -
              $("#name-dataRow-"+idOfParent+" .fa-caret-right").removeClass("fa-caret-right"); // +


              // Vertical Align
              $("#"+idOfParent+" .img-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .name-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .qtd-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .zeny-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .map-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .deal-title-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .char-dataRow").addClass("table-vertical-top");
              $("#"+idOfParent+" .server-dataRow").addClass("table-vertical-top");
              
              
            } else {
              $(childTable).addClass("hide");
              //console.log("Hide");

              $("#name-dataRow-"+idOfParent+" .fa-caret-down").addClass("fa-caret-right");
              $("#name-dataRow-"+idOfParent+" .fa-caret-down").removeClass("fa-caret-down");


              // Vertical Align
              $("#"+idOfParent+" .img-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .name-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .qtd-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .zeny-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .map-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .deal-title-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .char-dataRow").removeClass("table-vertical-top");
              $("#"+idOfParent+" .server-dataRow").removeClass("table-vertical-top");
            }
            
        });
  
  // Search Result Tables
  $("#searchformstats #rdbServer-thor") 
        .on("click", function(){
          $("#myChartValhala").addClass("hide");
          $("#myChartThor").removeClass("hide");

          $("#search-table-valhala").addClass("hide");
          $("#search-table-thor").removeClass("hide");
        });
  $("#searchformstats #rdbServer-valhala") 
        .on("click", function(){
          $("#myChartValhala").removeClass("hide");
          $("#myChartThor").addClass("hide");

          $("#search-table-valhala").removeClass("hide");
          $("#search-table-thor").addClass("hide");
        });

  // 'Tabela de Itens' Rename and Delete options
  $("a.btnTabSaleEditRow") // Edit
        .on("click", function(){
          var idOfParent = $(this).parents("tr").attr("id");
          var txtTabNiceName = $(".name-dataRow-"+idOfParent).text();

          // Toggled
          $("#child-nicename").removeClass("hide");
          $(".child-delete").addClass("hide");
          $(".table-sale-edit-div .hint-error-div").addClass("hide");

          // Check the correct Radio Button
          $("input[name='rdbTabSaleRowId'][value='"+idOfParent+"']").prop("checked",true);

          // Insert value in input text name
          $("#txtTabNiceNameChild").val(txtTabNiceName);
        });
  $("a.btnTabSaleDeleteRow") // Delete
        .on("click", function(){
          var idOfParent = $(this).parents("tr").attr("id");
          var childDeleteRow = "#child-delete-"+idOfParent;

          // Toggled
          $(".child-delete").addClass("hide");
          $(childDeleteRow).removeClass("hide");
          $("#child-nicename").addClass("hide");
          $(".table-sale-edit-div .hint-error-div").addClass("hide");

          // Check the correct Radio Button
          $("input[name='rdbTabSaleRowId'][value='"+idOfParent+"']").prop("checked",true);
        });

  
  // Offer
  $("#offer-open-post") 
        .on("click", function(){
          if ($(".offer-content").hasClass( "hide" )) {
            $(".offer-content").removeClass("hide");
            $.scroll(".offer-content-form");
          } else {
            $(".offer-content").addClass("hide");
          }
        });
    
});