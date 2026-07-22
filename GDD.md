# GAME DESIGN DOCUMENT
## Quatro Contra o Mundo
**Versão:** 1.0  
**Data:** Julho 2026  
**Status:** Em Desenvolvimento — Vertical Slice

---

## 1. VISÃO GERAL

### Conceito
**Quatro Contra o Mundo** é um RPG de aventura 2D em pixel art onde quatro irmãos atravessam um portal mágico e chegam a um mundo que teve todas as suas cores roubadas pela Sombra Desbotada. A missão é percorrer dez regiões, derrotar os guardiões corrompidos e devolver as cores ao mundo — uma fase de cada vez.

### Gênero
RPG de ação e exploração 2D com mecânica de troca de personagens em tempo real.

### Plataforma
PC (alvo inicial). Possível expansão futura para mobile.

### Público-alvo
Famílias, crianças e jogadores casuais de RPG. Classificação livre.

### Inspirações Visuais
- Pokémon (Ruby/Sapphire/Emerald, X/Y, Scarlet/Violet)
- Zelda: The Minish Cap
- Golden Sun
- Stardew Valley (cenários externos)

### Pitch em uma linha
*Quatro irmãos. Um mundo sem cor. Cada um tem um poder. Juntos, são invencíveis.*

---

## 2. HISTÓRIA

### Prólogo — "A História Antes de Dormir"
Uma noite comum. A família está reunida na sala. O pai está sentado no sofá com as quatro crianças ao redor.

**Manu** olha para o pai e pergunta:
> *"Papai... é difícil criar uma aventura de verdade?"*

O pai sorri e responde que toda grande aventura começa quando alguém decide dar o primeiro passo.

Mais tarde, enquanto a casa dorme, o cristal rosa da Ana Luísa começa a pulsar. Uma luz suave aumenta. Um portal mágico se abre silenciosamente na sala. Curiosos e de mãos dadas, os quatro irmãos atravessam o portal.

Tela branca.

Eles caem.

A música para.

**Tudo é cinza.**

### O Mundo Desbotado
O Vilarejo do Alvorecer — e todo o reino além dele — foi atacado pela **Sombra Desbotada**, uma entidade que consome cores, energia e alegria de tudo que toca. Cada região do mundo perdeu sua cor característica e caiu sob o domínio de um guardião corrompido.

Os irmãos são os únicos que podem restaurar as cores, pois chegaram de fora — e o cristal da Ana Luísa responde à Sombra.

### Final (sem spoilers detalhados)
Após derrotar o último chefe, os irmãos voltam pelo portal. A câmera corta para a sala. O pai termina de contar a história. As crianças dizem:
> *"Essa foi a melhor aventura de todas."*

Quando todos dormem, a câmera se aproxima da estante. O cristal rosa da Ana Luísa volta a brilhar.

Tela preta.

> *"Fim?"*

---

## 3. PERSONAGENS

### 3.1 Ana Luísa — A Maga
| Atributo | Valor |
|---|---|
| Idade | 12 anos |
| Classe | Maga |
| Função | Suporte |
| Especialidade | Magia / Liderença |
| Habilidade | Magia |
| Cor | Rosa |

**Aparência (nova ficha):**
Cabelo castanho longo solto com laço rosa. Roupa rosa com detalhes dourados e cinto marrom. Carrega um cajado com cristal rosa no topo. Expressão serena e confiante.

**Personalidade:**
A irmã mais velha e líder natural do grupo. Inteligente, paciente e muito observadora. Costuma pensar antes de agir e sempre procura uma solução que evite conflitos desnecessários. Seu maior talento é transformar conhecimento em poder.

**História:**
Desde pequena demonstrou uma ligação incomum com a magia dos cristais. Durante uma expedição com a família, encontrou um cristal rosa que passou a responder apenas ao seu toque. Seu cajado canaliza essa energia, permitindo criar escudos, iluminar lugares escuros e lançar feitiços que revelam passagens escondidas.

