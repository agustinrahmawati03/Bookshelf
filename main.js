function checkForStorage() {
  return typeof Storage !== "undefined";
}
 
const masukkanBuku = new Event("masukkanBuku");
 
window.addEventListener("load", function () {
  (itemBuku = JSON.parse(localStorage.getItem("rakBuku")) || []), tampilData(itemBuku);
  const o = document.querySelector("#inputBook");
  o.addEventListener("submit", inputNilai);
  document.addEventListener("masukkanBuku", simpanData);
});
 
function inputNilai(inputNilai) {
  const title = document.querySelector("#inputJudulBuku").value;
  const author = document.querySelector("#inputPenulisBuku").value;
  const year = parseInt(document.querySelector("#inputTahunBuku").value);
  const isComplete = document.querySelector("#inputBookIsComplete").checked;
  const dataBuku = {
    id: Math.random(),
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };
  itemBuku.push(dataBuku);
  document.dispatchEvent(masukkanBuku);
  inputNilai.preventDefault();
}
 
function tampilData(itemBuku) {
  const belum = document.getElementById("incompleteBook");
  const selesai = document.getElementById("completeBook");
  (belum.innerHTML = ""), (selesai.innerHTML = "");
  for (const data of itemBuku) {
    const itemBuku = document.createElement("article");
    itemBuku.classList.add("book_item");
    const judulBuku = document.createElement("h2");
    judulBuku.innerText = data.title;
    const penulisBuku = document.createElement("p");
    penulisBuku.innerText = "Penulis Buku: " + data.author;
    const tahunTerbit = document.createElement("p");

    if (((tahunTerbit.innerText = "Tahun Terbit: " + data.year), itemBuku.appendChild(judulBuku), itemBuku.appendChild(penulisBuku), itemBuku.appendChild(tahunTerbit), data.isComplete)) {
      const div = document.createElement("div");
      div.classList.add("action");
      const buttonSelesai = document.createElement("button");
      (buttonSelesai.id = data.id), (buttonSelesai.innerText = "Belum Selesai dibaca"), buttonSelesai.classList.add("green"), buttonSelesai.addEventListener("click", pindahKeRakSebelumnya);
      
      const buttonHapus = document.createElement("button");
      (buttonHapus.id = data.id),
        (buttonHapus.innerText = "Hapus Buku"),
        buttonHapus.classList.add("red"),
        buttonHapus.addEventListener("click", customDialogue),
        buttonHapus.addEventListener("click", hapusBuku),
        div.appendChild(buttonSelesai),
        div.appendChild(buttonHapus),
        itemBuku.appendChild(div),
        selesai.appendChild(itemBuku);
    } else {
      const div = document.createElement("div");
      div.classList.add("action");
      const buttonSelesai = document.createElement("button");
      (buttonSelesai.id = data.id), (buttonSelesai.innerText = "Selesai dibaca"), buttonSelesai.classList.add("green"), buttonSelesai.addEventListener("click", pindahKeRakSelesaiBaca);
      
      const buttonHapus = document.createElement("button");
      (buttonHapus.id = data.id),
        (buttonHapus.innerText = "Hapus"),
        buttonHapus.classList.add("red"),
        buttonHapus.addEventListener("click", customDialogue),
        buttonHapus.addEventListener("click", hapusBuku),
        div.appendChild(buttonSelesai),
        div.appendChild(buttonHapus),
        itemBuku.appendChild(div),
        belum.appendChild(itemBuku);
    }
  }
}
 
function pindahKeRakSelesaiBaca(inputNilai) {
  const selesai = itemBuku.findIndex(function (itemBuku) {
    return itemBuku.id === Number(inputNilai.target.id);
  });
  -1 !== selesai &&
    ((itemBuku[selesai] = {
      ...itemBuku[selesai],
      isComplete: !0,
    }),
    document.dispatchEvent(masukkanBuku));
}
 
function pindahKeRakSebelumnya(inputNilai) {
  const belum = itemBuku.findIndex(function (itemBuku) {
    return itemBuku.id === Number(inputNilai.target.id);
  });
  -1 !== belum &&
    ((itemBuku[belum] = {
      ...itemBuku[belum],
      isComplete: !1,
    }),
    document.dispatchEvent(masukkanBuku));
}
 
function customDialogue() {
  alert("Apakah Anda yakin untuk menghapus Buku?");
}
 
function hapusBuku(inputNilai) {
  const hapus = itemBuku.findIndex(function (itemBuku) {
    return itemBuku.id === Number(inputNilai.target.id);
  });
  -1 !== hapus && (itemBuku.splice(hapus, 1), document.dispatchEvent(masukkanBuku));
}
 
function simpanData() {
  !(function (itemBuku) {
    localStorage.setItem("rakBuku", JSON.stringify(itemBuku));
  })(itemBuku),
    tampilData(itemBuku);
}