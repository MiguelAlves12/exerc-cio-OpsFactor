function dropdownEletrodomesticos() {
    let dropdown = document.querySelector(".dropdown-content2");
    if (getComputedStyle(dropdown).display == "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

function dropdownEletronicos() {
    let dropdown = document.querySelector(".dropdown-content3");
    if (getComputedStyle(dropdown).display == "none") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

let dropdown = document.querySelector(".categ");
dropdown.addEventListener('mouseover', mouseOut, false);

function mouseOut(event) {
    let dropdown2 = document.querySelector(".dropdown-content2");
    let dropdown3 = document.querySelector(".dropdown-content3");
    dropdown2.style.display = "none";
    dropdown3.style.display = "none";
}

function putImage(elemento) {
    let imagem = document.querySelector(".imagem");
    if (elemento.text.trim() == "Televisão A") {
        imagem.src = "https://images.samsung.com/is/image/samsung/br-uhdtv-nu7400-un50nu7400gxzd-frontblack-113032186?$PD_GALLERY_L_JPG$";
        imagem.style.width = "550px";
        imagem.style.height = "350px";
        imagem.style.marginLeft = "25%";
    } else if (elemento.text.trim() == "Televisão B") {
        imagem.src = "https://img.global.news.samsung.com/br/wp-content/uploads/2017/02/smart-tv.png";
        imagem.style.width = "";
        imagem.style.height = "";
        imagem.style.marginLeft = "20%";
    } else if (elemento.text.trim() == "Geladeira A") {
        imagem.src = "images/Geladeira3.png";
        imagem.style.width = "360px";
        imagem.style.height = "400px";
        imagem.style.marginLeft = "30%";
    } else {
        imagem.src = "https://electrolux.vteximg.com.br/arquivos/ids/183699-500-500/Refrigerador-Side-By-Side-Frost-Free-504L-Inox-SS72X.png?v=636469699350000000";
        imagem.style.width = "360px";
        imagem.style.height = "400px";
        imagem.style.marginLeft = "30%";

    }

}