import {useLoaderData, json, redirect} from "@remix-run/react";
import {getSession} from "../session.server";
import Ranking from "./components/Ranking";

async function updateUserRankingData(userId, newRanking, newChave, newVitorias, token){
  try{
    const updateData={
      Ranking: newRanking,
      Chave: newChave,
      Vitorias: newVitorias
    };

    const response = await fetch(`http://localhost:5042/api/Users/${userId}/ranking`,{
      method: 'PATCH',
    headers:{
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(updateData)
    });

    if(!response.ok){
      throw new Error(`Erro na API: ${response.status} ${response.statusText}`);
    }

    const text = await response.text();
    const updatedUser = text.length ? JSON.parse(text):{};

    console.log(`Usuário ID ${userId} atualizado com sucesso`);
    return updatedUser;
  }catch (error){

    console.error("Erro ao atualizar dados do usuário", error);
    return null;
  }
}

export const loader = async ({ request }) => {
  const session = await getSession(request);
  const currentUser = session.get("currentUser");
  const token = session.get("token");

    const usersResponse = await fetch("http://localhost:5042/api/Users", {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!usersResponse.ok) {
    throw new Response("Erro ao buscar os dados da API", { status: 500 });
  }

  const userList = await usersResponse.json();
  if(!currentUser){
  return redirect("/login");
  }
  if(!currentUser.admin){
return redirect("/splash");
  }

  return  json({currentUser, userList, token});
};

export default function Admin(){
const data = useLoaderData()
const {currentUser, userList, token} = data;
console.log(currentUser);
console.log("Userlist: ", userList);

async function updateRanking(){
  console.log("Como chega do back: ")
userList.forEach((user) => {
  console.log(user.ranking, " - ", user.name)
  
});;
const sortedList = [...userList].sort((a,b) => {
if (a.chave !== b.chave){
return a.chave - b.chave;
}

return b.vitorias - a.vitorias;
});

console.log("Após ordenar por vitórias: ")
sortedList.forEach((user) => {
user.midRanking = sortedList.indexOf(user) + 1;
console.log(user.name, ", ", user.midRanking)
});

console.log("Por fim após organizar interchaves: ")
sortedList.forEach((user) => {
  if(user.midRanking%3 === 0){
    user.midRanking++
    user.chave+=3
  }
  else if(user.midRanking%3 === 1 && user.midRanking !== 1){
    user.midRanking--
    user.chave-=3
  }
console.log("Novo midRanking ", user.midRanking, " - ", user.name);
});

for(const user of sortedList){
  try{
    await updateUserRankingData(user.id, user.midRanking, user.chave, 0, token);
    await new Promise(resolve => setTimeout(resolve, 100));
  }catch(error){
    console.log(`Falha ao atualizar usuário ${user.name}:`, error);
  }
}
console.log("Processo de atualização concluído")

return sortedList
}

    return(
      <div>
        <h1>Bem vindo, {currentUser.name}</h1>
        <button onClick={updateRanking}>Atualizar o ranking</button>
      </div>
  )
    }
      

