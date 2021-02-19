// console.log('Jquery funciona');
$(document).ready(function() {
    listTask();
});

var edit = false;

const listTask = () => {
    $.ajax({
        url: 'backend/task-list.php',
        type: 'GET',
        success: (res) => {
            // console.log(res);
            let template = '';
            let task = JSON.parse(res);
            task.forEach(task => {
                template += `
                    <tr>
                        <td>${task.id}</td>
                        <td>
                            <a href="#" class="task-item"> ${task.name}</a>
                        </td>
                        <td>${task.description}</td>
                        <td>
                            <button class="btn btn-danger" onclick="deleteTask(${task.id})">Delete</button>
                        </td>
                        <td>
                            <button class="btn btn-success" onclick="editTask(${task.id})">Edit</button>
                        </td>
                    </tr>
                `
            })
            $('#tasks').html(template);
        }
    })
}

const deleteTask = (id) => {
    if (confirm('Are you sure you want to delte it?')) {
        // console.log(id);
        $.post('backend/task-delete.php', { id }, (res) => {
            // console.log(res);
            listTask();
            // alert(res);
        })
    }
}

const editTask = (id) => {
    $.post('backend/task-single.php', { id }, (res) => {
        // console.log(res);
        let task = JSON.parse(res);
        $('#name').val(task.name);
        $('#description').val(task.description);
        $('#task-id').val(task.id);
        edit = true;

    })
}

$('#task-result').hide();
$('#search').keyup((e) => {
    if ($('#search').val()) {
        let search = $('#search').val();
        // console.log(search);
        $.ajax({
            url: 'backend/task-search.php',
            type: 'POST',
            data: { search },
            success: function(res) {
                // console.log(res);
                const tasks = JSON.parse(res);
                let template = '';
                tasks.forEach(task => {
                    // console.log(task);
                    template += `<li>${task.name}</li>`
                });
                $('#container').html(template);
                $('#task-result').show();
            }
        })
    }
})

$('#task-form').submit((e) => {
    // console.log('Enviando');
    e.preventDefault();
    const postData = {
        name: $('#name').val(),
        description: $('#description').val(),
        id: $('#task-id').val()
    }
    let url = edit == false ? 'backend/task-add.php' : 'backend/task-edit.php';
    edit = false;
    $.post(url, postData, (res) => {
        console.log(res);
        $('#task-form').trigger('reset');
        listTask();
    })
})