/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами.
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el)); // выведет каждый элемент массива
 */
function forEach(array, func) {
  for(const [idx, item] of array.entries()) {
    func(item, idx, array);
  };
};

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами.
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const newArray = map([1, 2, 3], (el) => el ** 2);
   console.log(newArray); // выведет [1, 4, 9]
 */
function map(arr, func) {
  const new_arr = [];
  for(const [idx, item] of arr.entries()) {
    new_arr.push(func(item, idx, arr));
  }
  return new_arr;
};

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами.
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   const sum = reduce([1, 2, 3], (all, current) => all + current);
   console.log(sum); // выведет 6
 */
function reduce(arr, func, initial) {
  let result  = initial;
  let idx = 0

  if (initial === undefined) {
    idx = 1;
    result = arr[0];
  }

  for(let i = idx; i < arr.length; i++) {
    result = func(result, arr[i], i, arr);
  };
  return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   const keys = upperProps({ name: 'Сергей', lastName: 'Петров' });
   console.log(keys) // выведет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  return Object.keys(obj).map(k => k.toUpperCase());
}

export { forEach, map, reduce, upperProps };
