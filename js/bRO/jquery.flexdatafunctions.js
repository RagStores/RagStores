jQuery(document).ready(function($) {

	/**
	 * Flex Datalist - https://github.com/sergiodlopes/jquery-flexdatalist
	 */

	 var dtlRefine = [
	 {
    	"name": "+1"
  	 },
  	 {
    	"name": "+2"
  	 },
  	 {
    	"name": "+3"
  	 },
  	 {
    	"name": "+4"
  	 },
  	 {
    	"name": "+5"
  	 },
  	 {
    	"name": "+6"
  	 },
  	 {
    	"name": "+7"
  	 },
  	 {
    	"name": "+8"
  	 },
  	 {
    	"name": "+9"
  	 },
  	 {
    	"name": "+10"
  	 },
  	 {
    	"name": "+11"
  	 },
  	 {
    	"name": "+12"
  	 },
  	 {
    	"name": "+13"
  	 },
  	 {
    	"name": "+14"
  	 },
  	 {
    	"name": "+15"
  	 },
  	 {
    	"name": "+16"
  	 },
  	 {
    	"name": "+17"
  	 },
  	 {
    	"name": "+18"
  	 },
  	 {
    	"name": "+19"
  	 },
  	 {
    	"name": "+20"
  	 }
	];

/*
  var dtlItens = [
  {
    "id": "501",
    "name": "Poção Vermelha"
  }
];
*/


	$("#txtRefine").flexdatalist({ // Localizando a Tag HTML pelo id
     minLength: 1,
     limitOfValues: 1,
     valueProperty: "name",
     searchIn: "name",
     data: dtlRefine,
     visibleProperties: ["name"],
     searchContain: true,
     searchByWord: true,
     selectionRequired: true,
     multiple: true,
     maxShownResults: 5
  });

  $("#txtAccountNickname").flexdatalist({ // Account Page
    limitOfValues: 1,
    multiple: true,
    minLength: 999
  });
  
  $("#txtAccountSocial").flexdatalist({ // Account Page
    limitOfValues: 1,
    multiple: true,
    minLength: 999
  });

  $("#txtUserCupon").flexdatalist({ // Account Page
    limitOfValues: 1,
    multiple: true,
    minLength: 999
  });

	$("#txtItens").flexdatalist({ // Search HTML tag by id
     minLength: 1,
     limitOfValues: 1,
     valueProperty: "*",
     searchIn: "name",
     url: "/wp-content/themes/hestia-child/js/bRO/dtlItens.json",
     visibleProperties: ["name","id"],
     searchContain: true,
     searchByWord: true,
     selectionRequired: true,
     multiple: true,
     maxShownResults: 5
	});
  $(".item-search-bar").flexdatalist({ // Search Bar
     minLength: 1,
     limitOfValues: 1,
     valueProperty: "id",
     searchIn: "name",
     url: "/wp-content/themes/hestia-child/js/bRO/dtlItens.json",
     visibleProperties: ["name","id"],
     searchContain: true,
     searchByWord: true,
     selectionRequired: true,
     multiple: true,
     maxShownResults: 5
  });
  
  $("#txtCards").flexdatalist({
     limitOfValues: 4,
     valueProperty: "name", // Changed to createBriefTable works
     searchIn: "name",
     url: "/wp-content/themes/hestia-child/js/bRO/dtlCards.json",
     visibleProperties: ["name","id"],
     searchContain: true,
     searchByWord: true,
     selectionRequired: true,
     multiple: true,
     allowDuplicateValues: true,
     maxShownResults: 5
	});

  $("#txtEnchants").flexdatalist({
     limitOfValues: 4,
     valueProperty: "name", // Changed to createBriefTable works
     searchIn: "name",
     url: "/wp-content/themes/hestia-child/js/bRO/dtlEnchantments.json",
     visibleProperties: ["name","id"],
     searchContain: true,
     searchByWord: true,
     selectionRequired: true,
     multiple: true,
     allowDuplicateValues: true,
     maxShownResults: 5
  });
  // $("#txtEnchants").val("FOR +1, FOR +2"); // For Debug

  $("#txtMaps").flexdatalist({
    limitOfValues: 1,
    valueProperty: "id",
    searchIn: ["name","id"],
    url: "/wp-content/themes/hestia-child/js/bRO/dtlMaps.json",
    visibleProperties: ["name","id"],
    searchContain: true,
    searchByWord: true,
    selectionRequired: true,
    multiple: true,
    maxShownResults: 0
 });

 $("#txtSavedTableItem").flexdatalist({
  minLength: 0,
  limitOfValues: 1,
  valueProperty: "value",
  searchContain: true,
  searchByWord: true,
  selectionRequired: true,
  multiple: true,
  maxShownResults: 0
});
//

  $("#txtChar").flexdatalist({
    limitOfValues: 1,
    multiple: true,
    minLength: 999
  });

  /**
   ** Todos os elementos que usam MASK devem ficar em último no arquivo
   ** Pois se o arquivos não carregar o MASK os demais elementos já foram carregados
  */
  
  $("#txtQtd").flexdatalist({
     limitOfValues: 1,
     multiple: true,
     minLength: 10
  });
  $("#txtQtd-flexdatalist").mask(
    "0000",{
      translation: {
        'A': {pattern: /[1-9]/}
      }
  });


  $("#txtPrice").flexdatalist({
     limitOfValues: 1,
     multiple: true,
     minLength: 20
  });
  $("#txtPrice-flexdatalist").mask(
    "00000000000",{ // Commons for some reason break the value remove function
      reverse: true
  });
  // $("#txtPrice").val("5000"); // For Debug

  $("#txtTitleDeal").flexdatalist({
     limitOfValues: 1,
     multiple: true,
     minLength: 999
  });
  $("#txtTitleDeal-flexdatalist").mask(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",{
      //reverse: true,
      translation: {
        'A': {pattern: /[ A-zÀ-ÿ0-9@#!>?_-]/, optional: true}
      }
      
  });


  $("#txtTabNiceName").flexdatalist({
    limitOfValues: 1,
    multiple: true,
    minLength: 20
  });
  $("#txtTabNiceName-flexdatalist").mask(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",{
      //reverse: true,
      translation: {
        'A': {pattern: /[ A-zÀ-ÿ0-9@#!>?_-]/, optional: true}
      }
      
  });

  /*$("#txtLocal").flexdatalist({
     limitOfValues: 1,
     multiple: true,
     minLength: 999,
     nameIndex: 'map' // Custom field to RagShop Form
  });
  $("#txtLocal-flexdatalist").mask(
    "AAAAAAAAAAAAAAA 000 000",{
      //reverse: true,
      translation: {
        'A': {pattern: /[a-z0-9_.-]/, optional: true}
      }
      
  });*/
  $("#txtCoord").flexdatalist({
    limitOfValues: 1,
    multiple: true,
    minLength: 999
 });
 $("#txtCoord-flexdatalist").mask(
   "000 000",{
     //reverse: true,
     translation: {
       'A': {pattern: /[0-9]/, optional: true}
     }
     
 });

  $("#txtAccountNickname-flexdatalist").mask( // Account Page
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",{
      //reverse: true,
      translation: {
        'A': {pattern: /[ A-z0-9_-]/}
      }
      
  });


});