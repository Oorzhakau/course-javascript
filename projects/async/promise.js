// setTimeout(() => {
//   console.log("Timeout!");
//   clearInterval(interval);
// }, 5000) ;

// let count = 0;

// const interval = setInterval(() => {
//   ++count;
//   console.log('Count', count);
// }, 1000);

//=============================
// Frontend ==> Server ==> DB ==> Server ==> Frontend
console.log("Frontend: Запрос к серверу");
new Promise((resolve, reject) => {
  setTimeout(()=>{{
    console.log("Server: Запрашиваю данные с БД");
    console.log("...");
    resolve();
  }}, 2000)
}).then(() => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{{
      console.log("DB: Делаю выборку");
      console.log("...");
      const data = {
        userName: "Alex",
        age: 34,
      }
      resolve(data);
      // reject({status: 403, message: "DB connection fail!"});
    }}, 1000);
  })
}).then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{{
      console.log("Server: Модификация данных");
      console.log("Данные из БД: ", data);
      new_data = {...data, modified: true}
      resolve(new_data);
      console.log("Данные после модификации: ", new_data);
      console.log("...");
    }}, 1000);
  })
}).then((dataFromServer) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{{
      console.log("Frontend: Отображение данных");
      console.log("...");
      document.body.innerHTML = `<h1>${dataFromServer.userName}</h1>`
      resolve();
    }}, 1000);
  })
})
.catch((error) => {
  console.log("Error - ", error);
})
.finally(() => {
  console.log("result!");
});