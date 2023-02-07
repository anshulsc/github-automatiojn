const express = require('express');
const app = express();


const {Octokit} = require('@octokit/rest');
require('dotenv').config();

const port = process.env.PORT || 3000;

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
});

app.use(express.json());


app.get('/api/info', async (req,res) => {

    const org = await octokit.request('Get /user')

    res.status(200).json({org})
})


// Uplaoding Template to Organisation Github
app.post('/api/fork', async (req, res) => {

    const {url} = req.body;

    const {forkurl} = await forkrepo(url)

    res.json({
        'message' : url + ' forked',
        forkurl,
    })
});


//Giving Collaborator Access to the Repo
app.get('/api/collab', async (req, res) => {

    const {org,repo, username} = req.body;
    const addcollab = await octokit.repos.addCollaborator({
        owner: org,
        repo: repo,
        username: username,
        permission: 'pull'
   }
    )
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}
)


async function forkrepo(url){

    const {owner, repo} = getRepoInfo(url);
    let forkurl = null

    try{
        const fork = await octokit.repos.createFork({
            owner: owner,
            repo: repo,
        })
        console.log(fork.data.html_url)
        forkurl = fork.data.html_url
       
       
    }
    catch(err){
        console.log(err)
    }
    console.log(forkurl + "forkurl")
    return {forkurl};
    
}


function getRepoInfo(repoUrl) {
    const urlArray = repoUrl.split("/");
    const owner = urlArray[3];
    const repo = urlArray[4].split(".")[0];
    return { owner, repo };
}