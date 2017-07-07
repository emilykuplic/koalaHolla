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
      // name: 'testName',
      // age: 'testName',
      // gender: 'testName',
      // readyForTransfer: 'testName',
      // notes: 'testName',


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
    success: function( data ){
      console.log( 'got some koalas: ', data );
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
    success: function( data ){
      console.log( 'got some koalas: ', data );
    } // end success
  }); //end ajax
}