**Habilidades em jogo:**
- ✨ Magia de Cristal (ataque mágico à distância)
- 🛡 Escudo Arcano (protege o grupo)
- 💖 Cura
- 🔍 Revelar segredos e passagens ocultas
- 📖 Resolver enigmas e runas

**Animações disponíveis (sprite sheet):**
Parada · Olhando · Investigando · Usando Magia · Interagindo · Comemorando  
Expressões: Neutra · Sorrindo · Feliz · Surpresa · Pensativa · Determinada · Preocupada · Piscando

---

### 3.2 Manuella (Manu) — A Guerreira
| Atributo | Valor |
|---|---|
| Idade | 10 anos |
| Classe | Guerreira |
| Função | Combate |
| Especialidade | Ataque / Defesa |
| Habilidade | Força |
| Cor | Roxo |

**Aparência (nova ficha):**
Cabelo castanho preso em rabo de cavalo alto com mecha roxa. Armadura escura com capa roxa e detalhes dourados. Empunha uma espada. Expressão determinada e ágil.

**Personalidade:**
Corajosa, determinada e extremamente protetora. Nunca deixa um irmão enfrentar um perigo sozinho. Prefere agir primeiro e pensar depois — o que frequentemente rende situações engraçadas e sermões da Ana Luísa. Por trás da aparência séria existe uma menina divertida que faria qualquer coisa pela família.

**Habilidades em jogo:**
- ⚔ Golpe Giratório (ataque em área)
- 🛡 Defendendo (bloqueia dano com escudo)
- 💨 Investida (avança rapidamente)
- 💪 Ataques corpo a corpo
- 🛡 Proteger aliados (absorve dano direcionado a outro personagem)

**Animações disponíveis (sprite sheet):**
Parada · Preparada · Atacando · Defendendo · Golpe Giratório · Pulando · Vitória · Dançando  
Expressões: Neutra · Sorrindo · Feliz · Surpresa · Brava · Determinada · Pensativa · Confiante

---

### 3.3 Valentim — O Explorador
| Atributo | Valor |
|---|---|
| Idade | 6 anos |
| Classe | Explorador |
| Função | Reconhecimento |
| Especialidade | Reconhecimento |
| Habilidade | Velocidade |
| Cor | Vermelho |

**Aparência (nova ficha):**
Cabelo castanho curto e bagunçado. Roupa vermelha escura com capuz, cinto de couro e bolsas. Carrega arco e flechas nas costas. O menor do grupo mas com postura confiante.

**Personalidade:**
Curioso, alegre e extremamente corajoso. O caçula da família e um verdadeiro furacão de energia. Vive procurando passagens secretas, escalando árvores e descobrindo lugares que ninguém imaginava existir. Mesmo sendo o menor do grupo, nunca aceita ficar para trás. Seu entusiasmo contagia os irmãos.

**Habilidades em jogo:**
- 🏹 Tiro preciso (ataque à distância com arco)
- 🧗 Escalar paredes
- 🪝 Usar gancho
- 🗺 Descobrir passagens secretas
- 🏃 Corrida rápida / Rolando

**Animações disponíveis (sprite sheet):**
Parado · Preparado · Atacando · Rolando · Saltando · Escalando · Observando · Apontando  
Expressões: Neutro · Sorrindo · Feliz · Surpreso · Determinado · Pensativo · Confiante · Cuidoso

---

### 3.4 Miguel — O Inventor
| Atributo | Valor |
|---|---|
| Idade | 10 anos |
| Classe | Inventor |
| Função | Suporte / Inventor |
| Especialidade | Tecnologia |
| Habilidade | Criação |
| Cor | Preto |

**Aparência (nova ficha):**
Cabelo castanho escuro e despenteado. Roupa preta estilo steampunk com bolsas e correias de couro. Óculos estilo goggles de proteção. Carrega mochila com engrenagens e ferramentas na costas.

