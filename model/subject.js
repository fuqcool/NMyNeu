angular.module('myneu').factory('Subject', ['$resource', function ($resource) {
  var Subject = $resource('/udcprod8/bwckgens.p_proc_term_date', {}, {
    query: {
      method: 'post',
      isArray: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      transformRequest: function (data) {
        var data = {
          p_calling_proc: 'P_CrseSearch',
          p_term: data.term
        };

        return $.param(data);
      },
      transformResponse: function (data) {
        var result = [];
        var $doc = $(data);

        $doc.find('select[name="sel_subj"] option').each(function (i, el) {
          var $el = $(el);

          if ($el.val()) {
            result.push({
              name: $el.text(),
              id: $el.val()
            });
          }
        });

        return result;
      }
    }
  });

  return Subject;
}]);


// var Subject = Backbone.Model.extend({});


// function Subject() {

// }

// var Subjects = Backbone.Collection.extend({
//   model: Subject,
//   initialize: function () {
//     this.term = null;
//   },
//   parse: function (data) {
//     var result = [];
//     var $doc = $(data);

//     $doc.find('select[name="sel_subj"] option').each(function (i, el) {
//       var $el = $(el);

//       if ($el.val()) {
//         result.push({
//           name: $el.text(),
//           id: $el.val()
//         });
//       }
//     });

//     return result;
//   },
//   fetch: fetchWrapper(function (options) {
//     return {
//       type: 'post',
//       url: '/udcprod8/bwckgens.p_proc_term_date',
//       dataType: 'html',
//       data: {
//         p_calling_proc: 'P_CrseSearch',
//         p_term: options.data.term
//       }
//     };
//   })
// });
