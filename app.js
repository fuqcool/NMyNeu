var app = angular.module('myneu', ['ngResource']);

app.controller('mainCtrl', ['$scope', function ($scope) {

}]);

app.controller('courseCtrl', ['$scope', 'Course', 'Section', function ($scope, Course, Section) {
  $scope.$on('refresh-courses', function (evt, term, subject) {
    $scope.courses = Course.query({ term: term.id, subject: subject.id }, function () {

      _.each($scope.courses, function (course) {
        course.sections = Section.query({
          term: term.id,
          subject: subject.id,
          course: course.id
        });
      });

    });
  });
}]);

app.controller('searchCtrl', ['$scope', 'Term', 'Subject', '$rootScope', function ($scope, Term, Subject, $rootScope) {
  $scope.terms = Term.query();

  $scope.onSelectTerm = function () {
    $scope.subjects = Subject.query({ term: $scope.activeTerm.id });
  };

  $scope.onSelectSubject = function () {
    $rootScope.$broadcast('refresh-courses', $scope.activeTerm, $scope.activeSubject);
  };
}]);
