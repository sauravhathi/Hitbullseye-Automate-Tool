function toast(message, type = "success") {
    const div = document.createElement("div");
    div.id = "toast";
    const text = document.createTextNode(message);
    div.appendChild(text);
    const styleList = [
        'background-color: ' + (type === 'success' ? '#350054' : '#ff0000'),
        'color: ' + (type === 'success' ? '#fff' : '#fff'),
    ];
    div.style.cssText = styleList.join(";");
    document.body.appendChild(div);
    setTimeout(() => {
        div.style.opacity = "1";
        div.style.transform = "translateY(0)";
    }, 1);
    setTimeout(() => {
        div.style.opacity = "0";
        div.style.transform = "translateY(-100%)";
        setTimeout(() => {
            document.body.removeChild(div);
        }, 500);
    }, 2000);
}