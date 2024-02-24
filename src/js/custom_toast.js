const CustomToast = function (toast = true, position = 'top-end', showConfirmButton = false, timer = 3000, timerProgressBar = true) {
    return Swal.mixin({
        toast: toast,
        position: position,
        showConfirmButton: showConfirmButton,
        timer: timer,
        timerProgressBar: timerProgressBar,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        },
        showCloseButton: true
    })
}

export  default  CustomToast