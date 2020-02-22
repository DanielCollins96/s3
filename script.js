document.addEventListener("DOMContentLoaded", (event) => {
    let stats = document.querySelector('#stats');

    let baseURL = 'https://statsapi.web.nhl.com/api/v1/'

    let teams = []

    // fetch('https://statsapi.web.nhl.com/api/v1/teams/54/roster')
    fetch(baseURL + 'teams')
        .then((response) => {
            // console.log(response)
            return response.json()
        })
        .then((res) => {
            // console.log(res.teams)
            teams = res.teams
            loadTeams();
            // resolve('hi')
        })
        .catch((error) => {
            console.log('uhoh', error)
        })

    let loadTeams = () => {
        teams.forEach((franchise) => {
            let linebreak = document.createElement("br");
            let team = document.createElement('div');
            let teamName = document.createElement('h3');
            let websiteLink = document.createElement('a')
            let rosterLink = document.createElement('p')
            teamName.textContent = franchise.name
            websiteLink.setAttribute('href', franchise.officialSiteUrl);
            websiteLink.textContent = 'website'
            // rosterLink.setAttribute('href', franchise.officialSiteUrl);
            rosterLink.textContent = 'Roster'
            rosterLink.onclick = async() => {
                stats.innerHTML = '';
                let rosterReq = callAPI('teams/' + franchise.id + '/roster')
                let roster = await rosterReq;
                await console.log(roster)
                // let roster = await callAPI('teams/' + franchise.id + '/roster')
                // await console.log(roster);
                
                // await console.log('wtf2')
            }
            team.appendChild(teamName);
            team.appendChild(websiteLink)
            team.appendChild(linebreak);
            team.appendChild(rosterLink)
            stats.appendChild(team);
        })
    }

    let callAPI = (value) => {
        fetch(baseURL + value)
            .then((response) => {
                return response.json()
            })
            .then((res) => {
                console.log('hihih' + res)
                return res
            })
    }

})