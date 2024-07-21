//#region Popups
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.innerText = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, 1000); // Hide the notification after 5 seconds
    }
}
//#endregion