**Personalidade:**
Curioso, criativo e incrivelmente inteligente para sua idade. Está sempre imaginando novas invenções e procurando maneiras de facilitar a vida dos irmãos. É míope e usa os óculos/goggles praticamente o tempo todo. Sem eles, enxerga tudo desfocado — mas isso nunca diminuiu sua criatividade. É comum vê-lo caminhando distraído enquanto pensa em alguma invenção revolucionária.

> *"Se ainda não existe... eu pode inventar."*

**Habilidades em jogo:**
- ⚙ Construir dispositivos
- 🔧 Consertar mecanismos e máquinas antigas
- 💡 Resolver problemas técnicos
- 📦 Criar equipamentos e ferramentas
- 🧲 Ativar painéis e engrenagens

**Animações disponíveis (sprite sheet):**
Parado · Usando Ferramenta · Concertando · Criando Dispositivo · Analisando · Ideia! · Comemorando · Coletando  
Expressões: Neutro · Sorrindo · Feliz · Surpreso · Pensativo · Curioso · Determinado · Triste

---

## 4. MECÂNICAS DE JOGO

### 4.1 Troca de Personagens (Character Swapping)
O jogador controla o grupo mas assume o comando de um personagem por vez. A troca é instantânea com **L1 / R1** (gamepad) ou **TAB** (teclado).

```
         [ TROCA INSTANTÂNEA ]
                  │
  ┌───────────────┼───────────────┐
  ▼               ▼               ▼               ▼
Ana Luísa      Manuella       Valentim         Miguel
Magia/Runas   Combate/Força  Gancho/Escalada  Máquinas/Painéis
Cura/Luz      Defesa Total   Passagens        Engenhocas
```

**Princípio central:** Cada obstáculo foi projetado para exigir a habilidade do irmão certo. O jogador pensa, troca, age.

**Exemplo de sequência na Fase 1:**
1. **Miguel** conserta o mecanismo de uma ponte quebrada
2. **Valentim** escala a parede e abre o portão por dentro
3. **Manu** combate as criaturas que emboscam o grupo
4. **Ana Luísa** usa o cristal no altar para restaurar as cores da área

### 4.2 Sistema de Combate
- Combate em tempo real, com ataques básicos e habilidades especiais
- Cada personagem tem seu estilo único (corpo a corpo, distância, magia, suporte)
- Inimigos têm pontos fracos específicos a determinadas habilidades
- Manu é a principal combatente; os outros podem se defender mas não são especializados

### 4.3 Sistema de Puzzles
Puzzles integrados ao cenário, resolvidos usando as habilidades específicas dos personagens. Nunca são bloqueados por menus — fazem parte da exploração natural do mapa.

### 4.4 Mapa-Múndi e Progressão Visual
O mapa começa completamente cinza. A cada fase concluída, uma mancha de cor vibrante cobre a região salva. O próprio mapa conta a história do progresso:

```
Início:     ██████████  (tudo cinza)
Fase 1:     🟨█████████  (amarelo dourado)
Fase 2:     🟨🟩████████  (verde vivo)
...
Final:      🌈🌈🌈🌈🌈🌈  (prisma completo)
```

### 4.5 Fator Replay — Revisitar Fases
Habilidades desbloqueadas mais tarde (gancho melhorado, novas engenhocas) abrem áreas secretas nas fases anteriores, incentivando a exploração completa após avançar no jogo.

---

## 5. MUNDO E FASES

### Parte 1 — O Resgate do Reino Familiar (Fases 1–5)

| # | Nome | Ambientação | Cor Resgatada | Personagens em Destaque |
|---|------|-------------|---------------|-------------------------|
| 1 | **Vilarejo do Alvorecer** | Casas de madeira, moinhos e colinas de trigo | Amarelo Dourado | Todos (tutorial) |
| 2 | **Floresta Sussurrante** | Floresta densa, árvores gigantes, pontes suspensas | Verde Vivo | Valentim · Miguel |
| 3 | **Ruínas do Vapor** | Cidade subterrânea com engrenagens e tubulações | Laranja Bronze | Miguel · Ana Luísa |
| 4 | **Picos Espirais** | Montanhas geladas, vales nevados, pontes de gelo | Azul Celeste | Valentim · Miguel |
| 5 | **Vale dos Cristais** | Cavernas iluminadas por pedras preciosas gigantes | Rosa Magenta | Ana Luísa |

