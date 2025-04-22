const form = document.querySelector("#form")
const submitButton = document.querySelector("#submit")
const requiredFields = document.querySelectorAll(".reqField")
const enrollModal = new bootstrap.Modal(document.getElementById('enroll'));
const scriptURL = 'https://script.google.com/macros/s/AKfycby2wJQKELPDoqwEaFRSud-kl-8TArPUHs71WF9U2zZ94objwWUqPW4R7klZIgLDHQTKbA/exec'

// Проверка при любом инпуте
window.onload = function() {
    form.addEventListener('input', function() {
        // Проверка заполнения полей
        const allFilled = Array.from(requiredFields).every(field => field.value.trim() !== '');
        if (allFilled && document.getElementById("media").value) {
            submitButton.classList.remove('disabled');
            submitButton.setAttribute("aria-disabled", "false");
            submitButton.setAttribute("tabindex", "0");
        } else {
            submitButton.classList.add('disabled');
            submitButton.setAttribute("aria-disabled", "true");
            submitButton.setAttribute("tabindex", "-1");
        }
    });
}
// Обработка подтверждения регистрации
submitButton.onclick = function(e) {
    const formData = new FormData(form);

    // Handle the file upload
    const fileInput = document.getElementById("media");
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const reader = new FileReader();

        // Size validation here, only less than 2MB allowed
        if (file.size > 1024 * 1024 * 2) {
            swal("Error", "File size should be less than 2MB.", "error");
            return;
        }

        reader.onload = async function () {
            formData.append("media", reader.result.split(",")[1]); // Append base64 data
            submitForm(formData);
        };

        reader.readAsDataURL(file);
    } else {
        // No file uploaded
        submitForm(formData);
    }
    // submit to google sheets
    function submitForm(formData) {
        submitButton.disabled = true
        e.preventDefault()
        fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors'})
        .then(response => {
            // alert('Success!', response)
            // submitButton.disabled = false
            location.reload();
        })
        .catch(error => {
            alert('Ошибка! Обратитесь к +7 (866) 272-20-24.', error.message)
            submitButton.disabled = false
        })
    }
}
// End of Обработка подтверждения регистрации

// Choose a file
const choose_file_text = document.getElementById("choose_file_text");
const fileUploadClick = (e) => {
    if(e.target!==e.currentTarget) e.currentTarget.click()
}
function showname () {
    var name = document.getElementById('media'); 
    choose_file_text.innerHTML = name.files.item(0).name;
    // alert('Selected file: ' + name.files.item(0).name);
    // alert('Selected file: ' + name.files.item(0).size);
    // alert('Selected file: ' + name.files.item(0).type);
};
// End of Choose a file