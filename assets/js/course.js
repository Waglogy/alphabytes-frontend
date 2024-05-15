const getCourses = async () => {
    try {
        const response = await fetch("https://alphabytes.onrender.com/courses")

        const data = await response.json()

        if (!data?.status) {
            return Swal.fire({
                text: data.message,
                icon: "warning",
            })
        }

        const courseContainer = document.querySelector(".course-container")

        const courses = data?.data

        courses.forEach((element, index) => {
            const course = document.createElement("div")

            course.innerHTML = `
            <article class="postcard light blue">
                        <a class="postcard__img_link" href="#">
                            <img class="postcard__img" src="${
                                element.image
                            }" alt="Course image." />
                        </a>
                        <div class="postcard__text t-dark">
                            <h1 class="postcard__title blue">
                                <a href="#">${element.name}</a>
                            </h1>
                            <div class="postcard__subtitle small">
                                <time datetime="2020-05-25 12:00:00">
                                    <i class="fas fa-calendar-alt mr-2"></i>Duration: ${element.duration
                                        .toString()
                                        .toUpperCase()}
                                </time>
                            </div>
                            <div class="postcard__bar"></div>
                            <div class="postcard__preview-txt">
                            ${element.description}
                            </div>
                            <ul class="postcard__tagbox">
                                <li class="tag__item">
                                    <i class="fas fa-tag mr-2"></i> <a href="Enroll.html">Enroll Now</a>
                                </li>
                                <li class="tag__item">
                                    <i class="fas fa-clock mr-2"></i>Price: ₹ ${
                                        element.cost
                                    }
                                </li>
                            </ul>
                        </div>
                    </article>
            `
            courseContainer.appendChild(course)
        })
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getCourses()
})
