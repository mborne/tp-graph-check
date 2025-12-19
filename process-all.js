const shell = require('shelljs');
const repositories = require('./config/repositories.json');
const fs = require('fs');

shell.mkdir('-p', __dirname + '/data');

let results = [];

/*
 * pour chaque dépôt...
 */
for (const [username, repositoryUrl] of Object.entries(repositories)) {
    console.log(`-- ${username} - ${repositoryUrl} ...`);

    let result = {
        username: username,
        repositoryUrl: repositoryUrl
    };

    let repositoryDir = __dirname + '/data/' + username + '/tp-graph-ts';

    /*
     * on clone au besoin le dépôt
     */
    if (!fs.existsSync(repositoryDir)) {
        let commandClone = `git clone ${repositoryUrl} ${repositoryDir}`;
        shell.exec(commandClone, { silent: true });
    } else {
        let commandPull = `cd ${repositoryDir} && git pull`;
        shell.exec(commandPull, { silent: false });
    }

    // on se place dans le dossier du dépôt
    shell.cd(repositoryDir);

    /*
     * result.branchName : on récupère le nom de la branche par défaut
     */
    {
        let commandBranchName = 'git symbolic-ref --short HEAD';
        result.branchName = shell.exec(commandBranchName, { silent: true }).stdout.trim();
        console.log('BRANCH : ' + result.branchName);
    }

    /*
     * result.commitId : on récupère l'identifiant du commit
     */
    {
        let commandCommitId = 'git rev-parse HEAD';
        result.commitId = shell.exec(commandCommitId, { silent: true }).stdout.trim();
        console.log('COMMIT : ' + result.commitId);
    }

    /*
     * result.commitDate : on récupère la date du dernier commit
     */
    {
        let commandCommitDate = 'git log -1 --date=iso --format=%cd'
        result.commitDate = shell.exec(commandCommitDate, { silent: true }).stdout.trim();
        console.log('DATE : ' + result.commitDate);
    }

    /*
     * récupération de la liste des branches
     */
    {
        let commandBranches = `git branch -a > ${repositoryDir}.branches.txt 2>&1`;
        shell.exec(commandBranches);
    }

    /*
     * result.install : on lance la construction
     */
    {
        let cmdInstall = `npm install > ${repositoryDir}.install.txt 2>&1`;
        result.install = shell.exec(cmdInstall).code === 0;
        console.log('INSTALL : ' + (result.install ? 'SUCCESS' : 'FAILURE'));
    }

    /*
     * result.build : on lance la construction
     */
    {
        let cmdBuild = `npm run build > ${repositoryDir}.build.txt 2>&1`;
        result.build = shell.exec(cmdBuild).code === 0;
        console.log('BUILD : ' + (result.build ? 'SUCCESS' : 'FAILURE'));
    }

    /*
     * result.test : on lance la construction avec les tests
     */
    {
        let cmdTest = `npm run test > ${repositoryDir}.build-test.txt 2>&1`;
        result.test = shell.exec(cmdTest).code === 0;
        console.log('TEST : ' + (result.test ? 'SUCCESS' : 'FAILURE'));
    }

    /*
     * analyse du code avec PMD
     */
    // {
    //     let pmdReportPath = `${repositoryDir}.pmd.html`;
    //     let pmdConfigPath = __dirname+'/config/pmd.xml';
    //     let commandPmd = `${PMD_HOME}/bin/run.sh pmd --dir src/main/java --rulesets ${pmdConfigPath} --short-names --format summaryhtml --report-file ${pmdReportPath}`;
    //     shell.exec(commandPmd,{silent: true});
    //     result.pmd = fs.existsSync(pmdReportPath);
    //     console.log('PMD : ' + (result.pmd ? 'SUCCESS' : 'FAILURE'));
    // }

    results.push(result);
}

fs.writeFileSync(
    __dirname + '/results.json',
    JSON.stringify(results, null, 2)
);




