---
slug: angular-injector
title: "La notion d'Injector en Angular"
authors: dsouron
tags: [Angular, Advanced, Programming, French]
---

Un `Injector` est un mécanisme dédié à l'injection de dépendances en Angular. Tous les frameworks ne construisent pas leur DI (Injection de Dépendances) de la même manière. On peut citer par exemple Spring IoC Container pour le fameux framework Java. La documentation Angular a très longtemps mis en avant les `providers`, laissant de côté d'autres éléments pourtant nécessaire à la DI. Les `Injector` n'échappent pas à la règle, c'est pourquoi je vous propose de voir ensemble leur fonctionnement.

<!--truncate-->

> _Jusqu'à la version 13, les explications sur la DI se concentrent sur les [cas d'usages](https://v13.angular.io/guide/dependency-injection-providers). Ce n'est qu'après que les rouages internes ont été documentés (quelques exemples [ici](https://angular.io/guide/dependency-injection) et [là](https://angular.io/guide/hierarchical-dependency-injection))._

## Le fonctionnement d'un Injector

Tout simplement, il ne s'agit ni plus ni moins que d'un objet qui va gérer des `providers`. Il doit fournir les dépendances et garantir qu'elles restent des singletons via un cache interne. Ce cache interne conserve des références vers les `providers`, ce qui permet de renvoyer les instances existantes. Le cas échéant, l'`Injector` se charge de l'instanciation et garde une référence pour les prochains appels (exemple : jeton d'injection d'une classe ou d'un service). Les `Injector` se placent donc entre les `providers` définis dans l'application et les composants/services qui consomment ces `providers`.

Ce que l'on peut remarquer, c'est que le fonctionnement d'un `Injector` seul est assez trivial. Toute la complexité vient du fait qu'ils sont très nombreux dans une application Angular et qu'en tant que développeur Angular, on ne les manipule pas directement (enfin très rarement).

## Injectors, Injectors everywhere

Ok ils sont nombreux, mais ils sont nombreux comment ? Chaque `NgModule` va automatiquement créer un `Injector`, et chaque composant ou directive qui possède des `providers` ou des `viewProviders` va aussi créer un `Injector`. Dans le premier cas c'est un `ModuleInjector`, et pour le deuxième on parle d'`ElementInjector`. On comprend donc que le nombre d'`Injector` va très vite croître avec notre application (à minima, autant d'`Injector` que de `NgModule`).

:::tip
Quand un `Injector` est détruit, les instances qu'il avait en cache le sont aussi. Les `NgModule` ne sont pas souvent détruits mais les composants c'est une autre histoire. Donc les `ElementInjector` sont fréquemment créés et détruits, tout comme les services associés.
:::

## Injector et résolution de dépendances

Chaque dépendance est résolue en remontant progressivement la chaine d'`Injector`. Pour un service injecté au niveau d'un composant, on interroge successivement l'`ElementInjector` (si le composant possède des `providers`), le `ModuleInjector` du module qui déclare le composant, puis le l'`Injector` du module parent, l'`Injector` du parent du parent, etc., jusqu'à arriver au `ModuleInjector` _root_. Bien entendu, la recherche s'arrête dès que l'on récupère une instance du service demandé.

Pour le sommet de la structure, c'est le même fonctionnement pour toutes les applications Angular. On a un `PlatformModule` qui est appellé dans le `main.ts` et tout ce qui n'a pas été trouvé fini dans un `NullInjector` (cf. illustration ci-dessous).

![Illustration du root `Injector`, du platform `Injector` et du `NullInjector`](./base-injectors.png)

:::tip
La liste des `providers` d'un `Injector` n'est pas figée. On peut très bien confier d'autres services à l'`Injector` _root_ après le démarrage de l'application. C'est d'ailleurs ce qu'il se passe quand vous faites `providedIn: "root"` sur un service qui est uniquement utilisé dans un module avec lazy-loading.
:::

## Injector, Bundle & Instanciation

Impossible de parler d'`Injector` sans faire un détour par la gestion du bundle et des instanciations car les confusions sont fréquentes. En effet, ce n'est pas parce qu'un service est `providedIn: "root"` qu'il sera dans le bundle principal. De même, ce service ne sera pas nécessairement instancié au démarrage de l'application.

Pour ce qui est du bundle, le _tree-shaking_ fait le ménage et retire tout ce qui n'est pas nécessaire. Ainsi, tous les services qui ne sont pas utilisés dans le bundle principal sont exclus. Attention toutefois, les services définis dans les `providers` d'un module ne profitent pas de cet avantage. Ils seront inclus dans le bundle en même temps que le module ! Et comment ça se passe pour les services `providedIn: "root"` utilisées dans plusieurs modules avec lazy-loading ? C'est là qu'intervient l'option [commonChunk](https://github.com/angular/angular-cli/blob/ce3f1bd6b9bd4f584fba9abe9bd7d6bb81670bda/packages/angular_devkit/build_angular/src/builders/browser/schema.json#L262) qui va déterminer si on duplique le service dans chaque bundle ou si on fait un bundle common (valeur par défaut).

Concernant l'instanciation, elle est retardée jusqu'au dernier moment. Tant qu'il n'y a pas de consommateurs du service, il n'y a pas de raison de l'instancier. Cela veut dire que la partie `providedIn: "root"` garantit seulement que le service sera un singleton disponible à travers toute l'application. Ce même service peut ne jamais être instancié. Vigilance donc sur les services car la DI c'est magique mais il existe quelques gotchas.

## Conclusion

J'espère vous avoir apporté une meilleur compréhension du rôle des `Injector` dans le fonctionnement d'Angular. Vous savez maintenant que c'est un objet qui gère les instanciations à la racine, dans les modules et dans certains composants ou directives. Ces instanciations sont partagées avec les éléments enfants mais elles peuvent aussi être surchargées localement par un sous module ou dans un composant.

Quand vous faites un [chargement dynamique de composant](https://angular.io/guide/dynamic-component-loader), vous pouvez définir vous-même l'`Injector` utilisé (cf. [documentation sur `ViewContainerRef`](https://angular.io/api/core/ViewContainerRef#createcomponent)). Pour les curieux, je vous conseille d'aller voir l'impact des _standalone components_ sur les `Injector`, ça se passe [ici](https://angular.io/guide/standalone-components#dependency-injection-and-injectors-hierarchy).
