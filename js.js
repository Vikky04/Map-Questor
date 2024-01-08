let main = document.querySelector(".main");
let rowcount = 26;
let columncount = 68;
let flag = false;
let borderflag = false;
let startflag = false;
let endflag = false;
let solved = false;
let startpoint = "";
let endpoint = "";
let visited = {};
let path = {};

function Start_point() {
  startflag = true;
  flag = false;
  borderflag = false;
  endflag = false;
  document.getElementById("Status").innerHTML = "Set the Start Point";
}
function Border() {
  borderflag = true;
  startflag = false;
  flag = false;
  endflag = false;
  document.getElementById("Status").innerHTML = "Set the border";
}
function End_point() {
  startflag = false;
  flag = false;
  borderflag = false;
  endflag = true;
  document.getElementById("Status").innerHTML = "Set the End Point";
}

async function bfs(i, j, idprev) {
  await new Promise((resolve) => setTimeout(resolve, 20));
  let id = "" + i + "," + j;

  if (id in visited) {
    return 1;
  }
  if (j >= columncount || i >= rowcount || j < 0 || i < 0) {
    return 1;
  }

  if (
    document.getElementById(id).classList.contains("borderblock") ||
    document.getElementById(id).classList.contains("solblock")
  ) {
    return 1;
  }
  path[id] = idprev;
  if (document.getElementById(id).classList.contains("enderblock")) {
    solved = true;
    document.getElementById("Status").innerHTML = "DONE";
    let nex = id;
    console.log(path);
    while (nex != path[nex]) {
      document.getElementById(nex).classList.remove("movementblock");
      document.getElementById(nex).classList.add("solblock");
      nex = path[nex];
    }
    console.log(path);
    return 0;
  }
  visited[id] = 1;
  if (!solved) bfs(i, Number(j) + 1, id);
  if (!solved) bfs(i, Number(j) - 1, id);
  if (!solved) bfs(Number(i) + 1, j, id);
  if (!solved) bfs(Number(i) - 1, j, id);
  if (solved) {
    return 0;
  }
  return 1;
}

async function dfs(i, j, idprev) {
  let id = "" + i + "," + j;

  if (id in visited) {
    return 1;
  }
  if (j >= columncount || i >= rowcount || j < 0 || i < 0) {
    return 1;
  }

  if (document.getElementById(id).classList.contains("borderblock")) {
    return 1;
  }
  path[id] = idprev;
  if (document.getElementById(id).classList.contains("enderblock")) {
    solved = true;
    document.getElementById("Status").innerHTML = "DONE";
    let nex = id;
    console.log(path);
    while (nex != path[nex]) {
      document.getElementById(nex).classList.remove("movementblock");
      document.getElementById(nex).classList.add("solblock");
      nex = path[nex];
    }
    console.log(path);
    return 0;
  }
  visited[id] = 1;

  if (!solved) dfs(Number(i) - 1, j, id);

  if (!solved) dfs(i, Number(j) + 1, id);

  if (!solved) dfs(Number(i) + 1, j, id);

  if (!solved) dfs(i, Number(j) - 1, id);

  if (solved) {
    return 0;
  }
  return 1;
}

//dijkstra=========================================================================
// vector <int> dijkstra(int V, vector<vector<int>> adj[], int S)
//     {
//         set<pair<int,int>> st;
//         vector<int> dist(V, 1e9);
//         st.insert({0, S});
//         dist[S] = 0;
//         while(!st.empty()) {
//             auto it = *(st.begin());
//             int node = it.second;
//             int dis = it.first;
//             st.erase(it);
//             for(auto it : adj[node]) {
//                 int adjNode = it[0];
//                 int edgW = it[1];

//                 if(dis + edgW < dist[adjNode]) {
//                     if(dist[adjNode] != 1e9)
//                         st.erase({dist[adjNode], adjNode});
//                     dist[adjNode] = dis + edgW;
//                     st.insert({dist[adjNode], adjNode});
//                  }
//             }
//         }
//         return dist;
//     }

