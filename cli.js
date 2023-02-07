const {Octokit} = require('@octokit/rest')

require('dotenv').config() 


// T.1 - Type method of doing it 
const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

const github = new Octokit({
    auth:'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'
})

const org = "anshulsc"
const repo = "DropIT"
const username = 'Dynamight24'

async function run()
{
    // const user = await octokit.request('GET /user')
    

    // console.log(user)

    const user2 = await github.request('GET /user')

    console.log(user2)

    // const collab = await octokit.request('GET /repos/{org}/{repo}/collaborators/{username}', {
    //     org: org,
    //     repo: repo,
    //     username: username
      
    // })

   const addcollab = await octokit.repos.addCollaborator({
        owner: org,
        repo: repo,
        username: username,
        permission: 'pull'
   }
    )
    // console.log(addcollab) 

//Fork a repo to given username github account

    

    const fork = await github.repos.createFork({
        owner: org,
        repo: repo,
        username: username,
    })
    console.log(fork)







    // T.1 This is the long way to do it
    // const {data : readme} = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    //     owner: user.data.login,
    //     repo: "CoolingSystemforPVPanels",
    //     path: "README.md"

    // })

    // const content = Buffer.from(readme.content, 'base64').toString()
    // console.log(content)

    // const newContent = addLine(content)
    // console.log(newContent)

    // const response = await octokit.request(
    //     'PUT /repos/{owner}/{repo}/contents/{path}',{
    //         owner: user.data.login,
    //         repo: "CoolingSystemforPVPanels",
    //         path: "README.md",
    //         message: "Added a new line",    
    //         content: Buffer.from(newContent,'utf-8').toString('base64'),
    //         sha: readme.sha
    //     }
    // )
    
   
    function addLine( string)
    {
        var newString = string +  " the new line"
        return newString
}
}
run()


