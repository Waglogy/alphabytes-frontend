const contactForm = document.getElementById("contact-form")
const contactSubmitFormButton = document.getElementById("contact-submit-btn")

contactForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        contactSubmitFormButton.disabled = true
        contactSubmitFormButton.innerText = "Sending."

        setTimeout(() => {
            contactSubmitFormButton.innerText = "Sending.."
        }, 1000)

        setTimeout(() => {
            contactSubmitFormButton.innerText = "Sending..."
        }, 1000)

        const fd = new FormData(e.target)
        const formData = Object.fromEntries(fd)

        const response = await fetch(
            "https://alphabytes.onrender.com/contact",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )

        const resData = await response.json()

        if (!resData.status) {
            return Swal.fire({
                text: resData?.message,
                icon: "warning",
            })
        }

        Swal.fire({
            text: resData?.message,
            icon: "success",
        })

        contactForm.reset()
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
        })
    } finally {
        contactSubmitFormButton.disabled = false
        contactSubmitFormButton.innerText = "Send"
    }
})
