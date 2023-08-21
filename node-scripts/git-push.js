const { exec } = require("child_process")
const readline = require("readline")

// Run `git add .`
exec("git add .", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`)
    return
  }

  // Ask for input for commit message
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  rl.question("Commit message: ", (message) => {
    rl.close()

    // Ask for input for branch name (optional)
    const rl2 = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    })
    rl2.question("Branch name (press enter for default): ", (branch) => {
      rl2.close()

      const commitCommand = `git commit -m "${message}"`

      // Run `git commit -m "<commit message>"`
      exec(commitCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }

        let pushCommand = "git push"

        if (branch) {
          pushCommand += ` origin ${branch}`
        }

        // Run `git push`
        exec(pushCommand, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.log(`stderr: ${stderr}`)
        })
      })
    })
  })
})
