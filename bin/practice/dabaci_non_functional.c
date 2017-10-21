#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define initSize 10

void outFib(unsigned long int, char*);
void carryTheOne(char*, char);
void manageSize(char*, char*);
void singleLeftZeroPad(char**);
char* bigintAdd(char*, char*);

unsigned memLen = initSize;

int main (int argsLength, char* args[]) {
  char prev[initSize] = "0"; 
  char next[initSize] = "1"; 
  char* prevPntr = prev;
  char* nextPntr = next;

  if (argsLength < 2) {
    printf("%s", "You need at least one arg.\n");
    exit(1);
  }
  unsigned long count = atoi(args[1]);

  for (unsigned long i = 1; i <= count; i++) {
    char* temp = NULL; 
    if (i > 2) {
      // Grow the strings if they're within 1 of the allocated space.
      manageSize(prev, next);
      // Normalize strings.
      if (prev[0] != '0' && next[0] != '0') {
        singleLeftZeroPad(&prevPntr);
        if (strlen(prev) > strlen(next))
          singleLeftZeroPad(&nextPntr);
      }
      temp = bigintAdd(prev, next);
      strcpy(prev, next);
      strcpy(next, temp);
      //prev = next;
      //next = temp;
    }
    outFib(i, temp);
  }
}

char* bigintAdd (char* num1, char* num2) {
  unsigned len1 = strlen(num1); 
  char* ret = malloc(len1+1);
  for (unsigned i = len1; i > 0; i--) {
    char dig1 = num1[i-1], dig2 = num2[i-1]; 
    char dig3 = dig1 + dig2 - '0'; 
    if (dig3 - '0' >= 10) {
      dig3 = (dig3 - '0') % 10;
      carryTheOne(num1, i-2); // Only need to pass one number here as it doesn't matter which one we increment by 1.  On the next iteration of this for loop, the digit[i] of num1 will have been incremented.
    }
    ret[i-1] = dig3;
  }

  return ret; 
}

void singleLeftZeroPad (char** str) {
  char* newStr = malloc(strlen(*str)+1);
  newStr[0] = '0';
  *str = strcat(newStr, *str);
}

void outFib (unsigned long currentCount, char* num) {
  if (currentCount == 1)
    num = "0";
  else if (currentCount == 2)
    num = "1";

  printf("%lu: %s\n", currentCount, num);
}

void carryTheOne (char* num1, char pos) {
  num1[pos] = num1[pos] - '0' + 1;
  if (num1[pos] >= 10)
    carryTheOne (num1, pos + 1);
}

void manageSize (char* num1, char* num2) {
  if (strlen(num2) >= memLen - 1) {
    memLen+=10;
    num1 = realloc(num1, memLen);
    num2 = realloc(num2, memLen);
  }
}
