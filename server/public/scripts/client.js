console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var sendKoala = {};
      sendKoala.koala_name = $('#nameIn').val();
      sendKoala.age = $('#ageIn').val();
      sendKoala.gender = $('#genderIn').val();
      sendKoala.ready_for_transfer = $('#readyForTransferIn').val();
      sendKoala.notes = $('#notesIn').val();

    // call saveKoala with the new obejct
    saveKoala( sendKoala );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    //sending back an object with an array of objects (koalas)
    success: function(data){
      console.log( 'got some koalas: ', data );
      var koalas = data.koalas; // Array of koalas
      appendToDom(koalas);
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function(data){
      console.log( 'got some koalas: ', data);
    } // end success
  }); //end ajax
}
// Append array of books to the DOM
function appendToDom(koalas) {
  // Remove books that currently exist in the table
  $('#viewKoalas').empty();
  for(var i = 0; i < koalas.length; i += 1) {
    var koalaDOM = koalas[i];
    // For each book, append a new row to our table
    $tr = $('<tr></tr>');
    $tr.data('koalas', koalaDOM);
    $tr.append('<td>' + koalaDOM.koala_name + '</td>');
    $tr.append('<td>' + koalaDOM.age + '</td>');
    $tr.append('<td>' + koalaDOM.gender + '</td>');
    $tr.append('<td>' + koalaDOM.ready_for_transfer + '</td>');
    $tr.append('<td>' + koalaDOM.notes + '</td>');
    $('#viewKoalas').append($tr);
}
}
