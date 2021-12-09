class UI {
    constructor() {
        this.post = document.querySelector('#posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.submitBtn');
        this.forState = 'add';
    }

    // Show all posts
    showPosts(posts) {
        let output = '';

        posts.forEach((post) => {
            output += `
            <div class="card col-md-4 shadow-sm card-body flashcard my-3">
            <div class="d-flex justify-content-between">
                <h5 class="question text-capitalize">${post.title}</h5>
                <i class="btn dragBtn fas fa-grip-horizontal "></i>
            </div>
          <h6 class="mb-3">${post.body}</h6>
          <div class="flashcard-btn d-flex justify-content-between">
        <a href="#" class="edit card-link" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${post.id}">
        <i class="fa fa-edit"></i>
      </a>

      <a href="#" class="delete card-link" data-id="${post.id}">
      <i class="far fa-trash-alt me-2"></i>
    </a>
    </div>
    </div>
      `;
        });

        this.post.innerHTML = output;
    }


    // Show alert message
    showAlert(message, className) {
        this.clearAlert();

        // Create div
        const div = document.createElement('div');
        // Add classes
        div.className = className;
        // Add text
        div.appendChild(document.createTextNode(message));
        // Get parent
        const container = document.querySelector('.postsContainer');
        // Get posts
        const posts = document.querySelector('#posts');
        // Insert alert div
        container.insertBefore(div, posts);

        // Timeout
        setTimeout(() => {
            this.clearAlert();
        }, 3000);
    }

    // Clear alert message
    clearAlert() {
        const currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    // Clear all fields
    clearFields() {
        this.titleInput.value = '';
        this.bodyInput.value = '';
    }

    // Fill form to edit
    fillForm(data) {
        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        this.changeFormState('edit');
    }

    // Clear ID hidden value
    clearIdInput() {
        this.idInput.value = '';
    }

    // Change the form state
    changeFormState(type) {
        if (type === 'edit') {
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'submitBtn btn btn-warning btn-block';

            // Create cancel button
            const button = document.createElement('button');
            button.className = 'post-cancel btn btn-light btn-block';
            button.appendChild(document.createTextNode('Cancel Edit'));

            // Get parent
            const cardForm = document.querySelector('.card-form');
            // Get element to insert before
            const formEnd = document.querySelector('.form-end');
            // Insert cancel button
            cardForm.insertBefore(button, formEnd);
        } else {
            this.postSubmit.textContent = 'Post It';
            this.postSubmit.className = 'submitBtn btn btn-success btn-block';
            // Remove cancel btn if it is there
            if (document.querySelector('.post-cancel')) {
                document.querySelector('.post-cancel').remove();
            }
            // Clear ID from hidden field
            this.clearIdInput();
            // Clear text
            this.clearFields();
        }
    }
}


var loader = document.querySelector(".loader")

window.addEventListener("load", vanish);

function vanish() {
    loader.classList.add("disppear");
}

// drag and drop with sortable js
const dragArea = document.querySelector(".sortable");

new Sortable(dragArea, {
    handle: '.dragBtn', // handle's class
    animation: 650
});
export const ui = new UI();