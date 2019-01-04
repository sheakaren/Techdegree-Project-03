// Variables
const $jobTitle = $("#userTitle");
const $otherJobTitle = $("#other-title");
const $shirtDesign = $("#design");
const $shirtColor = $("#colors-js-puns");
const $classes = $("#classes");
const $selectJob = $('#select-job');
const $selectTheme = $('#select-theme');
const $activities = $(".activities");
const $frameworks = $('input[name="js-frameworks"]');
const $jsLibs = $('input[name="js-libs"]');
const $express = $('input[name="express"]');
const $node = $('input[name="node"]');
const $buildTools = $('input[name="build-tools"]');
const $npm = $('input[name="npm"]');
const $roles = ('.roles');
const $cardInfo = $('#credit-card');
const $paymentOption = $('#payment');
const $paypal = $('#paypal');
const $bitcoin = $('#bitcoin');
const $selectMethod = $('#selectMethod');
const $name = $('#name');
const $eMail = $('#mail');
const $creditCardNum = $('#cc-num');
const $zipCode = $('#zip');
const $cvv = $('#cvv');
const $submit = $('#submitButton');
let isNameValid = false;
let isEmailValid = false;
let isJobTitleValid = false;
let isCheckboxValid = false;
let isCreditCardValid = false;
let isZipValid = false;
let isCvvValid = false;

// -------------------------------------------------------------------------------------------------------------

// Hides the "other" job text field upon load
$otherJobTitle.hide();
// Text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
$($jobTitle).change(function() {
  if ($jobTitle.val() === "other") {
    $otherJobTitle.show();
    } else {
    $otherJobTitle.hide();
  }
});

// Disables the "Select Job Role" option in the select menu
$(function() {
    $selectJob.prop("disabled", true);
});

// -------------------------------------------------------------------------------------------------------------

// Hides the shirt color option upon load
$shirtColor.hide();
// For the T-Shirt "Color" menu, only display the color options that match the design selected in the "Design" menu.
// If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
// If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
// When a new theme is selected from the "Design" menu, the "Color" field and drop down menu is updated.
$($shirtDesign).change(function() {
  if ($shirtDesign.val() === "js puns") {
    $shirtColor.show();
    $('#color option[value="cornflowerblue"]').show();
    $('#color option[value="darkslategrey"]').show();
    $('#color option[value="gold"]').show();
    $('#color option[value="tomato"]').hide();
    $('#color option[value="steelblue"]').hide();
    $('#color option[value="dimgrey"]').hide();
  } else if ($shirtDesign.val() === "heart js") {
    $shirtColor.show();
    $('#color option[value="tomato"]').show();
    $('#color option[value="steelblue"]').show();
    $('#color option[value="dimgrey"]').show();
    $('#color option[value="cornflowerblue"]').hide();
    $('#color option[value="darkslategrey"]').hide();
    $('#color option[value="gold"]').hide();
  }
});

// Disables the "Select Theme" option in the select menu
$(function() {
    $selectTheme.prop("disabled", true);
});

// -------------------------------------------------------------------------------------------------------------

// Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time --
// you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
// When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

// JavaScript Frameworks Workshop
$frameworks.change(function() {
  if($(this).is(':checked')){
    $express.prop('disabled', true);
  } else {
    $express.prop('disabled', false);
  }
});

// JavaScript Libraries Workshop
$jsLibs.change(function() {
  if($(this).is(':checked')){
    $node.prop('disabled', true);
  } else {
    $node.prop('disabled', false);
  }
});

// Express Workshop
$express.change(function() {
  if($(this).is(':checked')){
    $frameworks.prop('disabled', true);
  } else {
    $frameworks.prop('disabled', false);
  }
});

// Node.js Workshop
$node.change(function() {
  if($(this).is(':checked')){
    $jsLibs.prop('disabled', true);
  } else {
    $jsLibs.prop('disabled', false);
  }
});

// User must select at least one checkbox under the "Register for Activities" section of the form.

// As a user selects activities, a running total should display below the list of checkboxes.
// For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.

// Create a new div to display the Total
$activities.append('<br><div class="totalDiv"><label name="total-to-pay" class="totalCost">Total: </label></div>');

// add variables related to the newly created DIV
const $totalDiv = $(".totalDiv");
const $totalCost = $(".totalCost");
let $total = 0;

// Hide the div on load
$totalDiv.hide();

// Function to add total cost
$('input:checkbox').on('change', function() {
            if ($(this).is(':checked')) {
              $totalDiv.show();
              $total += +this.value;
              $totalCost.html('Total: $' + parseInt($total));
            } else if ($(this).not(':checked')) {
              $total -= +this.value;
              $totalCost.html('Total: $' + parseInt($total));
            }
          });

// -------------------------------------------------------------------------------------------------------------

// Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information.

// Hides Paypal and Bitcoin divs on load
$paypal.hide();
$bitcoin.hide();

