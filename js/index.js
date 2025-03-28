document.addEventListener("DOMContentLoaded", () => {
    const base_url = "http://localhost:3000/members";
    const contactForm = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

   
    function fetchContact() {
        fetch(base_url)
            .then(res => res.json())
            .then(contacts => {
                responseMessage.innerHTML = ""; 
                contacts.forEach(contact => displayContact(contact));
            })
            .catch(error => console.log( error));
    }

    function displayContact(contact) {
        const span = document.createElement("span");
        span.innerHTML = `${contact.name} (${contact.email}) 
           onclick="editContact(${contact.id}, '${contact.name}', '${contact.email}', '${contact.location}', '${contact.message}')"

            <button onclick="deleteContact(${contact.id})">Delete</button>`;
        span.id = `contact-${contact.id}`;
        responseMessage.appendChild(span);
    }

   
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const location = document.getElementById("location").value;
        const message = document.getElementById("message").value;

        const newContact = { name, email, location, message };

        fetch(base_url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
        })
        .then(res => res.json())
        .then(contact => {
            displayContact(contact);
            contactForm.reset();
        })
        .catch(error => console.log( error));
    });

    
    purpose.editContact = function (id, oldName, oldEmail, oldLocation, oldMessage) {
        const newName = prompt("Enter new name:", oldName);
        const newEmail = prompt("Enter new email:", oldEmail);
        const newLocation = prompt("Enter new location:", oldLocation);
        const newMessage = prompt("Enter new message:", oldMessage);

        if (!newName || !newEmail) return;

        fetch(`${base_url}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: newName, email: newEmail, location: newLocation, message: newMessage })
        })
        .then(res => res.json())
        .then(() => {
            document.querySelector(`#contact-${id}`).innerHTML = `
                ${newName} (${newEmail}) 
              
            `;
        })
        .catch(error => console.log(error));
    };

    
    purpose.deleteContact = function (id) {
        if (!confirm("Are you sure you want to delete this user?")) return;

        fetch(`${base_url}/${id}`, {
            method: "DELETE"
        })
        .then(() => {
            document.getElementById(`contact-${id}`).remove();
        })
        .catch(error => console.log( error));
    };

    
    fetchContact();

});
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const responseMessage = document.getElementById("responseMessage");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); 

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        
       
        responseMessage.style.color = "green";
        responseMessage.textContent = "Form submitted successfully!";

        
        form.reset();
    });
});
document.getElementById("picha").addEventListener("click", function (event) {
    event.preventDefault(); 
    alert("Welcome to Grinder's Golf Club!");
});