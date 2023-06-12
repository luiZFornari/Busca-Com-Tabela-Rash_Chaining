//Função para achar o numero mais grande do log
function getMax(inputData, n) {
  let mx = inputData[0].log;
  for (let i = 1; i < n; i++) if (inputData[i].log > mx) mx = inputData[i].log;
  return mx;
}

function countSort(inputData, n, exp) {
  let output = new Array(n);
  let i;
  let count = new Array(10);
  for (let i = 0; i < 10; i++) count[i] = 0;

  for (i = 0; i < n; i++) {
    let x;
    x = Math.floor(inputData[i].log / exp) % 10;
    count[x]++;
  }

  for (i = 1; i < 10; i++) count[i] += count[i - 1];

  for (i = n - 1; i >= 0; i--) {
    let index;
    index = Math.floor(inputData[i].log / exp) % 10;
    output[count[index] - 1] = inputData[i];
    count[index]--;
  }

  for (i = 0; i < n; i++) inputData[i] = output[i];
}

// Itere sobre os arrays de cada mês e aplique a ordenação por log
function radixSort(monthData) {
  for (let month in monthData) {
    let n = monthData[month].length;

    if (n > 0) {
      // Encontra o valor máximo do log
      let m = getMax(monthData[month], n);

      // Ordena por log utilizando o Counting Sort
      for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10) {
        countSort(monthData[month], n, exp);
      }
    }
  }
}

//Função para colcocar cada objeto JSON em um array de acordo com o mês
function separarMes(Data, monthData) {
  Data.forEach((entry) => {
    monthData[entry.month].push(entry);
  });
}

module.exports = { separarMes, radixSort };