### Parte 2 — Além do Véu da Sombra (Fases 6–10)

| # | Nome | Ambientação | Cor Resgatada | Personagens em Destaque |
|---|------|-------------|---------------|-------------------------|
| 6 | **Pântano das Brumas** | Lagoas místicas, cogumelos gigantes, névoa | Roxo Profundo | Manu · Ana Luísa |
| 7 | **Abismo Escarlate** | Cânions de terra vermelha, ruínas de vulcão | Vermelho Vivo | Manu · Valentim |
| 8 | **Deserto do Tempo** | Dunas de areia prateada, oásis ocultos, ampulhetas | Dourado Claro | Miguel |
| 9 | **Cidade Flutuante de Aethel** | Ilhas no céu ligadas por pontes de energia | Prata / Turquesa | Todos (combate quádruplo) |
| 10 | **O Vazio Imortal** | Castelo distorcido em preto e branco | O Prisma Completo | Todos (confronto final) |

---

## 6. INIMIGOS

### 6.1 Inimigos Comuns — Fase 1 (Vilarejo do Alvorecer)

**Espectros de Cinza**
Pequenas criaturas feitas de poeira e fuligem. Rápidas mas fracas. Derrotadas com um único Golpe Giratório da Manu.

**Javali Desbotado**
Animais da região corrompidos pela Sombra. Investem em linha reta.
- Contra: Manu usa Defesa Total para fazê-los tontear, ou Valentim usa Tiro Preciso de longe.

**Sentinela Opaca**
Estátuas de pedra que ganharam vida. Casca dura, bloqueiam ataques diretos.
- Contra: Ana Luísa usa magia no cristal da sentinela para expor o ponto fraco, ou Miguel usa dispositivo magnético.

### 6.2 Primeiro Chefe — O Espantalho Cinzento

**Localização:** Campo de trigo do Vilarejo (ao final da Fase 1)  
**Descrição:** O antigo espantalho do vilarejo foi possuído pela Sombra Desbotada e se transformou em uma criatura gigante de palha cinzenta e ramos secos.

**Batalha em 4 Fases:**

```
         [ O ESPANTALHO CINZENTO ]
                    │
  ┌─────────────────┼─────────────────┐
  ▼                 ▼                 ▼                 ▼
FASE 1           FASE 2            FASE 3            FINAL
Manu segura      Valentim sobe     Miguel ativa      Ana purifica
invocação de     e corta as        o catavento       com o Cristal
inimigos menores cordas do chefe   para dissipar     Rosa
                                   a poeira negra
```

**Recompensa:** Explosão de cores — céu azul, campo amarelo vibrante, borboletas aparecem. O Vilarejo do Alvorecer está salvo.

---

## 7. TRILHA SONORA

Cada região tem identidade musical própria:

| Região | Instrumentação |
|--------|---------------|
| Vilarejo do Alvorecer | Flauta e violão, tom acolhedor |
| Floresta Sussurrante | Madeiras, sons de natureza |
| Ruínas do Vapor | Percussão metálica, acordeão |
| Picos Espirais | Piano e sinos de cristal |
| Vale dos Cristais | Harpa e cordas suaves |
| Pântano das Brumas | Baixo profundo, sons etéreos |
| Abismo Escarlate | Tambores intensos e percussão |
| Deserto do Tempo | Instrumentos de sopro do oriente |
| Cidade Flutuante | Sintetizadores e arpejos |
| Vazio Imortal | Coro e sintetizadores sombrios |

---

## 8. DIREÇÃO DE ARTE

### Estilo Visual
- **Pixel Art** 32×32 pixels por sprite
- Sprite sheets organizadas por personagem
- Sombras suaves e cores vibrantes
- Inspiração em GBA (Golden Sun, Zelda: Minish Cap) e SNES
- Os quatro personagens têm traços faciais semelhantes para transmitir que são irmãos

