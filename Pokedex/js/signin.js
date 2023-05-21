window.onload = init;

function init(){
    if(localStorage.getItem('token')){
        document.querySelector('.btn-secondary').addEventListener('click', function(){
            window.location.href='login.html';
        });
    
        document.querySelector('.btn-primary'),addEventListener('click', signin);
    }else{
        window.location.href = 'pokedex.html';
    }
}

function signin(){
    let name = document.getElementById('input-name').value;
    let mail = document.getElementById('input-mail').value;
    let password = document.getElementById('input-password').value;
    console.log(`${name}, ${mail}, ${password}`);

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: password,
        },
    }).then(function(res){
        console.log(res);
        alert('Registro exitoso');
        window.location.href = 'login.html';
    }).catch(function(err){
        console.log(err);
    })
}