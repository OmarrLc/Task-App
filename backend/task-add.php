<?php
    include('db.php');

    $name= $_POST['name'];
    $description= $_POST['description'];

    if(isset($name) && isset($description)){
        $query = "INSERT into task(name,description) VALUES ('$name','$description')";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('La consulta ha fallado');
        }
        echo 'Tarea agregada exitosamente';
    }
?>