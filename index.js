const { log } = require("console");
const fs = require("fs");
const { stringify } = require("querystring");
const { parser } = require("stream-json");
const { streamArray } = require("stream-json/streamers/StreamArray");
const { HashTable, InsereComLog } = require("./HashTable.js");
const { separarMes, radixSort } = require("./Radix.js");
var inputData = [];

// Função para processar cada objeto JSON lido do arquivo, colocando-o em um vetor
async function processJsonObject(jsonObj) {
  //console.log(jsonObj);
  inputData.push(jsonObj);
}

// Caminho do arquivo JSON de origem
const filePath = "./dataGiga.json";

// Cria um fluxo de leitura para o arquivo
const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

// Cria um pipeline de fluxo com StreamArray
const jsonStream = readStream.pipe(parser()).pipe(streamArray());

// Lê e processa cada objeto JSON do array
jsonStream.on("data", ({ key, value }) => {
  processJsonObject(value);
});

// Captura erros no fluxo de leitura
readStream.on("error", (error) => {
  console.error(`Erro ao ler o arquivo: ${error.message}`);
});

// Captura erros no fluxo JSON
jsonStream.on("error", (error) => {
  console.error(`Erro ao analisar o JSON: ${error.message}`);
});

// Finaliza o processo ao terminar a leitura
jsonStream.on("end", () => {
  console.log("Leitura do arquivo concluída.");

  let monthData = {
    January: [],
    February: [],
    March: [],
    April: [],
    May: [],
    June: [],
    July: [],
    August: [],
    September: [],
    October: [],
    November: [],
    December: [],
  };

  separarMes(inputData, monthData);
  radixSort(monthData);

  const hashTable = new HashTable(200);

  InsereComLog(monthData, hashTable);

  //Procura todos os logs correspondente
  console.log(hashTable.getLog(64091));

  console.log(hashTable.getLogMes(63091, "July"));
});
