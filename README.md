# guess-the-beta
Guess the beta!

Project designed to make staying connected with you climbing buddy's easier - no matter where you may be in the world!🤓🤘

Primarly React.js and node framework - will update dependencies when utilized.

Wooohoooooo🎉


# To start app in development

`git pull`  // pulls latest from GitHub
`expo start`  // starts expo. make sure your device is connected to the same WiFi as your computer
`expo start --tunnel` // when on public wifi, use --tunnel to connect to Expo


# Key Git Commands

`git status`	// checks files that have been added/deleted/edited in local repo
`git add .`    // adds all edits to the stage, ready for commit
`git commit -m "Message"`	// commits edits that are staged

`git pull`		// pulls the latest commits from remote repo
`git push`      // pushes local changes to remote repo

`git stash`			// stash local changes (perform git pull next)
`git stash pop`    // add local stashed changes back into directory

`git remote update`	// updates connection with remote repo
`git status -uno`		  // checks local repo in comparison with remote repo

`git log --oneline`		// shows log of commits, 'q' to exit
`git reset <commit ID>`  // resets local repo with a different commit 

`git reflog`		// shows log of git pulls

`git branch`	                                 	// shows local branches
`git branch -r`	                           	// shows remote branches
`git checkout <DEV BRANCH NAME>`		// switch to local branch

**make a new branch on github, then...**
`git fetch origin`	                        // fetches all commits on all branches
`git branch -r`	                           	// shows remote branches
`git checkout --track origin/<BRANCH NAME>`		// make tracked copy of remote branch on local and switch to it

**if you want to bring current branch up to speed with master...**
`git fetch origin`	                        // fetches all commits on all branches
`git merge origin/master`     		// brings current branch up to speed with master branch

**if you make some changes that you want to turn into a branch... **
`git checkout -b <branch>` 		// makes new branch, taking current files with it
`git add .` `git commit -m`			// add and commit changes to new branch
`git push -u origin <branch>`	// pushes new branch to remote (GitHub)!

**When ready to MERGE new branch, do a PULL REQUEST instead (on GitHub) to save commit activity.**

WHEN IN MERGE... https://stackoverflow.com/questions/20101994/git-pull-from-master-into-the-development-branch/20103414
`i` to insert merge message/comment
`esc` to escape after you've written your comment
`:wq` to write your comment & quit 

`git branch -d <BRANCH NAME>`	// delete local branch once you have merged the pull request & deleted on github