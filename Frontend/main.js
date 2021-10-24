import "./assets/css/style.css";
import "core-js/stable";
import "regenerator-runtime/runtime";
const newMaterial = document.querySelector("[data-form-button]");

const createTask = (e) => {
  if (e.target === newMaterial) {
    e.preventDefault();
    try {
      var form = document.querySelector(".formaMaterial");
      var name = document.createElement("INPUT");
      name.classList.add("input-padrao1");
      name.setAttribute("type", "text");
      name.setAttribute("placeholder", "Name");
      name.setAttribute("name", "name");
      form.appendChild(name);
      var description = document.createElement("INPUT");
      description.classList.add("input-padrao1");
      description.setAttribute("type", "text");
      description.setAttribute("placeholder", "Description");
      description.setAttribute("name", "description");
      form.appendChild(description);
      var price = document.createElement("INPUT");
      price.classList.add("input-padrao1");
      price.setAttribute("type", "text");
      price.setAttribute("placeholder", "Price");
      price.setAttribute("name", "price");
      form.appendChild(price);
      var quantity = document.createElement("INPUT");
      quantity.classList.add("input-padrao1");
      quantity.setAttribute("type", "number");
      quantity.setAttribute("placeholder", "Quantity");
      quantity.setAttribute("name", "quantity");
      form.appendChild(quantity);
      var button = document.createElement("INPUT");
      button.classList.add("enviar");
      button.setAttribute("type", "submit");
      button.setAttribute("value", "Create");
      form.appendChild(button);
      document.removeEventListener("click", createTask);
      button.addEventListener("click", () => {
        document.addEventListener("click", createTask);
      });
    } catch (error) {
      alert(error);
    }
  }
};
document.addEventListener("click", createTask);
