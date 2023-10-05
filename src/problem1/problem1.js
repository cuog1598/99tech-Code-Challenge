// Problem 1: Three ways to sum to n

// using loop
function sum_to_n_a(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

// Using mathematical formula
function sum_to_n_b(n) {
  return (n * (n + 1)) / 2;
}
function sum_to_n_c(n) {
  return (n / 2) * (n + 1);
}
