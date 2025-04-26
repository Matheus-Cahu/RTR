import userList from "~/data/users";

interface Jogo {
  jogador_1: string;
  jogador_2: string;
  imagem: string;
  jog1_g_1: number;
  jog1_g_2: number;
  jog2_g_1: number;
  jog2_g_2: number;
  vencedor: string;
  data: string;
  horario: string;
  status: "Agendado" | "Finalizado";
  local: string;
}

const jogos: Jogo[] = [
  {
    jogador_1: userList[0].name, // Lucas
    jogador_2: userList[1].name, // Pedro
    imagem: "/images/tennisGameIMGStock.jpg",
    jog1_g_1: 6,
    jog1_g_2: 3,
    jog2_g_1: 4,
    jog2_g_2: 6,
    vencedor: userList[0].name, // Lucas
    data: "2023-10-01",
    horario: "10:00",
    status: "Finalizado",
    local: "Quadra Central",
  },
  {
    jogador_1: userList[2].name, // João
    jogador_2: userList[3].name, // Gustavo
    imagem: "/images/tennisGameIMGStock.jpg",
    jog1_g_1: 7,
    jog1_g_2: 5,
    jog2_g_1: 6,
    jog2_g_2: 7,
    vencedor: userList[2].name, // João
    data: "2023-10-02",
    horario: "14:00",
    status: "Finalizado",
    local: "Quadra 1",
  },
  {
    jogador_1: userList[4].name, // Vitor
    jogador_2: userList[5].name, // Felipe
    imagem: "/images/tennisGameIMGStock.jpg",
    jog1_g_1: 6,
    jog1_g_2: 4,
    jog2_g_1: 7,
    jog2_g_2: 5,
    vencedor: userList[4].name, // Vitor
    data: "2023-10-03",
    horario: "16:30",
    status: "Finalizado",
    local: "Quadra 2",
  },
  {
    jogador_1: userList[6].name, // Thiago
    jogador_2: userList[7].name, // Rafael
    imagem: "/images/tennisGameIMGStock.jpg",
    jog1_g_1: 5,
    jog1_g_2: 6,
    jog2_g_1: 7,
    jog2_g_2: 6,
    vencedor: userList[7].name, // Rafael
    data: "2023-10-04",
    horario: "18:00",
    status: "Finalizado",
    local: "Quadra Central",
  },
  {
    jogador_1: userList[8].name, // Bruno
    jogador_2: userList[0].name, // Lucas
    imagem: "/images/tennisGameIMGStock.jpg",
    jog1_g_1: 6,
    jog1_g_2: 7,
    jog2_g_1: 5,
    jog2_g_2: 6,
    vencedor: userList[0].name, // Lucas
    data: "2023-10-05",
    horario: "09:00",
    status: "Agendado",
    local: "Quadra 3",
  },
];

export default jogos;