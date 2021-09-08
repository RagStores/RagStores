jQuery(document).ready(function ($) {
  /**
   ** Get values about item and create the Brief Table.
   ** This table will be used to get all submited itens in the form.
   ** It's okay if an experienced user changes the values, because it will only affect their own store.
   */

  // Closure
  /** @type {number} Loop controler. */ var rowCount = 0;
  /** @type {number} Index of selected row. */ var rowIndex = 0;
  /** @type {json} Variable used as Setter/Getter by the functions. */ var jsonGlobalBrief;

  /*************************************
   ** Create a JSON with current values
   * @param {json} jsonBrief A new JSON or an available with values of the Brief Table.
   * @param {number} fRowIndex The index of the row.
   * @param {string} txtRefine The value of the refine.
   * @param {string} txtCards The name of the cards, use comma (",") without "space" to separate them.
   * @param {string} txtEnchants The name of the enchantments, use comma (",") without "space" to separate them.
   * @param {string} txtQtd The total amount of the item.
   * @param {string} txtPrice The unit price of the item.
   * @param {string} txtItensId (optional) The ID of the item, see file "js/[server]/dtlItens.json".
   * @param {string} txtItensName (optional) The name of the item.
   * @returns {json} The JSON used to render the HMTL table.
   **************************************/
  var clearBriefJSON = function (json,fRowIndex,txtRefine,txtCards,txtEnchants,txtQtd,txtPrice,txtItensId,txtItensName) {
    // Create a JSON with all clear values
    json[fRowIndex]["txtRefine"] = txtRefine;
    json[fRowIndex]["txtCards"] = txtCards.replace(/,/g, "*");
    json[fRowIndex]["txtEnchants"] = txtEnchants.replace(/,/g, "*");
    json[fRowIndex]["txtQtd"] = txtQtd + " un";
    json[fRowIndex]["txtPrice"] = priceMask(txtPrice) + " Z";

    // Optional param https://stackoverflow.com/questions/148901/is-there-a-better-way-to-do-optional-function-parameters-in-javascript
    (typeof txtItensId === "undefined") ? "skip" : json[fRowIndex]["txtItensId"] = txtItensId;
    (typeof txtItensName === "undefined") ? "skip" : json[fRowIndex]["txtItensName"] = txtItensName;

    return json;
  };


  /*************************************************************************
   ** Change the values in visual HTML table
   * @param {boolean} isAddItem A controller to know which button is pressed.
   * @param {string} strCurrentBrief (optional) Stringify the return of clearBriefJSON function. 
   **************************************************************************/
  var createBriefTable = function (isAddItem, strCurrentBrief) {
    /**
     ** Create Table
     * https://stackoverflow.com/questions/8749236/create-table-with-jquery-append
     */


    /**
     ** Is btnAddItem pressed (manual insert)? 
     */
    if(isAddItem) {
      let strCurrentBrief = ""; // String to put all itens and populate the input
      let table = $("<tr>").addClass("dataRow");

      /**
       * Now, get the values from the input field
       */
      let txtRefine = $("#txtRefine").val(); // Text
      let txtItens = JSON.parse($("#txtItens").val()); // JSON
      let txtCards = $("#txtCards").val(); // Text
      let txtEnchants = $("#txtEnchants").val(); // Text
      let txtQtd = $("#txtQtd").val(); // Text
      let txtPrice = $("#txtPrice").val(); // Text

      /**
       * Validate if input has value
       */
      if (!$("#divBrief #txtBrief").val()) {
          // Has no value, first item
          strCurrentBrief = "[{"; // Start JSON String
      }
    
      /**
       ** Adding Rows
       */
      // Refine
      if (!txtRefine) {
          // Is emtpy
          table.append(
              $("<td>").addClass("inputValue").addClass("txtRefineRow").text("-")
          );
          strCurrentBrief += '"txtRefine": "-"'; // Create a JSON String
      } else {
          table.append(
              $("<td>")
              .addClass("inputValue")
              .addClass("txtRefineRow")
              .text(txtRefine)
          );
          strCurrentBrief += '"txtRefine": "' + txtRefine + '"';
      }
    
    
      /**
       ** There are 2 options to get the photo
       ** https://static.divine-pride.net/images/items/item/501.png << BEST
       ** https://www.divine-pride.net/img/items/item/bRO/501
       */
    
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
              "<td class='inputValue'><a href='/search/" +
              txtItens[0]["id"] +
              "' target='_blank'>" +
              txtItens[0]["name"] +
              "</a></td>"
          )
      ); // Name
      //table.append($("<td>").addClass("inputValue").text(txtItens[0]["name"])); // Name
      strCurrentBrief += ',"txtItensId": "' + txtItens[0]["id"] + '"';
      strCurrentBrief += ',"txtItensName": "' + txtItens[0]["name"] + '"';
          
      // Cards
      if (!txtCards) {
          table.append(
              $("<td>").addClass("inputValue").addClass("txtCardsRow").text("-")
          );
          strCurrentBrief += ',"txtCards": "-"';
      } else {
          
          table.append(
              $("<td style='white-space: pre;'>")
              .addClass("inputValue")
              .addClass("txtCardsRow")
              .text(txtCards.replace(/,/g, "\n"))
          ); // Name
          strCurrentBrief += ',"txtCards": "' + txtCards.replace(/,/g, "*") + '"';
      }
    
      // Enchants
      if (!txtEnchants) {
          table.append(
              $("<td>").addClass("inputValue").addClass("txtEnchantsRow").text("-")
          );
          strCurrentBrief += ',"txtEnchants": "-"';
      } else {
            
          table.append(
              $("<td style='white-space: pre;'>")
              .addClass("inputValue")
              .addClass("txtEnchantsRow")
              .text(txtEnchants.replace(/,/g, "\n"))
          ); // Name
          strCurrentBrief +=
              ',"txtEnchants": "' + txtEnchants.replace(/,/g, "*") + '"';
      }
    
      // Amount
      table.append(
          $("<td>")
          .addClass("inputValue")
          .addClass("txtQtdRow")
          .text(txtQtd + " un")
      );
      strCurrentBrief += ',"txtQtd": "' + txtQtd + ' un"';
      
      // Price
      let txtPriceMasked = priceMask(txtPrice);
      table.append(
          $("<td>")
          .addClass("inputValue")
          .addClass("txtPriceRow")
          .text(txtPriceMasked + " Z")
      );
      strCurrentBrief += ',"txtPrice": "' + txtPriceMasked + ' Z"';
      
      // Row action buttons
      table.append(
          $("<td>")
          .addClass("rowActionButtons")
          .append(
              "<a href='javascript:void(0);' class='btnActionEditRow'><i class='fas fa-pencil-alt'></i></a> <a href='javascript:void(0);' class='btnActionDeleteRow'><i class='fas fa-trash-alt'></i></a>"
          )
      );
      
      // Append a row in table tbBrief
      $("#tbBrief").append(table);

      /**
       * Validate if input has value
       */
      if (!$("#divBrief #txtBrief").val()) {
        // Has no value, first item
        strCurrentBrief += "}]"; // End JSON String
      } else {
        /**
         * This part of code will append the new row of table in the existent JSON of the table
         */

        // Has value
        let arrBrief = "["; // Get into a String
        JSON.parse($("#divBrief #txtBrief").val()).forEach(function (o, index) {
          // For each element in JSON

          arrBrief += '{"txtRefine": "' + o["txtRefine"] + '"';
          arrBrief += ',"txtItensId": "' + o["txtItensId"] + '"';
          arrBrief += ',"txtItensName": "' + o["txtItensName"] + '"';
          arrBrief += ',"txtCards": "' + o["txtCards"] + '"';
          arrBrief += ',"txtEnchants": "' + o["txtEnchants"] + '"';
          arrBrief += ',"txtQtd": "' + o["txtQtd"] + '"';
          arrBrief += ',"txtPrice": "' + o["txtPrice"] + '"},';
        });

        strCurrentBrief = arrBrief + "{" + strCurrentBrief + "}]"; // Complete JSON
      }

      // Set value in global variable
      jsonGlobalBrief = JSON.parse(strCurrentBrief);

      // Set to the HTML the string JSON of Table, used to create the post
      createHTMLJSON(strCurrentBrief);

    
    } else {

      // Set value in global variable
      jsonGlobalBrief = JSON.parse(strCurrentBrief);

      // Set to the HTML the string JSON of Table, used to create the post
      createHTMLJSON(strCurrentBrief);



      $("#tbBrief tr.dataRow").remove(); // Clear the whole table

      // Rebuild
      for (let index = 0; index < rowCount; index++) {
        
        let table = $("<tr>").addClass("dataRow");

        /**
         ** Adding Rows
         */
        // Refine
        table.append(
          $("<td>")
          .addClass("inputValue")
          .addClass("txtRefineRow")
          .text(jsonGlobalBrief[index]["txtRefine"])
        );

        // Item
        table.append(
          $("<td style='display: none;'>")
          .addClass("inputValue")
          .text(jsonGlobalBrief[index]["txtItensId"])
        ); // id
        table.append(
          $(
              "<td><img src='https://static.divine-pride.net/images/items/item/" +
              jsonGlobalBrief[index]["txtItensId"] +
              ".png' alt='" +
              jsonGlobalBrief[index]["txtItensName"] +
              "' width='auto' height='auto' style='margin-right: -2px;'></td>"
          )
        ); // Image
        table.append(
          $(
              "<td class='inputValue'><a href='https://www.divine-pride.net/database/item/" +
              jsonGlobalBrief[index]["txtItensId"] +
              "' target='_blank'>" +
              jsonGlobalBrief[index]["txtItensName"] +
              "</a></td>"
          )
        ); // Name

        // Cards
        table.append(
          $("<td style='white-space: pre;'>")
          .addClass("inputValue")
          .addClass("txtCardsRow")
          .text(jsonGlobalBrief[index]["txtCards"].replaceAll("*", "<br>"))
        ); // Name

        // Enchants
        table.append(
          $("<td style='white-space: pre;'>")
          .addClass("inputValue")
          .addClass("txtEnchantsRow")
          .text(jsonGlobalBrief[index]["txtEnchants"].replaceAll("*", "<br>"))
        ); // Name

        // Amount
        table.append(
          $("<td>")
          .addClass("inputValue")
          .addClass("txtQtdRow")
          .text(jsonGlobalBrief[index]["txtQtd"])
        );

        // Price
        table.append(
          $("<td>")
          .addClass("inputValue")
          .addClass("txtPriceRow")
          .text(jsonGlobalBrief[index]["txtPrice"])
        );

        // Row action buttons
        table.append(
          $("<td>")
          .addClass("rowActionButtons")
          .append(
              "<a href='javascript:void(0);' class='btnActionEditRow'><i class='fas fa-pencil-alt'></i></a> <a href='javascript:void(0);' class='btnActionDeleteRow'><i class='fas fa-trash-alt'></i></a>"
          )
        );

        // Append a row in table tbBrief
        $("#tbBrief").append(table);

      } // End For
    } // End Else
  };


  /*********************************************************************
   ** Create the visual HTML brief table
   * @param {json} jsonBrief Use the return of clearBriefJSON function.
   * @param {number} fRowIndex The index of the row.
   *********************************************************************/
  var renderEditorBriefTable = function (jsonBrief, fRowIndex) {
    /**
     * $('#tbBrief tr:nth-last-child('+rowIndex+1+') td:nth-last-child(3)').html();
     *
     * nth-last-child starts at 1
     */
    //console.log($("#tbBrief tr:nth-child("+(rowIndex+2)+")").html());
    $("#tbBrief tr:nth-child(" + (fRowIndex + 2) + ") td:nth-child(1)")
      .empty()
      .append(
        // Clear the child an append the new
        jsonBrief[fRowIndex]["txtRefine"]
      ); // Refine
    $("#tbBrief tr:nth-child(" + (fRowIndex + 2) + ") td:nth-child(5)")
      .empty()
      .append(jsonBrief[fRowIndex]["txtCards"].replaceAll("*", "<br>")); // Cards
    $("#tbBrief tr:nth-child(" + (fRowIndex + 2) + ") td:nth-child(6)")
      .empty()
      .append(jsonBrief[fRowIndex]["txtEnchants"].replaceAll("*", "<br>")); // Enchants
    $("#tbBrief tr:nth-child(" + (fRowIndex + 2) + ") td:nth-child(7)")
      .empty()
      .append(jsonBrief[fRowIndex]["txtQtd"]); // Qtd
    $("#tbBrief tr:nth-child(" + (fRowIndex + 2) + ") td:nth-child(8)")
      .empty()
      .append(jsonBrief[fRowIndex]["txtPrice"]); // Price
  };


  /**********************************************************************************
   ** Create the input to insert JSON
   * @param {string} strCurrentBrief Stringify the return of clearBriefJSON function. 
   **********************************************************************************/
  var createHTMLJSON = function (strCurrentBrief) {
    /**
     ** Adding the brief data in input (HTML) to the next item validation
     */
    $("#divBrief #txtBrief").remove();
    $("#divBrief").append(
      "<input type='text' id='txtBrief' name='txtBrief' autocomplete='off' tabindex='-1' style='position: absolute; top: -14000px; left: -14000px;'>"
    ); // Append to HTML the input
    $("#divBrief #txtBrief").val(strCurrentBrief); // Set the value
    //console.log(strCurrentBrief);

    /**
     ** Adding the brief data in a input
     *? Do not remove, using this input to convert into a JSON in process-upload.php
     */
    $("#divBrief #txtSendBrief").remove(); // Clear to insert the new one
    // https://stackoverflow.com/questions/38298158/php-json-decode-returns-null-from-string
    // Replace all " to the hex code
    $("#divBrief").append(
      "<input type='text' id='txtSendBrief' name='txtSendBrief' autocomplete='off' tabindex='-1' style='position: absolute; top: -14000px; left: -14000px;' value='" +
        strCurrentBrief.replace(/"/g, "&quot;") +
        "'>"
    );
    //console.log($("#txtBrief").val());
    //console.log(strCurrentBrief);
  };

  /****************************************************
   ** Clear all inputs
   ****************************************************/
  var clearInputs = function(){
    // Clear inputs
    $("#txtRefine").val("");
    $(".step-three .item-one li").css("display", "");

    $("#txtItens").val("");
    $(".step-three .item-two li").css("display", "");

    $("#txtCards").val("");
    $(".step-three .item-three li").css("display", "");

    $("#txtEnchants").val("");
    $(".step-three .item-four li").css("display", "");

    $("#txtQtd").val("");
    $(".step-three .item-five li").css("display", "");

    $("#txtPrice").val("");
    $(".step-three .item-six li").css("display", "");
  };


  /*************************************************************************************
   ** Create a Mask for item's price
   * @param {string} txtPrice The unit price of the item.
   * @returns {string} The unit price with your correct mask. The comma (",") is used as decimal separator.
   *************************************************************************************/
  var priceMask = function (txtPrice) {
    // Add a mask https://stackoverflow.com/questions/15802100/javascript-phone-mask-for-text-field-with-regex
    if (txtPrice.length > 3) {
      // Milhar - maior do que 3 dígitos (PT-BR) | Thousand
      if (txtPrice.length > 4) {
        if (txtPrice.length > 5) {
          if (txtPrice.length > 6) {
            // Milhão (PT-BR) | Million
            if (txtPrice.length > 7) {
              if (txtPrice.length > 8) {
                if (txtPrice.length > 9) {
                  // Bilhão (PT-BR) | Billion
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

//--------- CALL TO ACTIONS ---------

  /************************************************
   ** btnAddItem (Insert item - Blue button)
   ** This function set the new item in the table
   ************************************************/
  $("#btnAddItem").click(function (e) {
    // Hide the error hint
    $(".step-three #hint-error").addClass("hide");

    // Validate fields
    if (
      $("#txtItens").val() &&
      $("#txtQtd").val() &&
      $("#txtPrice").val() &&
      rowCount < 12
    ) { // All good
      e.preventDefault();
      rowCount++; // Controller increase +1

      // Render the HTML table
      createBriefTable(true);

      // Clear all
      clearInputs();

    } else { // Something is wrong

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

  /*************************************************
   ** btnEditItem (Confirm Edition - Pink button)
   ** This function set the changes made on the item
   **************************************************/
  $(document).on("click", "#btnEditItem", function (e) {
    // Hide the error hint
    $(".step-three #hint-error").addClass("hide");

    // Validate fields
    if ($("#txtQtd").val() && $("#txtPrice").val()) {
      e.preventDefault();

      /**
       ** Get the input field's values
       */
      let txtRefine = ""; // Text
      let txtCards = ""; // Text
      let txtEnchants = ""; // Text
      let txtQtd = ""; // Text
      let txtPrice = ""; // Text

      // Validate inputs
      //?   <condition> ? <code for true> : <code for false>
      !$("#txtRefine").val()
        ? (txtRefine = "-")
        : (txtRefine = $("#txtRefine").val());

      !$("#txtCards").val()
        ? (txtCards = "-")
        : (txtCards = $("#txtCards").val());

      !$("#txtEnchants").val()
        ? (txtEnchants = "-")
        : (txtEnchants = $("#txtEnchants").val());

      !$("#txtQtd").val() 
        ? (txtQtd = "-")
        : (txtQtd = $("#txtQtd").val());

      !$("#txtPrice").val()
        ? (txtPrice = "-")
        : (txtPrice = $("#txtPrice").val());

      // Change value in JSON
      jsonGlobalBrief = clearBriefJSON(jsonGlobalBrief,rowIndex,txtRefine,txtCards,txtEnchants,txtQtd,txtPrice);

      // Clear all
      clearInputs();

      // Set to the HTML the JSON of Table, used to create the post
      createHTMLJSON(JSON.stringify(jsonGlobalBrief));

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

      /**
       ** Change the values in visual HTML table
       */
      renderEditorBriefTable(jsonGlobalBrief, rowIndex);

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

    // Enable btnRenderSaved
    $("#btnRenderSaved").prop("disabled", false);
    $("#btnRenderSaved").removeClass("um-disabled");

  });

  /******************************************************************************************
   ** btnActionEditRow (Edit Row - Pencil button)
   ** This function will set the correct values of selected row in the FlexDatalist inputs of the form
   ** https://www.tutorialrepublic.com/faq/how-to-bind-click-event-to-dynamically-added-elements-in-jquery.php
   *******************************************************************************************/
  $(document).on("click", "a.btnActionEditRow", function () {
    //alert("audio Here");
    // Count of rows
    //var rowCount = $("#tbBrief tr").length;
    // Get COLUMN INDEX on click:
    //$(this).closest("td").index();

    // Disable btnRenderSaved
    $("#btnRenderSaved").prop("disabled", true); // use prop or attr
    $("#btnRenderSaved").addClass("um-disabled");

    // Get ROW INDEX on click:
    rowIndex = $(this).closest("tr").index() - 1;

    /**
     ** Set values in the inputs
     *
     *? Why it doesn't work -> $("#txtItens").val(jsonGlobalBrief[rowIndex]["txtItensName"]);
     *? Because a flexdatalist JQuery are using valueProperty: "*", and it breaks the 'Remove's function'
     *? So the Item cannot be changed and without knowing the respective ID, the submition doesn't work properly. 
     */
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
      jsonGlobalBrief[rowIndex]["txtItensName"] +
        "</span></li>" // Render the pattern
    );

    // Values in JSON if they are different of '-', it means not empty input
    $("#txtQtd").val(jsonGlobalBrief[rowIndex]["txtQtd"].replace(" un", ""));
    $("#txtPrice").val(
      jsonGlobalBrief[rowIndex]["txtPrice"].replace(" Z", "").replace(/,/g, "")
    );
    if (jsonGlobalBrief[rowIndex]["txtRefine"] != "-") {
      $("#txtRefine").val(jsonGlobalBrief[rowIndex]["txtRefine"]);
    }

    // TODO: It show only one value, how to fix it?
    if (jsonGlobalBrief[rowIndex]["txtCards"] != "-") {
      $("#txtCards").val(
        jsonGlobalBrief[rowIndex]["txtCards"].replace("*", ", ")
      );
    }
    if (jsonGlobalBrief[rowIndex]["txtEnchants"] != "-") {
      $("#txtEnchants").val(
        jsonGlobalBrief[rowIndex]["txtEnchants"].replace("*", ", ")
      );
    }

    /**
     ** Remove btnAddItem (blue) and Append btnEditItem (pink)
     ** Remove Row action button Delete to do not change index of JSON
     */
    $("#btnAddItem").addClass("hide");
    $("a.btnActionDeleteRow").remove();
    // If doesn't exist btnEditItem, append it
    if (!$("#btnEditItem").length) {
      $("div #actionButtons").append(
        '<button id="btnEditItem" class="sale-button wprc-submit sale-button-edit" type="button">Editar</button>'
      );
    }
  });

  /************************************************
   ** btnActionDeleteRow (Delete Row - Bin button) 
   ** This function will delete the selected row
   ************************************************/
  $(document).on("click", "a.btnActionDeleteRow", function () {
    // Get ROW INDEX on click:
    rowIndex = $(this).closest("tr").index() - 1;

    // Decrease 
    rowCount--;

    // Remove values from JSON
    delete jsonGlobalBrief[rowIndex]; // It creates a NULL element

    /**
     ** Remove NULL from the object
     ** https://stackoverflow.com/questions/33884033/how-can-i-remove-empty-object-in-from-an-array-in-js/33884064
     */
    let jsonStringClear = (
      JSON.stringify(
        jsonGlobalBrief.filter(
          function(el) {
            // keep element if it's not an object, or if it's a non-empty object
            return typeof el != "object" || Array.isArray(el) || Object.keys(el).length > 0;
          }
        )
      )
    );

    // Change the values in visual HTML table
    createBriefTable(false, jsonStringClear);

  });

  /*******************************************
   ** btnRenderSaved (Load saved Table Item)
   *******************************************/
  $("#btnRenderSaved").click(function (e) {
    e.preventDefault();

    // Get our references
    let inputIndex = $("#txtSavedTableItem").val();
    let txtCurrentJsonSalesItems = $("#txtCurrentJsonSalesItems"+inputIndex).val();

    // Count of Objects in JSON
    rowCount = JSON.parse(txtCurrentJsonSalesItems).length;
         
    createBriefTable(false,txtCurrentJsonSalesItems);

    // Change txtTabNiceName value
    $("#txtTabNiceName").val($("#savedTables option[value='"+inputIndex+"']").text());

    // Scroll near to Brief Table
    $.scroll(".union-group.item-six");

  });

  /******************************************************
   *! DEPRECATED
   ** btnRenderSaved (Load saved Table Item) 
   ** AJAX - Get valeus from server without reload page
   ******************************************************
   $("#btnRenderSaved").click(function (e) {
    e.preventDefault();

    // Get our references
    var txtSavedTableItem = $("#txtSavedTableItem").val();
   
    // ajax
    $.ajax({
      type: "GET", 
      url: myAjax.ajaxurl, // Wordpress AJAX
      dataType : "json",
      data: ({
        action: "get_json_item_table", // Function to get data
        txtSavedTableItem: txtSavedTableItem // Input field
      }),
      
      /beforeSend: function() {
        // Disable buttons
        $("#btnRenderSaved").attr("disabled", true);
        $("#btnAddItem").attr("disabled", true);

      },/
      success:function(result) { 
        // Create the brief table 
        // Render the HTML table

        // Count of Objects in JSON
        rowCount = Object.keys(result).length;
         
        createBriefTable(false,JSON.stringify(result));

        // Scroll near to Brief Table
        $.scroll(".union-group.item-six");

      },
      error: function(xhr, status, error){
        var errorMessage = xhr.status + ': ' + xhr.statusText
        //alert('Error - ' + errorMessage);
        console.log("Erro AJAX: " + errorMessage);
      }
    })
    /.always(function(data) {
      // Enable buttons
      $("#btnRenderSaved").attr("disabled", false);
      $("#btnAddItem").attr("disabled", false);
    });/
    });
  */

});
