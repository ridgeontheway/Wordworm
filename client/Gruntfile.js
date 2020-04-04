module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    removeLoggingCalls: {
      // the files inside which you want to remove the console statements
      files: ['src/**/*.js'],
      options: {
        // an array of method names to remove
        methods: ['log', 'info', 'assert'],

        // replacement strategy
        strategy: function(consoleStatement) {
          // comments console calls statements
          return '/* ' + consoleStatement + '*/'

          // return ''; // to remove
        },

        // when the logging statement is ended by a semicolon ';'
        // include it in the 'consoleStatement' given to the strategy
        removeSemicolonIfPossible: true
      }
    }
  })
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-remove-logging-calls')
  // Default task(s).
  grunt.registerTask('default', ['grunt-remove-logging-calls'])
}
