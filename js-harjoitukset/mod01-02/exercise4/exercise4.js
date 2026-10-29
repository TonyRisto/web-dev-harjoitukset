const name = prompt("Mikä on nimesi?");

number = Math.floor(Math.random() * 4) + 1;

switch (number) {
    case 1:
        cottage = "Rohkelikko";
        break;
    case 2:
        cottage = "Luihuinen";
        break;
    case 3:
        cottage = "Puuskupuh";
        break;
    case 4:
        cottage = "Korpinkynsi";
        break;
}

document.querySelector("#name").innerHTML = `${name} sinä olet ${cottage}`