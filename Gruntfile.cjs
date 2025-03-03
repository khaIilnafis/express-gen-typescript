/* eslint-disable @typescript-eslint/no-require-imports */
const semver = require("semver");
const _ = require("lodash");
module.exports = function (grunt) {
  // Load package.json to get current version
  const pkg = grunt.file.readJSON("package.json");
  const currentVersion = pkg.version;
  //   const types = {
  //     feat: {
  //       description: "A new feature",
  //       title: "Features",
  //       emoji: "✨",
  //     },
  //     fix: {
  //       description: "A bug fix",
  //       title: "Bug Fixes",
  //       emoji: "🐛",
  //     },
  //     refactor: {
  //       description: "A code change that neither fixes a bug nor adds a feature",
  //       title: "Code Refactoring",
  //       emoji: "📦",
  //     },
  //     test: {
  //       description: "A code change that neither fixes a bug nor adds a feature",
  //       title: "Code Refactoring",
  //       emoji: "📦",
  //     },
  //   };
  //   const length = _.longest(Object.keys(types)).length + 1;
  //   const choices = _.map([], function (type, key) {
  //     return {
  //       name: (key + ":").padEnd(length) + " " + type.description,
  //       value: key,
  //     };
  //   });
  grunt.loadNpmTasks("grunt-bump");
  grunt.loadNpmTasks("grunt-prompt");
  grunt.initConfig({
    prompt: {
      bump: {
        options: {
          questions: [
            {
              config: "bump",
              type: "confirm",
              message: "Bump version?",
            },
            {
              config: "bump.increment",
              type: "lists",
              message: "Bump version from " + `${pkg.version}` + " to:",
              choices: [
                {
                  value: "build",
                  name:
                    "Build:  " +
                    (currentVersion + "-?") +
                    " Unstable, betas, and release candidates.",
                },
                {
                  value: "patch",
                  name:
                    "Patch:  " +
                    semver.inc(currentVersion, "patch") +
                    " Backwards-compatible bug fixes.",
                },
                {
                  value: "minor",
                  name:
                    "Minor:  " +
                    semver.inc(currentVersion, "minor") +
                    " Add functionality in a backwards-compatible manner.",
                },
                {
                  value: "major",
                  name:
                    "Major:  " +
                    semver.inc(currentVersion, "major") +
                    " Incompatible API changes.",
                },
                {
                  value: "custom",
                  name: "Custom: ?.?.? Specify version...",
                },
              ],
              when: (answers) => {
                return answers["bump"] === true;
              },
            },
            {
              config: "bump.version",
              type: "input",
              message: "What specific version would you like",
              when: function (answers) {
                return answers["bump.increment"];
              },
              validate: function (value) {
                const valid = semver.valid(value);
                return (
                  !!valid ||
                  "Must be a valid semver, such as 1.2.3-rc1. See http://semver.org/ for more details."
                );
              },
            },
            {
              config: "bump.files",
              type: "checkbox",
              message: "What should get the new version:",
              choices: [
                {
                  value: "package",
                  name:
                    "package.json" +
                    (!grunt.file.isFile("package.json") ? " not found" : ""),
                  checked: grunt.file.isFile("package.json"),
                },
                {
                  value: "git",
                  name: "git tag",
                  checked: grunt.file.isDir(".git"),
                },
              ],
              when: function (answers) {
                return answers["bump.version"];
              },
            },
          ],
        },
      },
      //   checkout: {
      //     options: {
      //       questions: [
      //         {
      //           config: "branch.type",
      //           type: "lists",
      //           message:
      //             "Select the type of branch you're creating: (Use arrow keys)",
      //           choices: choices,
      //         },
      //         {
      //           config: "branch.name",
      //           type: "input",
      //           message: "Name your branch:",
      //         },
      //       ],
      //     },
      //   },
    },
    bump: {
      options: {
        files: [],
        updateConfigs: ["pkg"],
        commit: true,
        commitMessage: '<%=grunt.config("gitmessage")%>',
        commitFiles: ["package.json"],
        createTag: true,
        tagName: "v%VERSION%",
        tagMessage: "Version %VERSION%",
        push: true,
        pushTo: "origin",
        gitDescribeOptions: "--tags --always --abbrev=1 --dirty=-d",
        globalReplace: false,
        prereleaseName: false,
        metadata: "",
        regExp: false,
      },
    },
  });

  grunt.registerTask("bump", ["prompt:bump", "processBump"]);
  //   grunt.registerTask("checkout", ["prompt:checkout", "processCheckout"]);
  grunt.registerTask("processBump", function () {
    // If bump was requested
    if (grunt.config("bump")) {
      // Configure bump task based on user input
      const bumpType = grunt.config("bump.increment");

      // Set the custom version if specified
      if (bumpType) {
        grunt.config("bump.options.setVersion", grunt.config("bump.version"));
      }

      // Configure which files to bump
      const bumpFiles = grunt.config("bump.files") || [];
      const configFiles = grunt.config("bump.updateCOnfigs") || [];
      const files = [];

      if (bumpFiles.includes("package")) {
        files.push("package.json");
        configFiles.push("pkg");
      }

      if (files.length > 0) {
        grunt.config("bump.options.files", files);
        grunt.config("bump.options.updateConfig", configFiles);
      }

      // Set git tagging based on user selection
      const createTag = bumpFiles.includes("git");
      grunt.config("bump.options.createTag", createTag);

      // Set commit message
      const commitMessage = `Bumping version to: ${grunt.config("bump.version")}`;
      grunt.config("bump.options.commitMessage", commitMessage);

      // Run the bump task with the selected increment
      grunt.task.run(`bump:${bumpType ? bumpType : ""}`);
    } else {
      grunt.log.writeln("Skipping bump process");
    }
  });

  //   grunt.registerTask("processCheckout", function () {
  //     const type = grunt.config("branch.type");
  //     const name = grunt.config("branch.name");
  //   });
};
