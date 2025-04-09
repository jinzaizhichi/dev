/*
 * License: CC0
 *
 * To the extent possible under law, the person who associated CC0 with
 * this project has waived all copyright and related or neighboring rights
 * to this project.
 *  
 * You should have received a copy of the CC0 legalcode along with this
 * work.  If not, see <http://creativecommons.org/publicdomain/zero/1.0/>.
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>


int rand_uniform_poly(double *coef, int n, double min_c, double max_c) {

  int i;

  for (i=0; i<n; i++) {
    coef[i] = ((max_c - min_c)*((double)rand() / (RAND_MAX+1.0))) + min_c;
  }

  return 0;
}

int print_poly(double *coef, int n) {
  int i;

  for (i=0; i<n; i++) {

    if (i==0) {
      printf("%f", coef[i]);
      continue;
    }

    if (coef[i] > 0.0) { printf("+"); }
    printf("%f*x^%i", coef[i], i);
  }
  printf("\n");
}


int main(int argc, char **argv) {
  int i, j, k, it;
  int n_poly;

  int n;
  double min_c, max_c;

  double *coef;

  min_c = -1.0;
  max_c = 1.0;

  n_poly = 100;
  n = 32;

  if (argc>1) {
    n = atoi(argv[1]);
    if (argc>2) {
      n_poly = atoi(argv[2]);

      if (argc>3) {
        min_c = atof(argv[3]);

        if (argc>4) {
          max_c = atof(argv[4]);
        }
      }
    }
  }

  coef = (double *)malloc(sizeof(double)*n);
  memset(coef, 0, sizeof(double)*n);

  for (it=0; it<n_poly; it++) {

    rand_uniform_poly(coef, n, min_c, max_c);

    print_poly(coef, n);

  }
}
