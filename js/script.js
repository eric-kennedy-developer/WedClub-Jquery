$(document).ready(function(){

	var $divUsers = $("#divUsers");

	Listar_Usuarios();
	
	function Listar_Usuarios()
	{
		$.ajax({
			type: 'GET',
			url: 'http://127.0.0.1:8000/api/users',
			success: function(users){
				$.each(users.data, function( index, user ) {
				  	$divUsers.append(Gerar_Card(user.id, user.name, user.email, user.foto_perfil));
				});
			}
		});
	}
	function Get_Usuario(ID)
	{

		$.ajax({
			type: 'GET',
			url: 'http://127.0.0.1:8000/api/users/' + ID,
			success: function(users){
				$("#name").val(users.data.name);
				$("#email").val(users.data.email);
				$("#password").val("");
				$("#id").val(users.data.id);
				$("#btnSubmit").val("Editar");
				$("#titleModal").text("Editar");
				$("#method").val("PUT");
				$("#formulario").attr("action", "http://127.0.0.1:8000/api/user/" + users.data.id);
			}
		});
	}

	function Excluir_Usuario(ID)
	{
		$.ajax({
			type: 'DELETE',
			url: 'http://127.0.0.1:8000/api/user/' + ID,
			contentType: 'application/json; charset=utf-8',
			success: function(res){
				alert(res.msg);
				$("#" + res.id).remove();
			},
			error: function(req, err){ alert(res.erro); }
		});
	}

	function Gerar_Card(ID, Name, Email, Foto)
	{
		let recem_contratado = (ID == 1 || Name == "Eric Kennedy") ? "<div class='Recem_Contratado'>Recém-contratado</div>" : "";
		return "<div class='col-md-4 col-6 pt-5' id='" + ID + "'><div class='card parent'><img class='card-img-top' src='http://localhost:8000/profile/" + Foto + "' alt='" + Name + "'><div class='card-body'>" + recem_contratado + "<h5 class='card-title'>" + Name + "</h5><p class='card-text'>" + Email + "</p><button type='button' class='btn btn-primary btnEditar'><img src='svg/edit.svg'/></button><button type='button' class='btn btn-danger btnExcluir'><img src='svg/close.svg'/></button></div></div></div>";
	}

	$(document).on( "click", ".btnExcluir", function() {
		if(confirm("Deseja realmente excluir este registro?"))
		{
		  let ID = $(this).parent().parent().parent().attr("id");
		  Excluir_Usuario(ID);
		}
	});

	$(document).on( "click", ".btnEditar", function() {
		let ID = $(this).parent().parent().parent().attr("id");
		Get_Usuario(ID);
		$("#ModalWedClub").modal();
	});		

	$(document).on( "click", ".btnCadastrar", function() {
		$("#ModalWedClub").modal();
		$("#name").val("");
		$("#email").val("");
		$("#password").val("");
		$("#id").val("");
		$("#btnSubmit").val("Cadastrar");
		$("#titleModal").text("Cadastrar");
		$("#method").val("POST");
		$("#formulario").attr("action", "http://127.0.0.1:8000/api/user");
	});		
});

$("#formulario").submit(function(e) {
	e.preventDefault();
    var formData = new FormData(this);
    $.ajax({
        url: $("#formulario").attr("action"),
	    type: 'POST',
        data: formData,
        success: function(user) {
           alert("Usuário salvo com sucesso.");
        },
        error: function(data) {
            alert(JSON.stringify(JSON.parse(data.responseText), null, 4));
        },
        cache: false,
        contentType: false,
        processData: false
    }).done(function(res){
    	document.location.reload(true);
    });

});