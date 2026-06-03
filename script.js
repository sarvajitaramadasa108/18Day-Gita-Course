// ====================================
// APPS SCRIPT WEB APP URL
// ====================================

const API_URL =
"https://script.google.com/macros/s/AKfycbyx3YauDLlxtw5gYMSIl_j9027p8Fq_oroGLo-4mUKAkGOrxE5gTvLcIxCE6ThwzfTzCw/exec";


// ====================================
// DYNAMIC NEXT BATCH DATE
// ====================================

function getNextBatchDate() {

    const today = new Date();

    let year = today.getFullYear();
    let month = today.getMonth();

    if (today.getDate() > 6) {
        month++;
    }

    if (month > 11) {
        month = 0;
        year++;
    }

    const nextBatch = new Date(year, month, 6);

    const options = {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    };

    return nextBatch.toLocaleDateString(
        'en-IN',
        options
    );
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("batchDate").innerText =
        getNextBatchDate();

});


// ====================================
// FORM SUBMISSION
// ====================================

document
.getElementById("registrationForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const messageDiv =
        document.getElementById("message");

    messageDiv.innerHTML =
        "Submitting your registration...";

    const formData = {

        name:
            document.getElementById("name").value,

        gender:
            document.getElementById("gender").value,

        age:
            document.getElementById("age").value,

        mobile:
            document.getElementById("mobile").value,

        email:
            document.getElementById("email").value,

        city:
            document.getElementById("city").value,

        state:
            document.getElementById("state").value,

        occupation:
            document.getElementById("occupation").value,

        organization:
            document.getElementById("organization").value,

        batch:
            document.getElementById("batch").value,

        studiedGita:
            document.getElementById("studiedGita").value,

        referenceSource:
            document.getElementById("referenceSource").value,

        expectations:
            document.getElementById("expectations").value
    };

    try {

        const response = await fetch(
            API_URL,
            {
                method: "POST",
                body: JSON.stringify(formData)
            }
        );

        const result =
            await response.json();

        if(result.status === "success"){

            messageDiv.innerHTML =
            "✅ Registration Successful! Please check your email.";

            document
            .getElementById("registrationForm")
            .reset();

        } else {

            messageDiv.innerHTML =
            "❌ " + result.message;
        }

    } catch(error){

        console.error(error);

        messageDiv.innerHTML =
        "❌ Error submitting registration. Please try again.";
    }

});