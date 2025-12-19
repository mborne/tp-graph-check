# Notes de corrections

## Généralités

- Test KO (à priori lié à question 3) :

```
  17 passing (2s)
  1 failing

  1) should produce edges with startPoint and endPoint coordinates matching vertex:

      AssertionError: expected [ 6.6841994, 47.1080685 ] to deeply equal [ 6.6843154, 47.1080855 ]
      + expected - actual

       [
      -  6.6841994
      -  47.1080685
      +  6.6843154
      +  47.1080855
       ]
```

## Questions

- Q1 : RAS
- Q2 : Les fabriques sont définies mais le code n'est pas adapté...
- Q3 : Les coordonnées ne sont pas inversées pour reverseEdge -> les tests plantent.

