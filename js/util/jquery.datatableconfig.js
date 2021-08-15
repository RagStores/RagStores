jQuery(document).ready(function($) {
  /**
	 ** Data Table Configs
   ** https://datatables.net/
	 */

  $("#tableHome").dataTable({
    "pagingType": "full",
    "bLengthChange" : false, //thought this line could hide the LengthMenu
    //"bInfo":false, 
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });

  /**
   * Search
   */
  $("#searchItem-38").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchItem-37").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchItem-40").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchItem-39").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });



  /**
   * Search All Items
   * 38 44 | 38 45 | 40 44 | 40 45 | 37 44 | 37 45 | 39 44 | 39 45
   */
  $("#searchAll-38-44").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-38-45").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-40-44").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-40-45").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-37-44").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-37-45").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-39-44").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });
  $("#searchAll-39-45").dataTable({
    "iDisplayLength": 10,
    "aLengthMenu": [[10, 25, 50, 100,  -1], [10, 25, 50, 100, "Todos"]],
    "pagingType": "full",
    language: {
      url: "https://cdn.datatables.net/plug-ins/1.10.22/i18n/Portuguese-Brasil.json"
    }
  });

});