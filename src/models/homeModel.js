const mongoose = require("mongoose");
//O esquema/modelagem dos nossos dados
const warehouseSchema = new mongoose.Schema({
  //Modelando nosso banco iremos passar alguns objetos com atributos
  titulo: {
    //Passando o tipo do objeto
    type: String,
    //Dizendo que o titulo é importante e não iremos cadastrar caso não tenha
    required: true,
  },
  descricao: String,
});
//Criando o model e passando ele como warehouse
const warehouseModel = mongoose.model("warehouse", warehouseSchema);
//Agora iremos exportar o nosso model para ser utilizado
module.exports = warehouseModel;
