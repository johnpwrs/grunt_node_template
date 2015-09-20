/* global module */
module.exports = function(grunt) {
  'use strict';

  //dynamically load grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  var config = require('./config');
  var configs = config.getConfig(grunt.option('target') || 'development');
  var port = grunt.option('port');
  
  if (port) {
    process.env.APP_PORT = port;
  }

  // Project configuration.
  grunt.initConfig({
    //runs the server
    nodemon: {
      dev: {
        script: 'bin/www'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'nodemon'
  ]);

};
