export const renderMarkup = (renderList, container) => {
      container.innerHTML = "";
      const markup = renderList.map( ({name, email, phone, id}) => `
      <div class="card col-6 col-md-4 mb-1 position-relative shadow">
        <div class="card-body">
          <h5 class="card-title d-flex align-items-center gap-1 mb-4">
            <span class="material-icons-round"> cast </span> ${name}
          </h5>
          <p class="card-subtitle mb-2 text-muted d-flex align-items-center gap-1">
            <span class="material-icons-round"> alternate_email </span> ${email}
          </p>
          <p class="card-text d-flex align-items-center gap-1">
            <span class="material-icons-round"> phone </span> ${phone}
          </p>
        </div>
        <button
          type="button"
          class="btn-close position-absolute top-0 end-0"
          aria-label="Close"
          data-id="${id}"
        ></button>
      </div>
      `).join('');
      container.insertAdjacentHTML('afterbegin', markup);
 };
