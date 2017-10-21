#include <stdio.h>
#include <stdlib.h>
#include <gmp.h>

#define MAX_COUNT 1000000
#define filename "test.out"

unsigned long getMax(int argc, char* argv[]);

int main (int argc, char* argv[]) {
  unsigned long int count = 1;
  unsigned long int max = getMax(argc, argv);
  FILE *fn = fopen(filename, "w");

  if (max < 2 || max > MAX_COUNT) {
    printf("%s%d\n", "Please enter a count between 1 and ", MAX_COUNT);
    return 1;
  }

  mpz_t prev, next;
  mpz_init_set_d(prev, 0);
  mpz_init_set_d(next, 1);

  for (;;) {
    fprintf(fn, "%lu: %s\n", count, mpz_get_str(NULL, 10, prev));
    if (++count > max) break;
    static mpz_t temp;
    mpz_add(temp, prev, next);
    mpz_set(prev, next);
    mpz_set(next, temp);
  }
}

unsigned long int getMax (int argc, char* argv[]) {
  if (argc < 2) {
    printf("%s", "No arguments provided.\n");
    return 0;
  }
  return atol(argv[1]);
}
