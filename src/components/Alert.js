// Создание всплывающего алерта при возникновении ошибок
const showErrorAlert = (message = "Ошибка: недопустимый размер записи") => {
  const alertBlock = document.createElement("div");
  alertBlock.className = "alert";

  const text = document.createElement("p");
  text.textContent = message;

  alertBlock.appendChild(text);
  document.body.append(alertBlock);

  // Подумать насчет того, что timeout то не удаляется
  setTimeout(() => alertBlock.remove(), 3500);
};

export default showErrorAlert;
