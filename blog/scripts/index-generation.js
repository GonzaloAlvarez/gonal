
var assign = require('object-assign');
var pagination = require('hexo-pagination');

var excludeDraftPosts = function(post) {
    return !(post.draft && post.draft === true);
};

var generateIndexWithoutDrafts = function(locals){
  'use strict';

  var config = this.config;
  var posts = locals.posts.sort('-date').filter(excludeDraftPosts);
  var paginationDir = config.pagination_dir || 'page';

  return pagination('', posts, {
      perPage: config.index_generator.per_page,
         layout: ['index', 'archive'],
         format: paginationDir + '/%d/',
         data: {
             __index: true
         }
  });
};
hexo.config.index_generator = assign({
    per_page: typeof hexo.config.per_page === "undefined" ? 10 : hexo.config.per_page
}, hexo.config.index_generator);

hexo.extend.generator.register('index', generateIndexWithoutDrafts);
