document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        body.appendChild(particle);
    }


    document.querySelectorAll('input[name="role"]').forEach(radio => {
        radio.addEventListener('change', function () {
            const isTeacher = document.getElementById('teacher').checked;
            document.getElementById('experience-container').style.display = isTeacher ? 'block' : 'none';
            document.getElementById('faculty-group-container').style.display = !isTeacher ? 'block' : 'none';
        });
    });
});

document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputs = document.querySelectorAll('.input-data input');
    const userData = {};
    const patterns = {
        student: /^(?!.*(\d)\1{2})[0-9]{7}$/,
        lecturer: /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?=(?:[^0-9]*[0-9]){1,})(?!.*([A-Za-z0-9])\1{2})[A-Za-z0-9]{9}$/
    };

    let isValid = true;

    inputs.forEach(input => {
        const fieldName = input.name;
        const fieldValue = input.value;

        userData[fieldName] = fieldValue;

        if (fieldName === 'security-code') {
            const isStudent = document.getElementById('student').checked;
            const pattern = isStudent ? patterns.student : patterns.lecturer;

            if (!pattern.test(fieldValue)) {
                document.getElementById('error-message').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('error-message').style.display = 'none';
            }
        }
    });

    if (!isValid) {
        return;
    }

    const userId = generateUniqueId();
    localStorage.setItem(userId, JSON.stringify(userData));
    alert('Data saved successfully!');
    document.getElementById('registration-form').reset();
});

function generateUniqueId() {
    let lastId = parseInt(localStorage.getItem('lastId'), 10) || 0;
    const newId = lastId + 1;
    localStorage.setItem('lastId', newId);
    return newId.toString();
}
