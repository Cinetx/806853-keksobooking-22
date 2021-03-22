// Аватарка пользователя должна загружаться через поле загрузки файлов в блоке
// .ad-form__field и показываться в блоке .ad-form-header__preview.
const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPreview = document.querySelector('.ad-form__photo img');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];


const onPhotoChange = (chooser, renderBlock, renderCallback) => {
  chooser.addEventListener('change', () => {
    // Находим файл

    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    // Проверяем совпадение файла
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

onPhotoChange(avatarChooser, avatarPreview, renderPhoto);
onPhotoChange(photoChooser, photoPreview, renderPhoto)

export { avatarChooser, avatarPreview, photoChooser, photoPreview };
