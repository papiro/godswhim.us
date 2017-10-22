#include <stdlib.h>
#include <stdio.h>
#include <string.h>

void outFib     (unsigned short, char*);
void chkArgLen  (int);
void lpadZero   (char*);
void bigIntAdd  (char**, char**);
void padBigs    (char*, char*);
void carryTheOne(char*, unsigned short);

#define start_mem_len 10
unsigned short mem_len = start_mem_len;

int main (int argc, char *argv[]) {
  chkArgLen(argc);
  unsigned short count = atoi(argv[1]);

  char *prev_ptr = malloc(mem_len); 
  char *next_ptr = malloc(mem_len); 
  *prev_ptr = '0';
  *next_ptr = '1';

  for (unsigned short i = 1; i <= count; i++) {
    if (i > 2) {
      bigIntAdd(&prev_ptr, &next_ptr);  
      outFib(i, prev_ptr);
      // Here's where we swap
      char *temp_ptr = prev_ptr;
      prev_ptr = next_ptr;
      next_ptr = temp_ptr;
    } else outFib(i, i == 1 ? prev_ptr : next_ptr);
  }
}
void bigIntAdd (char **_prev, char **_next) {
  char *prev = *_prev;
  char *next = *_next;
  padBigs(prev, next);
  // They should be equal length now.
  size_t len = strlen(prev);
  if (len >= mem_len) {
    // grow mem
    mem_len += 10; 
    *_prev = realloc(prev, mem_len);
    *_next = realloc(next, mem_len);
    prev=*_prev;
    next=*_next;
  }
  char *temp = prev;
  for (unsigned short i = len; i>0; i--) {
    unsigned short idx = i-1;
    short dig1 = *(prev + idx) - '0';
    short dig2 = *(next + idx) - '0';
    short dig3 = dig1 + dig2;
    if (dig3 >= 10) {
      dig3 %= 10; 
      // Carrying the 1 onto either number will do.
      carryTheOne(prev, idx);
    }
    *(temp + idx) = dig3 + '0';
  }
}
void carryTheOne (char *prev, unsigned short pos) {
  char *left = (prev + pos - 1);
  unsigned short dig = *left - '0';
  if (++dig >= 10) {
    *left = '0'; 
    carryTheOne(prev, pos - 1);
  } else
    *left = dig + '0';
}
void padBigs (char *prev, char *next) {
  size_t prev_len = strlen(prev);
  size_t next_len = strlen(next);
  if (prev_len < next_len) {
    lpadZero(prev);
  } else if (next_len < prev_len) {
    lpadZero(next);
  }
  if ((*prev - '0') + (*next - '0') >= 9) {
    lpadZero(prev);
    lpadZero(next);
  }
}
void lpadZero (char *num) {
  // shift right, in-place
  const unsigned long len = strlen(num);
  for (unsigned long i = len; i > 0; i--) {
    *(num+i) = *(num+i-1);
  }
  *num = '0';
}
void outFib(unsigned short count, char* num) {
  printf("%hu: %s\n", count, num);
}
void chkArgLen (int argc) {
  if (argc < 2) {
    fprintf(stderr, "%s", "Which number in the Fibonacci sequence would you like to output all numbers up to?\n");
    exit(1);
  }
}
