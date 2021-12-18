var repoNameEl = document.querySelector("#repo-name");
var issuesContainerE1 = document.querySelector("#issues-container");
var limitWarningE1 = document.querySelector("#limit-warning");


var getRepoIssues = function(repo){
    //console.log(repo);
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
// request successful
if (response.ok){
    response.json().then(function(data){
        //pass response data to dom function
        displayIssues(data);

        // check if api has paginated issues
        if (response.headers.get("Link")) {
            displayWarning(repo)
          
        }
      });
    }
    else {
      console.log(response);
      alert("There was a problem with your request!");
    }
  });
};

var displayIssues = function(issues) {
  if (issues.length === 0) {
    issuesContainerE1.textContent = "This repo has no open issues!";
    
    return;
  }

  // loop over given issues
  for (var i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    console.log(issueEl);
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    //create span to hold issue title
    var titleE1 = document.createElement("span");
    titleE1.textContent = issues[i].title;

    //append to container 
    issueEl.appendChild(titleE1);
    //create a type element
    var typeE1 = document.createElement("span");

    //check if issue is an actual issue or a pull request
    if(issues[i].pull_request){
        typeE1.textContent = "(Pull request)";
    }else{
        typeE1.textContent = "(Issue)";
    }
    
    issueEl.appendChild(typeE1);

    issuesContainerE1.appendChild(issueEl);
}
};
var displayWarning= function(repo) {
    //add test to warning container 
    limitWarningE1.textContent = "To see more than 30 issues, visit ";
    
    var linkE1 = document.createElement("a");
    linkE1.textContent= "See More Issues on GitHub.com";
    linkE1.setAttribute("href","https://github.com/" + repo + "/issues");
    linkE1.setAttribute("target","_blank");

    //append to warning container 
    limitWarningE1.appendChild(linkE1);
};

getRepoIssues("facebook/react");
