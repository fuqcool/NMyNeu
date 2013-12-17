var app = angular.module('myneu', ['ngResource']);

app.controller('mainCtrl', ['$scope', function ($scope) {

}]);

app.controller('courseCtrl', ['$scope', 'Course', 'Section', '$rootScope', function ($scope, Course, Section, $rootScope) {
  $scope.$on('select-subject', function (evt, term, subject) {
    $scope.courses = Course.query({ term: term.id, subject: subject.id }, function () {
      _.each($scope.courses, function (course) {
        course.sections = Section.query({
          term: term.id,
          subject: subject.id,
          course: course.id
        }, function () {

          $rootScope.$broadcast('sections', function (selectedSections) {
            _.each(course.sections, function (section) {
              if (_.findWhere(selectedSections, { id: section.id })) {
                section.selected = true;
              }
            });
          });

        });
      });
    });
  });

  $scope.onSelectSection = function (section) {
    $rootScope.$broadcast('select-section', section);
  };

  $scope.$on('select-section', function (evt, section) {
    if (!section.selected) {

    }
  });

}]);

app.controller('searchCtrl', ['$scope', 'Term', 'Subject', '$rootScope', function ($scope, Term, Subject, $rootScope) {
  $scope.terms = Term.query();

  $scope.onSelectTerm = function () {
    $scope.subjects = Subject.query({ term: $scope.activeTerm.id });
    $rootScope.$broadcast('select-term', $scope.activeTerm);
  };

  $scope.onSelectSubject = function () {
    $rootScope.$broadcast('select-subject', $scope.activeTerm, $scope.activeSubject);
  };
}]);


app.controller('dashboardCtrl', ['$scope', 'SelectedClass', function ($scope, SelectedClass) {
  $scope.changed = false;

  $scope.$on('select-term', function (evt, term) {
    $scope.sections = SelectedClass.query({ term: term.id }, function () {
      $scope.originalSections = _.clone($scope.sections);
    });
  });

  $scope.$on('select-section', function (evt, section) {
    if (section.selected) {
      $scope.addSection(section);
    } else {
      $scope.removeSection(section);
    }

    $scope.changed = true;
  });

  $scope.$on('sections', function (evt, cb) {
    cb($scope.sections);
  });

  $scope.addSection = function (section) {
    $scope.sections.push(section);
  };

  $scope.removeSection = function (target) {
    $scope.sections = _.filter($scope.sections, function (section) {
      return section.id !== target.id;
    });

    $scope.changed = true;
  };

  $scope.applyChanges = function () {
    $scope.changed = false;
  };

  $scope.reset = function () {
    $scope.sections = _.clone($scope.originalSections);
    $scope.changed = false;
  };

}]);
