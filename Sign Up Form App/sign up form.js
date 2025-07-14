function validatePassword() {
    if (document.getElementById("psw").value ==
    document.getElementById("psw-confirm").value) {
        document.getElementById("psw-error").style.color = "green"
        document.getElementById("psw-error").innerHTML = "Password matching"
    } else {
        document.getElementById("psw-error").style.color = "red"
        document.getElementById("psw-error").innerHTML = "Password not matching"     
    }

}