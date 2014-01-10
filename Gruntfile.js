module.exports = function(grunt) {

    grunt.initConfig({

        // Import package manifest
        pkg: grunt.file.readJSON("sf2FormCollection.jquery.json"),

        // Banner definitions
        meta: {
            banner: "/*\n" +
                " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
                " *  <%= pkg.description %>\n" +
                " *  <%= pkg.homepage %>\n" +
                " *\n" +
                " *  Made by <%= pkg.author.name %>\n" +
                " *  Under <%= pkg.licenses[0].type %> License\n" +
                " */\n"
        },

        // Concat definitions
        concat: {
            dist: {
                src: ["src/sf2FormCollection.js"],
                dest: "dist/sf2FormCollection.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Minify definitions
        uglify: {
            js: {
                src: ["dist/sf2FormCollection.js"],
                dest: "dist/sf2FormCollection.min.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },

        // Jasmine definitions
        jasmine : {
            src : "src/**/*.js",
            options : {
                specs : "spec/**/*.js",
                vendor : ["dist/jquery-1.10.2.min.js","dist/jquery-ui.min.js"]
            }
        },

        qunit: {
            all: ["test/**/*.html"]
        },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: ".jshintrc"
                },
                src: "Gruntfile.js"
            },
            src: {
                options: {
                    jshintrc: "src/.jshintrc"
                },
                src: ["src/**/*.js"]
            },
            test: {
                options: {
                    jshintrc: "test/.jshintrc"
                },
                src: ["test/**/*.js"]
            },
            jasmine: {
                options: {
                    jshintrc: "spec/.jshintrc"
                },
                src: ["spec/**/*.js"]
            },
        },

        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },
            src: {
                files: "<%= jshint.src.src %>",
                tasks: ["jshint:src", "qunit","jasmine"]
            },
            test: {
                files: "<%= jshint.test.src %>",
                tasks: ["jshint:test", "qunit"]
            },
            jasmine: {
                files: "<%= jshint.jasmine.src %>",
                tasks: ["jshint:jasmine", "jasmine"]
            },
        },
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-qunit");

    grunt.registerTask("default", ["jshint", "jasmine", "qunit", "concat", "uglify"]);
    grunt.registerTask("travis", ["jshint", "jasmine", "qunit"]);
};
