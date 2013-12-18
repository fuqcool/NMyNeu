var app = angular.module('myneu', ['ngResource', 'ngCookies']);

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

app.controller('searchCtrl', ['$scope', 'Term', 'Subject', '$rootScope', '$cookieStore', function ($scope, Term, Subject, $rootScope, $cookies) {
  var init = true;
  var favTerm = $cookies.get('favTerm');
  var favSubject = $cookies.get('favSubject');

  $scope.terms = Term.query(function () {
    if (init && favTerm) {
      $scope.activeTerm = _.findWhere($scope.terms, { id: favTerm });
      $scope.activeTerm && $scope.onSelectTerm();
    }
  });

  $scope.onSelectTerm = function () {
    $scope.subjects = Subject.query({ term: $scope.activeTerm.id }, function () {
      if (init && favSubject) {
        $scope.activeSubject = _.findWhere($scope.subjects, { id: favSubject });
        $scope.activeSubject && $scope.onSelectSubject();

        init = false;
      }
    });
    $rootScope.$broadcast('select-term', $scope.activeTerm);
  };

  $scope.onSelectSubject = function () {
    $rootScope.$broadcast('select-subject', $scope.activeTerm, $scope.activeSubject);

    if (!init) {
      rememberChoice();
    }
  };

  function rememberChoice() {
    $cookies.put('favTerm', $scope.activeTerm.id);
    $cookies.put('favSubject', $scope.activeSubject.id);
  }

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
    $scope.originalSections = _.clone($scope.sections);
    $scope.changed = false;
  };

  $scope.reset = function () {
    $scope.sections = _.clone($scope.originalSections);
    $scope.changed = false;
  };

}]);