async function Dijkstra(i, j, idprev) {
  let id = "" + i + "," + j;
  queue = [id];
  let visit = {};
  let weight = [1];
  while (queue != []) {
    let [row, col] = queue.shift().split(",");
    let temp = weight.shift();
    id = "" + row + "," + col;
    visit[id] = 1;
    if (document.getElementById(id).classList.contains("enderblock")) {
      solved = true;
      document.getElementById("Status").innerHTML = "DONE";
      break;
    }
    if (
      document.getElementById(id).classList.contains("borderblock") ||
      document.getElementById(id).classList.contains("solblock")
    ) {
      continue;
    }
    row = Number(row) + 1;
    if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
      temp_id = "" + row + "," + col;
      if (!(temp_id in visit)) {
        queue.push(temp_id);
        weight.push(temp + 1);
        visit[temp_id] = 1;
        path[temp_id] = id;
      }
    }
    row = row - 1;
    col = Number(col) - 1;
    if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
      temp_id = "" + row + "," + col;
      if (!(temp_id in visit)) {
        queue.push(temp_id);
        weight.push(temp + 1);
        visit[temp_id] = 1;
        path[temp_id] = id;
      }
    }

    row = row - 1;
    col = col + 1;

    if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
      temp_id = "" + row + "," + col;
      if (!(temp_id in visit)) {
        queue.push(temp_id);
        weight.push(temp + 1);
        visit[temp_id] = 1;
        path[temp_id] = id;
      }
    }
    row = row + 1;
    col = col + 1;
    if (!(col >= columncount || row >= rowcount || col < 0 || row < 0)) {
      temp_id = "" + row + "," + col;
      if (!(temp_id in visit)) {
        queue.push(temp_id);
        weight.push(temp + 1);
        visit[temp_id] = 1;
        path[temp_id] = id;
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
  if (solved == true) {
    let nex = id;
    console.log(path);
    while (nex != path[nex]) {
      document.getElementById(nex).classList.remove("movementblock");
      document.getElementById(nex).classList.add("solblock");
      nex = path[nex];
    }
    console.log(path);
    return 0;
  }
}

function Solve() {
  document.getElementById("Status").innerHTML = "Solving the maze";
  borderflag = false;
  arr = startpoint.split(",");
  let id = "" + arr[0] + "," + arr[1];
  var algo = document.querySelector(
    'input[name="Pathfinding Algorithm"]:checked'
  ).value;
  if (algo == "BFS") {
    bfs(arr[0], arr[1], id);
  } else if (algo == "DFS") {
    dfs(arr[0], arr[1], id);
  } else if (algo == "Dijkstra") {
    Dijkstra(arr[0], arr[1], id);
  }
}

for (let i = 0; i < rowcount; i++) {
  let row = document.createElement("div");
  row.classList.add("row");
  main.appendChild(row);
  for (let j = 0; j < columncount; j++) {
    let block = document.createElement("div");
    block.id = "" + i + "," + j;
    block.classList.add("movementblock");
    block.onmouseover = () => {
      if (flag && borderflag) {
        block.classList.remove("movementblock");
        block.classList.add("borderblock");
        block.style.animationPlayState = "running";
        console.log(block.id);
      }
    };
    block.onclick = () => {
      if (borderflag) {
        block.classList.remove("movementblock");
        block.classList.add("borderblock");
        // block.style.animationPlayState = "running";
        console.log(block.id);
      } else if (
        block.id != startpoint &&
        startpoint &&
        startflag &&
        document.getElementById(block.id).classList.contains("movementblock")
      ) {
        block.classList.remove("movementblock");
        block.classList.add("starterblock");
        block.style.animationPlayState = "running";
        document.getElementById(startpoint).style.animationPlayState = "paused";
        document.getElementById(startpoint).classList.remove("starterblock");
        document.getElementById(startpoint).classList.add("movementblock");
        startpoint = block.id;
        console.log(block.id, startpoint);
      } else if (
        block.id != startpoint &&
        startflag &&
        document.getElementById(block.id).classList.contains("movementblock")
      ) {
        block.classList.remove("movementblock");
        block.classList.add("starterblock");
        block.style.animationPlayState = "running";
        startpoint = block.id;
        console.log(block.id, startpoint);
      } else if (
        block.id != endpoint &&
        endpoint &&
        endflag &&
        document.getElementById(block.id).classList.contains("movementblock")
      ) {
        block.classList.remove("movementblock");
        block.classList.add("enderblock");
        block.style.animationPlayState = "running";
        document.getElementById(endpoint).style.animationPlayState = "paused";
        document.getElementById(endpoint).classList.remove("enderblock");
        document.getElementById(endpoint).classList.add("movementblock");
        endpoint = block.id;
        console.log(block.id, endpoint);
      } else if (
        block.id != endpoint &&
        endflag &&
        document.getElementById(block.id).classList.contains("movementblock")
      ) {
        block.classList.remove("movementblock");
        block.classList.add("enderblock");
        block.style.animationPlayState = "running";
        endpoint = block.id;
        console.log(block.id, endpoint);
      }
    };
    row.appendChild(block);
  }
}
