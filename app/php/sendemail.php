<?php

// Define some constants
define( "RECIPIENT_NAME", "Ventas" );
define( "RECIPIENT_EMAIL", "josuebarriosm@gmail.com" );


// Read the form values
$success = false;
$userName = isset( $_POST['username'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['username'] ) : "";
$senderEmail = isset( $_POST['email'] ) ? preg_replace( "/[^\.\-\_\@a-zA-Z0-9]/", "", $_POST['email'] ) : "";
$userPhone = isset( $_POST['phone'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['phone'] ) : "";
$product = isset( $_POST['product'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['product'] ) : "";
$productQty = isset( $_POST['product-qty'] ) ? preg_replace( "/[^\s\S\.\-\_\@a-zA-Z0-9]/", "", $_POST['product-qty'] ) : "";
$message = isset( $_POST['message'] ) ? preg_replace( "/(From:|To:|BCC:|CC:|Subject:|Content-Type:)/", "", $_POST['message'] ) : "";

// If all values exist, send the email
if ( $userName && $senderEmail && $userPhone) {
  $recipient = RECIPIENT_NAME . " <" . RECIPIENT_EMAIL . ">";
  
  $headers  = "From: " . "Web@globalplastic.pe" . "\r\n";
  $headers .= "Organization: Global Plastic\r\n";
  $headers .= "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type: text/html; charset=iso-8859-1" . "\r\n";
  $headers .= "X-Priority: 3\r\n";
  $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

  $msgBody = 
	'
	<html>
	<head>
	  <title>Mensaje de la Página web</title>
	</head>
	<body>'.

	  '<p>'.
	  '<b>Nombre: </b>'. $userName . '<br><br>'.
	  '</p>'.

	  '<p>'.
	  '<b>Correo: </b>'. $senderEmail . '<br><br>' . 
	  '</p>'. 

	  '<p>'.
  	  '<b>Teleéfono: </b>'. $userPhone . '<br><br>' .
  	  '</p>'. 

      '<p>'.
  	  '<b>Productos a cotizar: </b>'. $product . '<br><br>' .
  	  '</p>'.

	  '<p>'.
	  '<b>Cantidad: </b>'. $productQty . '<br><br>' . 
	  '</p>'.

	  '<p>'.
	  '<b>Mensaje: </b>' . $message . '';
	  '</p>'.
	  
	'</body>
	</html>
	';

  
  $success = mail($recipient, 'Mensaje de la Página Web', $msgBody, $headers);

  //Set Location After Successsfull Submission
  header('Location: ../index.html?message=Successfull');
}

else{
	//Set Location After Unsuccesssfull Submission
  	header('Location: ../index.html?message=Failed');	
}

?>