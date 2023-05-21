window.onload = init;

function init(){
    if(localStorage.getItem('token')){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href='signin.html';
        });
    
        document.querySelector('.btn-primary'),addEventListener('click', login);
    }else{
        window.location.href = 'pokedex.html';
    }
}

function login(){
    let mail = document.getElementById('input-mail').value;
    let password = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: password,
        },
    }).then(function(res){
        console.log(res.data);
        if(res.data.code === 200){
            // alert('Inicio correcto');
            localStorage.setItem('token', res.data.message);
            window.location.href = 'pokedex.html';
        }else{
            // alert('Usuario y/o contraseña incorrectos');
        }
    }).catch(function(err){
        console.log(err);
    })
}