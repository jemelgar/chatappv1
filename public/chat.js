const socket = io();
let message = document.querySelector("#message");
let btn = document.querySelector("#send");
let output = document.querySelector("#output");
let actions = document.querySelector("#actions");
let username = document.querySelector("#username");

btn.addEventListener("click", function () {
  socket.emit("chat:message", {
    message: message.value,
    username: username.value,
  });
});
message.addEventListener("keypress", function () {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:message", function (data) {
  actions.innerHTML = "";
  output.innerHTML += `<p>
<strong>${data.username}</strong>: ${data.message}
</p>`;
});

socket.on("chat:typing", function (data) {
  actions.innerHTML = `<p><em>${data} está escribiendo</em></p>`;
});
