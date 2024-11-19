let srchbtn = document.getElementById("srchBtn");

async function getData(name) {
    let data = await fetch(`https://api.github.com/users/${name}`);
    data = await data.json(); // Await the JSON conversion
    return data;
}

srchbtn.addEventListener("click", async function () {
    let user = document.getElementById("srchGit").value;
    let data = await getData(user);
    document.getElementById("Git_name").innerText = data.name;
    document.getElementById("pfp").src = data.avatar_url;
    document.getElementById("Git_joinDate").innerText = data.created_at.slice(0, 10);
    document.getElementById("Git_bio").innerText = data.bio;

    const gitUserElement = document.getElementById("Git_user");
    gitUserElement.innerText = `@${data.login}`;
    gitUserElement.style.cursor = "pointer";

    gitUserElement.replaceWith(gitUserElement.cloneNode(true));
    const updatedGitUserElement = document.getElementById("Git_user");

    updatedGitUserElement.addEventListener("click", function () {
        window.location.href = `https://github.com/${data.login}`; 
    });
    let repo_data = await fetch(data.repos_url);
    repo_data = await repo_data.json();
    document.getElementById("Git_repos").innerText = repo_data.length;
    document.getElementById("Git_followers").innerText = data.followers;
    document.getElementById("Git_following").innerText = data.following;

    document.getElementById("Git_Location").innerText = data.location;
    document.getElementById("Git_Link").innerText = data.email;
    document.getElementById("Git_Twitter").innerText = data.twitter_username;
    document.getElementById("Git_company").innerText = data.company;
});
