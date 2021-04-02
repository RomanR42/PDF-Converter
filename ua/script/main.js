const output = document.getElementById('output');
const btnSubmit = document.getElementById('btnSubmit');
const fileUploader = document.getElementById('file');
const dropZone = document.getElementById('drop-zone');
const form = document.forms[0];


dropZone.addEventListener('dragover', event => {
  event.stopPropagation();
  event.preventDefault();
  event.dataTransfer.dropEffect = 'copy';
  dropZone.style.border = '2px solid red';
});

dropZone.addEventListener('dragleave', event => {
  event.stopPropagation();
  event.preventDefault();
  dropZone.style.border = 'none';
});

dropZone.addEventListener('drop', event => {
  dropZone.style.border = 'none';
  const files = event.dataTransfer.files;
  fileUploader.files =files;
  event.preventDefault();
  validator ();
});


fileUploader.addEventListener('change', (event) => {
    validator ();
});

  function validator() {

    if (fileUploader.files.length > 5) {
        output.innerHTML = `Максимальна кількість файлів 5`;
        output.style.color = 'red';
        btnSubmit.disabled = true;
        btnSubmit.classList.add('disabled');
        return;
    }

    for (const file of fileUploader.files) {
      
      if (file.size > 5242880) {
        output.innerHTML = `Максимальний розмір файлу 5Mb. ${file.name}: ${(file.size/1048576).toFixed(2)} Mb`;
        output.style.color = 'red';
        btnSubmit.disabled = true;
        btnSubmit.classList.add('disabled');
        return;
      }
      
      if (file.type != 'image/jpeg' && file.type != 'image/png' && file.type !='image/svg+xml'
      && file.type != 'application/vnd.ms-excel'  && file.type !='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      && file.type != 'application/msword' && file.type != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      && file.type != 'image/gif') { 
        output.innerHTML = `Тип файлу не підтримується: ${file.type}`;
        output.style.color = 'red';
        btnSubmit.disabled = true;
        btnSubmit.classList.add('disabled');
        return;
      }
    }
    output.innerHTML = `Файл(и) готові для завантаження`;
    output.style.color = 'green';
    btnSubmit.disabled = false;
    btnSubmit.classList.remove ('disabled');
  }

  form.onsubmit = function () {
         
     if (form.formats.value == 'null') {
         output.innerHTML = 'Виберіть формат для збереження';
         output.style.color = 'red';
         return false;
     }

    output.innerHTML = ``;
    console.dir(fileUploader.files);
    btnSubmit.disabled = true;
    btnSubmit.classList.add('disabled');
    
    return false;
  }
  
