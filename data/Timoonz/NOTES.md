# Notes de correction

## Généralités

- RAS sur commits
- Le démonstrateur ne fonctionne plus

## Questions

- Q2 : KO

En corrigeant comme suit :

```ts
if (allowedDirection == "Double sens" || allowedDirection == "Sens inverse") {
    const edge = g.createEdge(startVertex, endVertex, feature.properties.cleabs_ge + '-reverse');
    edge.setGeometry(geometry);
}
```

=>

```ts
if (allowedDirection == "Double sens" || allowedDirection == "Sens inverse") {
    const edge = g.createEdge(endVertex, startVertex, feature.properties.cleabs_ge + '-reverse');
    edge.setGeometry(geometry);
}
```

... le démonstrateur fonctionne -> il est cassé à partir de cette question -> pas de test manuel à partir de question 2...



