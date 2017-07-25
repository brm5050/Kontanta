
 var nameInput = $("#petName");

getpetDetails();

  function getpetDetails() {
    $.get("/api/petDetails", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createpetDetailsRow(data[i]));
      }
      renderpetDetails(rowsToAdd);
      nameInput.val("");
    });
  }


