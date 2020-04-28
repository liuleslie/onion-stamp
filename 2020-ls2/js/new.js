$(function(){

   $('.layer').click(function(e){
       e.stopPropagation();
       $(this).hide();
       checkOnion();
   });

   function checkOnion(){
        if($('#two').is(":visible")){
            // $('.layer-three, .layer-four, .layer-five, .layer-six, .layer-seven, .layer-eight, .layer-nine, .layer-ten, .layer-eleven, .layer-twelve, .layer-thirteen, .layer-fourteen, .layer-fifteen, .layer-sixteen, .layer-seventeen, .layer-eighteen').hide();
            console.log('two is visible!!!');
        } else{
            console.log('two is hidden...');
        }
   }
  
});  