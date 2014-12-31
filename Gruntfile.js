module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // uglify: {
    //   options: {
    //     banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
    //   },
    //   build: {
    //     src: 'src/<%= pkg.name %>.js',
    //     dest: 'build/<%= pkg.name %>.min.js'
    //   }
    // },
    // uglify: {
    //     files: { 
    //         src: 'lib/*.js',  // source files mask
    //         dest: 'lib/',    // destination folder
    //         expand: true,    // allow dynamic building
    //         flatten: true,   // remove all unnecessary nesting
    //         ext: '.min.js'   // replace .js to .min.js
    //     }
    // },
    // watch: {
    //     js:  { files: 'lib/*.js', tasks: [ 'uglify' ] },
    // }
  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  //grunt.registerTask('default', ['uglify']);

};