### Paletas de Cores (por personagem)

| Personagem | Cor Principal | Destaque |
|------------|---------------|---------|
| Ana Luísa | Rosa | Dourado / Lilás |
| Manuella | Roxo Escuro | Dourado / Cinza |
| Valentim | Vermelho Escuro | Marrom / Cobre |
| Miguel | Preto | Dourado / Laranja |

### Contraste Narrativo
O mundo começa **cinza e sem vida**. Os irmãos são os únicos pontos de cor na tela — seus figurinos vibrantes criam contraste imediato com o ambiente. Conforme as cores são restauradas, o mundo ao redor começa a pulsar com vida.

---

## 9. INTERFACE (UI/UX)

### HUD
- Retratos dos quatro personagens no canto — o ativo fica iluminado
- Barra de vida simples por personagem
- Ícone de habilidade especial com cooldown
- Minimapa no canto oposto

### Menu Principal
```
         [câmera: quatro irmãos de costas, montanha ao fundo]
                    QUATRO CONTRA O MUNDO

                      ▶ Novo Jogo
                        Continuar
                        Configurações
                        Créditos
                        Sair
```
Design limpo. Nada além do essencial.

### Filosofia de Tutorial
Sem caixas de texto gigantes. Aprender jogando. Cada mecânica é apresentada por um obstáculo natural que exige seu uso — o irmão comenta brevemente o que precisa ser feito e o jogador descobre como.

---

## 10. VERTICAL SLICE — PLANO DE EXECUÇÃO

### Objetivo
Demonstrar a experiência completa do jogo em **20 a 30 minutos**, cobrindo:
- Cinemática inicial
- Apresentação dos quatro irmãos
- Mecânica de troca de personagem
- Puzzles (um por personagem)
- Combate básico
- Enfrentamento do primeiro chefe
- Restauração das cores do mapa

### Fluxo Completo

```
MENU → PRÓLOGO → PORTAL → VILAREJO DO ALVORECER
  → Tutorial (mover/pular/interagir/trocar)
  → Puzzle 1: Miguel conserta a ponte
  → Combate: Manu vs Espectros
  → Puzzle 2: Valentim escala e abre o portão
  → Puzzle 3: Ana Luísa ilumina sala com cristal
  → Mini exploração (NPCs, baús, segredos)
  → Campo do chefe (espantalho)
  → Batalha em 4 fases
  → Restauração das cores (cinemática)
  → Ancião entrega mapa
  → FIM DA DEMO
```

### Etapas de Desenvolvimento

| # | Etapa | Descrição |
|---|-------|-----------|
| 1 | **GDD** | ✅ Este documento |
| 2 | **Direção de Arte** | Paleta, tilesets, personagens, inimigos, UI |
| 3 | **Gameplay Core** | Movimento, colisão, troca de personagens, combate, puzzles |
| 4 | **Fase 1 Completa** | Layout, NPCs, itens, áreas secretas, Vilarejo do Alvorecer |
| 5 | **Chefe** | IA, padrões de ataque, transições de fase, cinemática final |
| 6 | **Áudio** | Trilha, efeitos sonoros, sons ambientes |

---

## 11. ARQUIVOS DO PROJETO

### Estrutura de Pastas
```
quatro_contra_o_mundo/
├── Ana luisa/          ← sprites e referências da Ana Luísa
├── Manu/               ← sprites e referências da Manuella
├── Miguel/             ← sprites e referências do Miguel
├── Valemtin/           ← sprites e referências do Valentim
├── Arvores/            ← assets de vegetação
├── mundos/             ← tilesets e mapas
├── src/
│   └── game.js         ← código principal
├── index.html          ← entrada do jogo
└── GDD.md              ← este documento
```

---

*Quatro Contra o Mundo — um projeto de família.*  
*Criado por Wagner Pessoa junto com Ana Luísa, Manuella, Valentim e Miguel.*
