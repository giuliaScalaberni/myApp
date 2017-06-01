<?php
try{
  $connect=new PDO('mysql:dbname=PhotoEntry;localhost:8889','root', 'root');

}
catch(PDOException $e){
  echo 'CONNECTION FAILED: '.$e->getMessage();
}
  $stmt = $connect->prepare("SELECT * FROM utente");
  if ($stmt->execute()) {
    header('Content-Type: application/json');
      echo json_encode($stmt->fetchAll());


  }
  else {

    print_r($stmt->errorInfo());
  }
 ?>