// The "Credit Card" payment option should be selected by default.
$paymentOption[0].selectedIndex = 1;

// Display payment sections based on the payment option chosen in the select menu.
// Payment option in the select menu should match the payment option displayed on the page.
// When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
// When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
$($paymentOption).change(function() {
  if ($(this).val() === "credit card") {
    $cardInfo.show();
  } else {
    $cardInfo.hide();
  }
  if ($(this).val() === "paypal") {
    $paypal.show();
  } else {
    $paypal.hide();
  }
  if ($(this).val() === "bitcoin") {
    $bitcoin.show();
  } else {
    $bitcoin.hide();
  }
});

// NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu,
    // because the user should not be able to submit the form without a chosen payment option.

// Disables the "Select Payment Method" option in the select menu
$(function() {
    $selectMethod.prop("disabled", true);
});

// -------------------------------------------------------------------------------------------------------------

// If any of the following validation errors exist, prevent the user from submitting the form:

// focusout handlers to give real time validation

  // Name field can't be blank.
  $name.focusout(function(e) {
    if ($name.val() === "") {
      isNameValid = false;
      $name.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: 'Please enter your name'});
  } else if ($(this).val() > "0") {
    isNameValid = true;
    $name.css({backgroundColor: '#99e699', border: "2px solid #33cc33"}).removeAttr({placeholder: 'Please enter your name'});
  }
});
  // Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
  $eMail.focusout(function(e) {
  let $emailVal = $('#mail').val();
  let $emailReg = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$');
    if (!$emailReg.test($emailVal)) {
      isEmailValid = false;
      $eMail.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: 'Please enter a valid email'});
    } else {
      isEmailValid = true;
      $eMail.css({backgroundColor: '#99e699', border: "2px solid #33cc33"}).removeAttr({placeholder: 'Please enter a valid email'});
    }
  });
  // Credit Card field should only accept a number between 13 and 16 digits.
  $creditCardNum.focusout(function(e) {
  let $creditVal = $('#cc-num').val();
  let $cardReg = new RegExp('^\\d{13,16}$');
    if(!$cardReg.test($creditVal)) {
      isCreditCardValid = false;
      $creditCardNum.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '13-16 digits'});
    } else {
      isCreditCardValid = true;
      $creditCardNum.css({backgroundColor: '#99e699', border: "2px solid #33cc33"}).removeAttr({placeholder: '13-16 digits'});
    }
  });
  // The Zip Code field should accept a 5-digit number.
  $zipCode.focusout(function(e) {
  let $zipVal = $('#zip').val();
  let $zipReg = new RegExp('^\\d{5}$');
    if (!$zipReg.test($zipVal)) {
      isZipValid = false;
      $zipCode.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '5 digits'});
    } else {
      isZipValid = true;
      $zipCode.css({backgroundColor: '#99e699', border: "2px solid #33cc33"}).removeAttr({placeholder: '5 digits'});
    }
  });
  // The CVV should only accept a number that is exactly 3 digits long.
  $cvv.focusout(function(e) {
  let $cvvVal = $('#cvv').val();
  let $cvvReg = new RegExp('^\\d{3}$');
    if(!$cvvReg.test($cvvVal)) {
      isCvvValid = false;
      $cvv.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '3 digits'});
    } else {
      isCvvValid = true;
      $cvv.css({backgroundColor: '#99e699', border: "2px solid #33cc33"}).removeAttr({placeholder: '3 digits'});
    }
  });

  // submit button prevent default for all of the above validation
  $('button').on('click', function(e){ 
      // User must select at least one checkbox under the "Register for Activities" section of the form.
    if($('.activities input:checkbox:checked').length < 1) {
      isCheckboxValid = false;
      $activities.append('<br><div class="error"><font color="#ff0000">Please select at least one activity.</div>')
    } else {
      isCheckboxValid = true;
    } 
    if (!isNameValid || !isEmailValid || !isCheckboxValid || !isCreditCardValid || !isZipValid || !isCvvValid) {
      e.preventDefault();
      if (!isNameValid) {$name.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: 'Please enter your name'})};
      if (!isEmailValid) {$eMail.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: 'Please enter a valid email'})};
      if (!isCreditCardValid) {$creditCardNum.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '13-16 digits'})};
      if (!isZipValid) {$zipCode.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '5 digits'})};
      if (!isCvvValid) {$cvv.css({backgroundColor: '#ff6666', border: "2px solid #ff0000"}).attr({placeholder: '3 digits'})};
    }
    });

    // $activities.change(function() {
    //   $(this).remove('<br><div class="error"><font color="#ff0000">Please select at least one activity.</div>')
    // });
    // $('input:checkbox').on('change', function() {
    //   if ($(this).is(':checked')) {
    //   $(this).remove('<br><div class="error"><font color="#ff0000">Please select at least one activity.</div>')
    //       }
    //     });