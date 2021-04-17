<!DOCTYPE html>
<html>
<head>
<link href="signup.css" type="text/css" rel="stylesheet" />
</head>
<body>
<?php
		session_start();
		$fullname = $username = $password = $email = "";
		?>

<div id="id01" class="modal">
  <form method="POST" class="modal-content" action="">
    <div class="container">
      <h1 align="center" >Login</h1>
      <p align="center">Please fill in this form to log into your account.</p>
      <hr>

	  <label for="username"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="username">

	  <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw">


     <input align="center" type="submit" name="done" class="loginbtn" value="Login">

		 <a href="signup.php">
 		    <input type="button" value="Register" />
 		 </a>
	 <?php
		if(isset($_POST['done'])){
			$myfile = fopen("users.txt","r") or die("Unable to open file!");
			while(!feof($myfile)) {
			$values = explode(";",fgets($myfile));

			if(sizeof($values)==4 && strcmp( $values[1], $_POST['username'])==0 && strcmp($values[2], $_POST['psw'])==0 ){
				$username = $values[1];
				print("Login successfull");
			 header("Location: GameofLife");
				exit;
			}

		}
		fclose($myfile);
		}

	 ?>

    </div>
  </form>
</div>

</body>
</html>
