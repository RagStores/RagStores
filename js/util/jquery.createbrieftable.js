jQuery(document).ready(function ($) {
  /**
   * Get values about item and create the Brief Table.
   * This table will be used to get all submited itens in the form.
   * It's okay if an experienced user changes the values, because it will only affect their own store.
   *
   */

  // Globals
  var rowCount = 0;
  var rowIndex = 0;
  var stringCurrentBrief = "";

  /***********************************
   ** Create the HTML to insert JSON
   ************************************/
  var createHTMLJSON = function (arrCurrentBrief) {
    /**
     * Adding the brief data in HTML to the next item validation
     */
    $("#divBrief #txtBrief").remove();
    $("#divBrief").append(
      "<input type='text' id='txtBrief' name='txtBrief' autocomplete='off' tabindex='-1' style='position: absolute; top: -14000px; left: -14000px;'>"
    ); // Append to HTML the input
    $("#divBrief #txtBrief").val(arrCurrentBrief); // Set the value
    //console.log(arrCurrentBrief);

    /**
     * Adding the brief data in a input
     * Do not remove, using this input to convert into a JSON in process-upload
     */

    $("#divBrief #txtSendBrief").remove(); // Clear to insert the new one
    // https://stackoverflow.com/questions/38298158/php-json-decode-returns-null-from-string
    $("#divBrief").append(
      "<input type='text' id='txtSendBrief' name='txtSendBrief' autocomplete='off' tabindex='-1' style='position: absolute; top: -14000px; left: -14000px;' value='" +
        arrCurrentBrief.replace(/"/g, "&quot;") +
        "'>"
    ); // Replace all " to the hex code
    //console.log($("#txtBrief").val());
    //console.log(arrCurrentBrief);
  };

  /***********************************
   ** Create a Mask for item's price
   ************************************/
  var priceMask = function (txtPrice) {
    // Add a mask https://stackoverflow.com/questions/15802100/javascript-phone-mask-for-text-field-with-regex
    if (txtPrice.length > 3) {
      // Milhar - maoir do que 3 dígitos
      if (txtPrice.length > 4) {
        if (txtPrice.length > 5) {
          if (txtPrice.length > 6) {
            // Milhão
            if (txtPrice.length > 7) {
              if (txtPrice.length > 8) {
                if (txtPrice.length > 9) {
                  // Bilhão
                  if (txtPrice.length > 10) {
                    txtPrice = txtPrice.replace(
                      /^(\d{2})(\d{3})(\d{3})(\d{3}).*/,
                      "$1,$2,$3,$4"
                    );
                  }
                  txtPrice = txtPrice.replace(
                    /^(\d{1})(\d{3})(\d{3})(\d{3}).*/,
                    "$1,$2,$3,$4"
                  );
                }
                txtPrice = txtPrice.replace(
                  /^(\d{3})(\d{3})(\d{3}).*/,
                  "$1,$2,$3"
                );
              }
              txtPrice = txtPrice.replace(
                /^(\d{2})(\d{3})(\d{3}).*/,
                "$1,$2,$3"
              );
            }
            txtPrice = txtPrice.replace(/^(\d{1})(\d{3})(\d{3}).*/, "$1,$2,$3");
          }
          txtPrice = txtPrice.replace(/^(\d{3})(\d{3}).*/, "$1,$2");
        }
        txtPrice = txtPrice.replace(/^(\d{2})(\d{3}).*/, "$1,$2");
      }
      txtPrice = txtPrice.replace(/^(\d{1})(\d{3}).*/, "$1,$2");
    }

    return txtPrice;
  };

  /***************
   ** btnAddItem
   ***************/
  $("#btnAddItem").click(function (e) {
    // Hide error's hint
    $(".step-three #hint-error").addClass("hide");

    // Validate fields
    if (
      $("#txtItens").val() &&
      $("#txtQtd").val() &&
      $("#txtPrice").val() &&
      rowCount < 12
    ) {
      e.preventDefault();
      rowCount++;

      /**
       * Now, get the input field's values
       */
      var txtRefine = $("#txtRefine").val(); // Text
      var txtItens = JSON.parse($("#txtItens").val()); // JSON
      var txtCards = $("#txtCards").val(); // JSON
      var txtCharms = $("#txtCharms").val(); // Text
      var txtQtd = $("#txtQtd").val(); // Text
      var txtPrice = $("#txtPrice").val(); // Text

      /**
       * Create Table
       * https://stackoverflow.com/questions/8749236/create-table-with-jquery-append
       */
      var table = $("<tr>").addClass("dataRow");
      var arrCurrentBrief = ""; // Array to put all itens and populate the input

      /**
       * Validate if input has value
       */
      if (!$("#divBrief #txtBrief").val()) {
        // Has no value, first item
        arrCurrentBrief = "[{"; // Start JSON String
      }

      /********************************
       **        Adding Rows
       ********************************/
      // Refine
      if (!txtRefine) {
        // Is emtpy
        table.append(
          $("<td>").addClass("inputValue").addClass("txtRefineRow").text("-")
        );
        arrCurrentBrief += '"txtRefine": "-"'; // Create a JSON String
      } else {
        table.append(
          $("<td>")
            .addClass("inputValue")
            .addClass("txtRefineRow")
            .text(txtRefine)
        );
        arrCurrentBrief += '"txtRefine": "' + txtRefine + '"';
      }

      /*********************************************
       ** There are 2 options to get the photo
       ** https://static.divine-pride.net/images/items/item/501.png <<BEST
       ** https://www.divine-pride.net/img/items/item/bRO/501
       **********************************************/

      // Item
      table.append(
        $("<td style='display: none;'>")
          .addClass("inputValue")
          .text(txtItens[0]["id"])
      ); // id
      table.append(
        $(
          "<td><img src='https://static.divine-pride.net/images/items/item/" +
            txtItens[0]["id"] +
            ".png' alt='" +
            txtItens[0]["name"] +
            "' width='auto' height='auto' style='margin-right: -2px;'></td>"
        )
      ); // Image
      table.append(
        $(
          "<td class='inputValue'><a href='https://www.divine-pride.net/database/item/" +
            txtItens[0]["id"] +
            "' target='_blank'>" +
            txtItens[0]["name"] +
            "</a></td>"
        )
      ); // Name
      //table.append($("<td>").addClass("inputValue").text(txtItens[0]["name"])); // Name
      arrCurrentBrief += ',"txtItensId": "' + txtItens[0]["id"] + '"';
      arrCurrentBrief += ',"txtItensName": "' + txtItens[0]["name"] + '"';

      // Cards
      if (!txtCards) {
        table.append(
          $("<td>").addClass("inputValue").addClass("txtCardsRow").text("-")
        );
        arrCurrentBrief += ',"txtCards": "-"';
      } else {
        /*var listCardsBrief = "";
          var listCardsBriefJSON = "";
          JSON.parse(txtCards).forEach(function(o, index){ // For each element in JSON
            listCardsBrief += o["name"] + "\n";
            listCardsBriefJSON += o["name"] + "*";
          });*/

        table.append(
          $("<td style='white-space: pre;'>")
            .addClass("inputValue")
            .addClass("txtCardsRow")
            .text(txtCards.replace(",", "\n"))
        ); // Name
        arrCurrentBrief += ',"txtCards": "' + txtCards.replace(",", "*") + '"';
      }

      // Charms
      if (!txtCharms) {
        table.append(
          $("<td>").addClass("inputValue").addClass("txtCharmsRow").text("-")
        );
        arrCurrentBrief += ',"txtCharms": "-"';
      } else {
        /*var listCharmsBrief = "";
          var listCharmsBriefJSON = "";
          (txtCharms.split(",")).forEach(function(o){ // For each element in string
            listCharmsBrief += o + "\n";
            listCharmsBriefJSON += o + "*";
          });*/

        table.append(
          $("<td style='white-space: pre;'>")
            .addClass("inputValue")
            .addClass("txtCharmsRow")
            .text(txtCharms.replace(",", "\n"))
        ); // Name
        arrCurrentBrief +=
          ',"txtCharms": "' + txtCharms.replace(",", "*") + '"';
      }

      // Amount
      table.append(
        $("<td>")
          .addClass("inputValue")
          .addClass("txtQtdRow")
          .text(txtQtd + " un")
      );
      arrCurrentBrief += ',"txtQtd": "' + txtQtd + ' un"';

      // Price
      txtPriceMasked = priceMask(txtPrice);
      table.append(
        $("<td>")
          .addClass("inputValue")
          .addClass("txtPriceRow")
          .text(txtPriceMasked + " Z")
      );
      arrCurrentBrief += ',"txtPrice": "' + txtPriceMasked + ' Z"';

      // Row action buttons
      table.append(
        $("<td>")
          .addClass("rowActionButtons")
          .append(
            "<a href='javascript:void(0);' class='btnActionEditRow'><i class='fas fa-pencil-alt'></i></a> <a href='javascript:void(0);' class='btnActionDeleteRow'><i class='fas fa-trash-alt'></i></a>"
          )
      );

      $("#tbBrief").append(table);

      /**
       * Validate if input has value
       */
      if (!$("#divBrief #txtBrief").val()) {
        // Has no value, first item
        arrCurrentBrief += "}]"; // End JSON String
      } else {
        /**
         * This part of code will append the new row of table in the existent JSON of the table
         */

        // Has value
        var arrBrief = "["; // Get into a String
        JSON.parse($("#divBrief #txtBrief").val()).forEach(function (o, index) {
          // For each element in JSON

          arrBrief += '{"txtRefine": "' + o["txtRefine"] + '"';
          arrBrief += ',"txtItensId": "' + o["txtItensId"] + '"';
          arrBrief += ',"txtItensName": "' + o["txtItensName"] + '"';
          arrBrief += ',"txtCards": "' + o["txtCards"] + '"';
          arrBrief += ',"txtCharms": "' + o["txtCharms"] + '"';
          arrBrief += ',"txtQtd": "' + o["txtQtd"] + '"';
          arrBrief += ',"txtPrice": "' + o["txtPrice"] + '"},';
        });

        arrCurrentBrief = arrBrief + "{" + arrCurrentBrief + "}]"; // Complete JSON
      }

      // Set value in global variable
      stringCurrentBrief = arrCurrentBrief;

      // Set to the HTML the JSON of Table, used to create the post
      createHTMLJSON(arrCurrentBrief);
    } else {
      e.preventDefault();
      // Wich field has no value?

      if (!$("#txtItens").val()) {
        // Is emtpy
        $(".step-three .item-two li").addClass("has-error is-focused"); // Highlight the field
      }

      if (!$("#txtQtd").val()) {
        $(".step-three .item-five li").addClass("has-error is-focused");
      }

      if (!$("#txtPrice").val()) {
        $(".step-three .item-six li").addClass("has-error is-focused");
      }
    }
  });

  /***************
   ** btnEditItem
   ***************/
  $(document).on("click", "#btnEditItem", function (e) {
    // Hide error's hint
    $(".step-three #hint-error").addClass("hide");

    // Validate fields
    if ($("#txtQtd").val() && $("#txtPrice").val()) {
      e.preventDefault();

      /**
       * Get the input field's values
       */
      var txtRefine = ""; // Text
      var txtCards = ""; // Text
      var txtCharms = ""; // Text
      var txtQtd = ""; // Text
      var txtPrice = ""; // Text

      // Validate inputs
      // <condition> ? <code for true> : <code for false>
      !$("#txtRefine").val()
        ? (txtRefine = "-")
        : (txtRefine = $("#txtRefine").val());
      !$("#txtCards").val()
        ? (txtCards = "-")
        : (txtCards = $("#txtCards").val());
      !$("#txtCharms").val()
        ? (txtCharms = "-")
        : (txtCharms = $("#txtCharms").val());
      !$("#txtQtd").val() ? (txtQtd = "-") : (txtQtd = $("#txtQtd").val());
      !$("#txtPrice").val()
        ? (txtPrice = "-")
        : (txtPrice = $("#txtPrice").val());

      // Change value in JSON
      var jsonCurrentBrief = JSON.parse(stringCurrentBrief);
      jsonCurrentBrief[rowIndex]["txtRefine"] = txtRefine;
      jsonCurrentBrief[rowIndex]["txtCards"] = txtCards.replace(",", "*");
      jsonCurrentBrief[rowIndex]["txtCharms"] = txtCharms.replace(",", "*");
      jsonCurrentBrief[rowIndex]["txtQtd"] = txtQtd + " un";
      jsonCurrentBrief[rowIndex]["txtPrice"] = priceMask(txtPrice) + " Z";

      // Clear all
      //! clearInputs(); Doesn't a good option

      // Set to the HTML the JSON of Table, used to create the post
      createHTMLJSON(JSON.stringify(jsonCurrentBrief));

      // Change Global Variable
      stringCurrentBrief = JSON.stringify(jsonCurrentBrief);

      // Remove the render of similar pattern of FlexDatalist.
      $(
        "div.steps.step-three div.union-group.item-two.form-group ul li"
      ).removeClass(
        // Find the corret local
        "hide" // Hide the input
      );
      $(
        "div.steps.step-three div.union-group.item-two.form-group ul .editItem"
      ).remove();

      // Remove btnEditItem and Append btnAddItem
      $("#btnEditItem").remove();
      $("#btnAddItem").removeClass("hide");
      $("td.rowActionButtons").append(
        "<a href='javascript:void(0);' class='btnActionDeleteRow'><i class='fas fa-trash-alt'></i></a>"
      );

      /********************************************************************************
       ** Change the values in visual HTML table
       **
       ** $('#tbBrief tr:nth-last-child('+rowIndex+1+') td:nth-last-child(3)').html();
       **
       ** nth-last-child starts at 1
       ********************************************************************************/
      //console.log($("#tbBrief tr:nth-child("+(rowIndex+2)+")").html());
      $("#tbBrief tr:nth-child(" + (rowIndex + 2) + ") td:nth-child(1)")
        .empty()
        .append(
          // Clear the child an append the new
          txtRefine
        ); // Refine
      $("#tbBrief tr:nth-child(" + (rowIndex + 2) + ") td:nth-child(5)")
        .empty()
        .append(txtCards.replace(",", "<br>")); // Cards
      $("#tbBrief tr:nth-child(" + (rowIndex + 2) + ") td:nth-child(6)")
        .empty()
        .append(txtCharms.replace(",", "<br>")); // Charms
      $("#tbBrief tr:nth-child(" + (rowIndex + 2) + ") td:nth-child(7)")
        .empty()
        .append(txtQtd + " un"); // Qtd
      $("#tbBrief tr:nth-child(" + (rowIndex + 2) + ") td:nth-child(8)")
        .empty()
        .append(jsonCurrentBrief[rowIndex]["txtPrice"]); // Price
    } else {
      e.preventDefault();
      // Wich field has no value?

      if (!$("#txtQtd").val()) {
        // Is emtpy
        $(".step-three .item-five li").addClass("has-error is-focused"); // Highlight the field
      }

      if (!$("#txtPrice").val()) {
        $(".step-three .item-six li").addClass("has-error is-focused");
      }
    }
  });

  /**
   * TODO Delete Row
   * This function will delete the selected row
   */
  $(document).on("click", "a.btnActionDeleteRow", function () {
    // Get ROW INDEX on click:
    rowIndex = $(this).closest("tr").index() - 1;
    var jsonCurrentBrief = JSON.parse(stringCurrentBrief);

    // Remove values from JSON

    // Render HTML Table

    // Set to the HTML the JSON of Table, used to create the post
    createHTMLJSON(JSON.stringify(jsonCurrentBrief));

    // Change Global Variable
    stringCurrentBrief = JSON.stringify(jsonCurrentBrief);
  });

  /**
   * Edit Row
   * This function will set the correct values of selected row in the FlexDatalist inputs of the form
   * https://www.tutorialrepublic.com/faq/how-to-bind-click-event-to-dynamically-added-elements-in-jquery.php
   */
  $(document).on("click", "a.btnActionEditRow", function () {
    //alert("audio Here");
    // Count of rows
    //var rowCount = $("#tbBrief tr").length;
    // Get COLUMN INDEX on click:
    //$(this).closest("td").index();

    // Get ROW INDEX on click:
    rowIndex = $(this).closest("tr").index() - 1;
    var jsonCurrentBrief = JSON.parse(stringCurrentBrief);

    /***********************************
     ** Set values in the inputs
     **
     ** Why it doesn't work -> $("#txtItens").val(jsonCurrentBrief[rowIndex]["txtItensName"]);
     ** Because a flexdatalist JQuery are using valueProperty: "*", and it breaks the 'Remove's function'
     ** So the Item cannot be changed
     ************************************/
    // Render a similar pattern of FlexDatalist just to user know wich item is.
    $(
      "div.steps.step-three div.union-group.item-two.form-group ul li"
    ).addClass(
      // Find the corret local
      "hide" // Hide the input
    );
    $(
      "div.steps.step-three div.union-group.item-two.form-group ul .editItem"
    ).remove();
    $("div.steps.step-three div.union-group.item-two.form-group ul").append(
      // Find the corret local
      "<li class='value editItem'><span class='text'>" +
        jsonCurrentBrief[rowIndex]["txtItensName"] +
        "</span></li>" // Render the pattern
    );

    // Values in JSON if they are different of '-', it means not empty input
    $("#txtQtd").val(jsonCurrentBrief[rowIndex]["txtQtd"].replace(" un", ""));
    $("#txtPrice").val(
      jsonCurrentBrief[rowIndex]["txtPrice"].replace(" Z", "").replace(/,/g, "")
    );
    if (jsonCurrentBrief[rowIndex]["txtRefine"] != "-")
      $("#txtRefine").val(jsonCurrentBrief[rowIndex]["txtRefine"]);

    if (jsonCurrentBrief[rowIndex]["txtCards"] != "-")
      $("#txtCards").val(
        jsonCurrentBrief[rowIndex]["txtCards"].replace("*", ", ")
      );
    if (jsonCurrentBrief[rowIndex]["txtCharms"] != "-")
      $("#txtCharms").val(
        jsonCurrentBrief[rowIndex]["txtCharms"].replace("*", ", ")
      );

    /***********************************************************************
     ** Remove btnAddItem and Append btnEditItem
     ** Remove Row action button Delete to do not change indexs of JSON
     **********************************************************************/
    $("#btnAddItem").addClass("hide");
    $("a.btnActionDeleteRow").remove();
    // If doesn't exist btnEditItem, append it
    if (!$("#btnEditItem").length)
      $("div #actionButtons").append(
        '<button id="btnEditItem" class="sale-button wprc-submit sale-button-edit" type="button">Editar</button>'
      );
  });
});
