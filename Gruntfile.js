module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    uglify: {
      build: {
        files: [
          {
            src: "react-client/dist/bundle.js",
            dest: "react-client/dist/index.js"
          }
        ]
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-uglify");
};
