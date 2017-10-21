#include <stdio.h>
#include <stdlib.h>
#include <gmp.h>

#define MAX_COUNT 1000000
#define filename "test2.out"

unsigned long getMax(int argc, char* argv[]);

int main (int argc, char* argv[]) {
  unsigned long int count = 1;
  unsigned long int max = getMax(argc, argv);
  FILE *fn = fopen(filename, "w");

  if (max < 2 || max > MAX_COUNT) {
    printf("%s%d\n", "Please enter a count between 1 and ", MAX_COUNT);
    return 1;
  }

  mpz_t fibn, fibn_sub1;
  mpz_init(fibn);
  mpz_init(fibn_sub1);

  do {
    mpz_fib2_ui(fibn, fibn_sub1, count);
    fprintf(fn, "%lu: %s\n", count++, mpz_get_str(NULL, 10, fibn_sub1));
    fprintf(fn, "%lu: %s\n", count++, mpz_get_str(NULL, 10, fibn));
  } while (count < max);
}

unsigned long int getMax (int argc, char* argv[]) {
  if (argc < 2) {
    printf("%s", "No arguments provided.\n");
    return 0;
  }
  return atol(argv[1]);
}
