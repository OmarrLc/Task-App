<?php
    include('db.php');

    $id = $_POST['id'];

    if(isset($id)){
        $query = "DELETE FROM task WHERE id= $id";
        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Error en la consulta');
        }
        echo 'Tarea eliminada exitosamente';
    }
   
?>