// Implementação da busca

// Classe para definir um nó da lista encadeada
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

// Classe para a tabela hash com encadeamento
class HashTable {
  constructor(size) {
    this.size = size;
    this.table = new Array(size);
  }

  resize(newSize) {
    const oldTable = this.table;
    this.size = newSize;
    this.count = 0;
    this.table = new Array(this.size);

    for (const node of oldTable) {
      let currentNode = node;
      while (currentNode !== null) {
        this.add(currentNode.key, currentNode.value);
        currentNode = currentNode.next;
      }
    }
  }

  // Função de hashing simples
  hash(key) {
    let hashValue = 0;
    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }
    return hashValue % this.size;
  }

  // Função para adicionar um par chave-valor na tabela
  add(key, value) {
    const index = this.hash(key);
    if (this.table[index] === undefined) {
      // Se o índice estiver vazio, criamos um novo nó
      this.table[index] = new Node(key, value);
    } else {
      // Se o índice já estiver ocupado, percorremos a lista encadeada
      let currentNode = this.table[index];
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      // Adicionamos o novo nó no final da lista encadeada
      currentNode.next = new Node(key, value);
    }
  }

  // Função para buscar o valor correspondente a uma chave na tabela
  getLog(key) {
    const index = this.hash(key);
    if (this.table[index] === undefined) {
      return "## Nenhum registro encontrado";
    } else {
      let currentNode = this.table[index];
      const values = [];
      while (currentNode !== null) {
        if (currentNode.key === key) {
          values.push(currentNode.value);
        }
        currentNode = currentNode.next;
      }
      return values.length > 0 ? values : undefined;
    }
  }

  getLogMes(key, Mes) {
    const index = this.hash(key);
    if (this.table[index] === undefined) {
      return "## Nenhum registro encontrado";
    } else {
      let currentNode = this.table[index];
      const values = [];
      while (currentNode !== null) {
        if (currentNode.key === key) {
          if (currentNode.value.month === Mes) {
            values.push(currentNode.value);
          }
        }
        currentNode = currentNode.next;
      }
      return values.length > 0 ? values : "Nenhum valor encontrado";
    }
  }
}

//Adiciona todos os logs na hash table ; pelo mes
function InsereComLog(monthData, hashTable) {
  for (let month in monthData) {
    monthData[month].forEach((e) => {
      //console.log("Mes:" + e.month + " -----   Valor:" + e.log);
      hashTable.add(e.log, e);
    });
  }
}

module.exports = { HashTable, InsereComLog };
