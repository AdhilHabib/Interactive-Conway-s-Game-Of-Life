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
      <h1 align="center" >Sign Up</h1>
      <p align="center">Please fill in this form to create an account.</p>
      <hr>

	  <label for="name"><b>Full Name</b></label>
      <input type="text" placeholder="Enter Your Full Name" name="name">

      <label for="email"><b>Email</b></label>
      <input type="text" placeholder="Enter Email" name="email">

	  <label for="username"><b>Username</b></label>
      <input type="text" placeholder="Enter Username" name="username">

	  <label for="psw"><b>Password</b></label>
      <input type="password" placeholder="Enter Password" name="psw">


     <input align="center" type="submit" name="done" class="signupbtn" value="Sign up">
		 <a href="index.php">
				<input type="button" value="Already have an account? Login" />
		 </a>
	 <?php
		if(isset($_POST['done'])){
			$myfile = fopen("users.txt","a") or die("Unable to open file!");
			$txt = $_POST['name'].";".$_POST['username'].";".$_POST['psw'].";".$_POST['email']."\n";

			if($_POST["name"] == '' || is_numeric($_POST["name"])){
				print("Invalid name, Try again");

				exit;
			}
			if( $_POST["email"] == ''){
				print("Email was left blank");

				exit;
			}
			if($_POST["username"] == ''){
				print("Username was left blank");

				exit;
			}
			if($_POST["psw"] == ''){
				print("Enter a valid password");

				exit;
			}
			if(strpos(file_get_contents("users.txt"),$_POST['username']) == true ){
				print("Username is taken, Try another name");

				exit;
			 }
			 if(strpos(file_get_contents("users.txt"),$_POST['email']) == true ){
				 print("Email is taken, Try another Email");

				 exit;
				}
			fwrite($myfile, $txt);
			fclose($myfile);
			header("Location: index.php");
		}

	 ?>

    </div>
  </form>
</div>

</body>
</html>
