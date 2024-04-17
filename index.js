function getUniqueElements(arr) {
    return Array.from(new Set(arr));
  }

  const arr = [1, 2, 2, 3, 3, 4, 5, 5];
console.log(getUniqueElements(arr)); // Output: [1, 2, 3, 4, 5]