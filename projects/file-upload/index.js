import './styles.css';

const form = document.querySelector('#form');
const submitBtn = document.querySelector('#submitBtn');
const btnLoadImg = document.querySelector('#imgLoadBtn');
const btnLoadAudio = document.querySelector('#audioLoadBtn');

const backendApi = 'http://localhost:3000';

function clickBtnHandler(inputFileElem) {
  inputFileElem.click();
}

function changeInputFile() {
  const isDisabled = !(form.elements.fileImg.files[0] && form.elements.fileAudio.files[0]);
  submitBtn.disabled = isDisabled;
}

form.elements.fileImg.addEventListener('change', changeInputFile);
form.elements.fileAudio.addEventListener('change', changeInputFile);

btnLoadImg.addEventListener('click', () => clickBtnHandler(form.elements.fileImg));
btnLoadAudio.addEventListener('click', () => clickBtnHandler(form.elements.fileAudio));

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  const { fileAudio, fileImg, author } = this.elements;
  const formData = new FormData();
  formData.append('fileAudio', fileAudio.files[0]);
  formData.append('fileImg', fileImg.files[0]);
  formData.append('author', author.value);

  const response = await fetch(`${backendApi}/upload`, {
    method: 'POST',
    body: formData,
  }).then(data => data.json());

  renderFile(response);
});

function renderFile(response) {
  document.querySelector('#file-list').innerHTML += `
  <div class="content">
    <div>${response.author}</div>
    <div id="image"><img src="${backendApi}/image/${response.image}"/></div>
    <div id="music"><audio controls src="${backendApi}/audio/${response.audio}"></audio></div>
  </div>
  `;
};