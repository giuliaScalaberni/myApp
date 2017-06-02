<?php
try{
  $connect=new PDO('mysql:dbname=PhotoEntry;localhost','root', 'root');

}
catch(PDOException $e){
  echo 'CONNECTION FAILED: '.$e->getMessage();
}
  $stmt = $connect->prepare("SELECT * FROM utente");
  if ($stmt->execute()) {
      echo json_encode($stmt->fetchAll());


  }
  else {

    print_r($stmt->errorInfo());
  }
 ?>
