const getCourses = async () => {
    try {
        const response = await fetch("https://alphabytes.onrender.com/courses")

        const data = await response.json()

        console.log(data)
        if (!data?.status) {
            return Swal.fire({
                text: data.message,
                icon: "warning",
            })
        }
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
        })
    }
}

;(async () => {
    try {
        const select = document.getElementById("courseType")

        const response = await fetch("https://alphabytes.onrender.com/courses")

        const data = await response.json()

        if (!data?.status) {
            return Swal.fire({
                text: data.message,
                icon: "warning",
            })
        }

        const courses = data.data.map((course) => course.name)

        courses.forEach((course) => {
            const option = document.createElement("option")

            option.value = course
            option.text = course

            select.appendChild(option)
        })
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
        })
    }
})()

const enrollmentSubmitBtn = document.getElementById("enrollment-submit-btn")

const enrollmentForm = document.getElementById("registrationForm")

enrollmentForm.addEventListener("submit", async (e) => {
    try {
        e.preventDefault()

        enrollmentSubmitBtn.disabled = true
        enrollmentSubmitBtn.textContent = "Enrolling ."

        setTimeout(() => {
            enrollmentSubmitBtn.textContent = "Enrolling . ."
        }, 100)

        setTimeout(() => {
            enrollmentSubmitBtn.textContent = "Enrolling . . ."
        }, 1000)

        const fd = new FormData(e.target)

        const formData = Object.fromEntries(fd)

        const response = await fetch(
            "https://alphabytes.onrender.com/book-course/add",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        )

        const resData = await response.json()

        if (!resData.status)
            return Swal.fire({
                text: resData?.message,
                icon: "warning",
            })

        Swal.fire({
            text: resData?.message,
            icon: "success",
        })

        enrollmentForm.reset()
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
        })
    } finally {
        enrollmentSubmitBtn.disabled = false
        enrollmentSubmitBtn.textContent = "Enroll"
    }
})
