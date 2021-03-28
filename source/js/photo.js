const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarChooserElement = document.querySelector('.ad-form__field input[type=file]');
const avatarPreviewElement = document.querySelector('.ad-form-header__preview img');
const photoChooserElement = document.querySelector('.ad-form__upload input[type=file]');
const photoPreviewElement = document.querySelector('.ad-form__photo img');

const onPhotoChange = (chooser, renderBlock, renderCallback) => {
  chooser.addEventListener('change', () => {

    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    renderCallback(matches, file, renderBlock)
  })
}

const renderPhoto = (matches, file, renderBlock) => {
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      renderBlock.src = reader.result
    })

    reader.readAsDataURL(file);
  }
};

onPhotoChange(avatarChooserElement, avatarPreviewElement, renderPhoto);
onPhotoChange(photoChooserElement, photoPreviewElement, renderPhoto)

export { avatarChooserElement, avatarPreviewElement, photoChooserElement, photoPreviewElement };
