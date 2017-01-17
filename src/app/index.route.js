export function routerConfig ($stateProvider, $urlRouterProvider) {
  'ngInject';
  $stateProvider
    .state('home', {
      url: '/',
      template: '<app></app>'
    });

  $urlRouterProvider.otherwise('/');
}
