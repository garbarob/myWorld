/*function ClearAll() {
    var objInput = document.getElementsById("tblProducts");
    $tblrows.each(function (index) {
        var $tblrow = $(this);
    }
    return false;
}*/



$(function () {
            $('.pnm, .price, .subtot, .grdtot').prop('readonly', true);
            
            //selects all of the table rows <tr>’s within the table body
            var $tblrows = $("#tblProducts tbody tr");
            
            //use jQuery's built-in each() iterator to loop over this collection of ‘tr’ elements
            $tblrows.each(function (index) { 
                
                //For each iteration of the loop, $(this) refers to a ‘tr’ element, which is being assigned to a local variable $row                
                var $tblrow = $(this); 
                
//                Every time the user enters a value in the Quantity field, the subtotal column should be automatically populated by multiplying the Price with the Quantity entered
                $tblrow.find('.qty').on('change', function () {

                    var qty = $tblrow.find("[name=qty]").val();
                    var price = $tblrow.find("[name=price]").val();
                    var subTotal = parseInt(qty, 10) * parseFloat(price);
                    
//Both global functions parseInt and parseFloat convert strings to numbers. I tend to use parseFloat over parseInt, as it is more adaptable in scenarios where I am unsure if all of the numbers will be integers. parseFloat works with both integers and floating-point numbers. In this example, I am assuming that the values for Quantity are coming from my database, so they do not contain any decimals. In such scenarios, I can safely use parseInt for integer columns.
//
//If you observe, the parseInt function has two arguments: a required numeric string, and an optional radix (base). The radix is the number’s base, as in base-8 (octal), base-10 (decimal) and base-16 (hexadecimal). If the radix is not provided, it’s assumed to be 10, for decimal. Although the second argument is optional, it’s considered a good practice to always provide it explicitly.

                    if (!isNaN(subTotal)) {
                        
//    If the string provided doesn’t contain a number, NaN is returned. So we should check to see if the subTotal is not a NaN. The next step is to use toFixed() method to format the subTotal to two decimal points.
                        $tblrow.find('.subtot').val(subTotal.toFixed(2));
                        var grandTotal = 0;
                        
//    We then use each() to loop through the subTotal column and sum the text of subtotal in each row and assign the result to the grandTotal variable

                        $(".subtot").each(function () {
                            var stval = parseFloat($(this).val());
                            grandTotal += isNaN(stval) ? 0 : stval;
                        });

                        //assign the result to the grandTotal cell.
                        $('.grdtot').val(grandTotal.toFixed(2));
                    }               
                });
            });
        });
    
