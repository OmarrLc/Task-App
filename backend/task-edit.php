<?php
    include('db.php');

    $name = $_POST['name'];
    $description = $_POST['description'];
    $id = $_POST['id'];

    if(isset($name) && isset($description)){
        $query = "UPDATE task SET name = '$name', description = '$description' WHERE id = '$id'";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('La consulta ha fallado');
        }
        echo 'Tarea editada exitosamente';
    }
?>