const TILE_SIZE = 64;
const PLAYER_SCALE = 0.4; // personagem pequeno em relação à tela, estilo GBA
const SPAWN_OFFSET = TILE_SIZE; // onde o personagem aparece ao entrar num mapa novo (1 tile da borda)
const MOVE_DURATION = 600; // ms pra andar 1 tile — movimento em grade, estilo Pokémon GBA
const JUMP_DURATION = 420; // ms
const JUMP_HEIGHT = 22; // px de deslocamento visual no pico do pulo

// "full": arte própria para as 4 direções (front/back/left/right), cada uma com sua contagem de frames de walk.
//   OBS: os arquivos exportados como "ana_left_*"/"manu_left_*" na verdade retratam o personagem virado
//   pra DIREITA (e os "*_right_*" pra ESQUERDA) — nomes trocados na exportação. Por isso os caminhos abaixo
//   estão invertidos em relação ao nome do arquivo: a chave "left_*" aponta pro arquivo "*_right_*" e vice-versa,
//   pra a arte carregada bater com a direção real.
// "side": só existe pose de frente, de costas e de perfil (side) — perfil olha pra DIREITA por padrão,
//   e é espelhado (flipX) pra cobrir a esquerda.
const CHARACTERS = [
  {
    id: "ana",
    label: "Ana Luisa",
    kind: "full",
    walkCounts: { front: 3, back: 3, left: 3, right: 2 },
    textures: {
      front_idle: "Ana luisa/ana_front_ide.png",
      front_walk1: "Ana luisa/ana_front_walk1.png",
      front_walk2: "Ana luisa/ana_front_walk2.png",
      front_walk3: "Ana luisa/ana_front_walk3.png",
      back_idle: "Ana luisa/ana_back_ide.png",
      back_walk1: "Ana luisa/ana_back_walk1.png",
      back_walk2: "Ana luisa/ana_back_walk2.png",
      back_walk3: "Ana luisa/ana_back_walk3.png",
      left_idle: "Ana luisa/ana_right_ide.png",
      left_walk1: "Ana luisa/ana_right_walk1.png",
      left_walk2: "Ana luisa/ana_right_walk2.png",
      left_walk3: "Ana luisa/ana_right_walk3.png",
      right_idle: "Ana luisa/ana_left_ide.png",
      right_walk1: "Ana luisa/ana_left_walk1.png",
      right_walk2: "Ana luisa/ana_left_walk2.png"
    }
  },
  {
    id: "manu",
    label: "Manu",
    kind: "full",
    walkCounts: { front: 3, back: 3, left: 3, right: 3 },
    textures: {
      front_idle: "Manu/frames/manu_front_idle.png",
      front_walk1: "Manu/frames/manu_front_walk1.png",
      front_walk2: "Manu/frames/manu_front_walk2.png",
      front_walk3: "Manu/frames/manu_front_walk3.png",
      back_idle: "Manu/frames/manu_back_idle.png",
      back_walk1: "Manu/frames/manu_back_walk1.png",
      back_walk2: "Manu/frames/manu_back_walk2.png",
      back_walk3: "Manu/frames/manu_back_walk3.png",
      left_idle: "Manu/frames/manu_right_idle.png",
      left_walk1: "Manu/frames/manu_right_walk1.png",
      left_walk2: "Manu/frames/manu_right_walk2.png",
      left_walk3: "Manu/frames/manu_right_walk3.png",
      right_idle: "Manu/frames/manu_left_idle.png",
      right_walk1: "Manu/frames/manu_left_walk1.png",
      right_walk2: "Manu/frames/manu_left_walk2.png",
      right_walk3: "Manu/frames/manu_left_walk3.png"
    }
  },
  {
    id: "miguel",
    label: "Miguel",
    kind: "side",
    textures: {
      front_idle: "Miguel/frames/miguel_front_idle.png",
      back_idle: "Miguel/frames/miguel_back_idle.png",
      side_idle: "Miguel/frames/miguel_side_idle.png",
      side_walk1: "Miguel/frames/miguel_side_walk1.png",
      side_walk2: "Miguel/frames/miguel_side_walk2.png",
      side_walk3: "Miguel/frames/miguel_side_walk3.png",
      jump: "Miguel/frames/miguel_front_jump.png"
    }
  },
  {
    id: "valentim",
    label: "Valentim",
    kind: "side",
    textures: {
      front_idle: "Valemtin/frames/valentim_front_idle.png",
      back_idle: "Valemtin/frames/valentim_back_idle.png",
      side_idle: "Valemtin/frames/valentim_side_idle.png",
      side_walk1: "Valemtin/frames/valentim_side_walk1.png",
      side_walk2: "Valemtin/frames/valentim_side_walk2.png",
      side_walk3: "Valemtin/frames/valentim_side_walk3.png",
      jump: "Valemtin/frames/valentim_front_jump.png"
    }
  }
];

function snapToGrid(v) {
  return Math.round(v / TILE_SIZE) * TILE_SIZE;
}

// ground: "grass" ou "sand" — usado só quando a cena não tem backgroundImage.
// Textura procedural com seed fixa (mesma semente = mesmo resultado sempre, não fica
// sorteando de novo a cada load).
function drawGround(scene, width, height, ground) {
  const isGrass = ground === "grass";
  const g = scene.add.graphics();
  g.fillStyle(isGrass ? 0x3a5c3a : 0xc2a15c, 1);
  g.fillRect(0, 0, width, height);

  const rng = new Phaser.Math.RandomDataGenerator([ground, String(width), String(height)]);
  const detailColor = isGrass ? 0x2f4d2f : 0xd9bd85;
  const count = Math.floor((width * height) / 850);
  for (let i = 0; i < count; i++) {
    const x = rng.between(0, width);
    const y = rng.between(0, height);
    if (isGrass) {
      g.lineStyle(2, detailColor, 0.5);
      g.lineBetween(x, y, x, y - 6);
    } else {
      g.fillStyle(detailColor, 0.5);
      g.fillCircle(x, y, rng.between(1, 3));
    }
  }

  g.lineStyle(1, 0xffffff, 0.08);
  for (let x = 0; x <= width; x += TILE_SIZE) g.lineBetween(x, 0, x, height);
  for (let y = 0; y <= height; y += TILE_SIZE) g.lineBetween(0, y, width, y);
  g.setDepth(-1);
}

function drawRock(scene, x, y) {
  const g = scene.add.graphics();
  g.fillStyle(0x8a7862, 1);
  g.lineStyle(2, 0x4d4235, 0.8);
  const pts = [
    [x - 17, y + 11], [x - 19, y - 4], [x - 7, y - 17], [x + 11, y - 15],
    [x + 19, y - 2], [x + 15, y + 13], [x - 2, y + 17]
  ];
  g.beginPath();
  g.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]);
  g.closePath();
  g.fillPath();
  g.strokePath();
  g.fillStyle(0xb0a48c, 0.5);
  g.fillEllipse(x - 4, y - 4, 11, 7);
}

// "none": usado em cenas com fundo estático (imagem já desenha o obstáculo) — só bloqueia
// o tile pra colisão, sem desenhar nada por cima.
const OBSTACLE_DRAWERS = { rock: drawRock, none: () => {} };

// desenha obstáculos nas tiles indicadas ([tx, ty, tipo]) e devolve o Set de tiles
// bloqueadas ("tx,ty") usado pela checagem de colisão do jogador.
// IMPORTANTE: o jogador fica em x=tx*TILE_SIZE (sem +meia-tile) — os obstáculos têm que
// usar a mesma convenção, senão o obstáculo parece "flutuar" meia tile adiante da posição
// real, dando a impressão de uma tile vazia sobrando entre o jogador e o obstáculo.
function spawnObstacles(scene, tiles) {
  const blocked = new Set();
  tiles.forEach(([tx, ty, type]) => {
    blocked.add(`${tx},${ty}`);
    OBSTACLE_DRAWERS[type](scene, tx * TILE_SIZE, ty * TILE_SIZE);
  });
  return blocked;
}

// gera um bloco retangular (inclusive) de tiles bloqueados do mesmo tipo — usado pras
// áreas grandes e intransponíveis do Vale (borda de floresta densa, ravina) em vez de
// listar tile por tile.
function rectTiles(x0, y0, x1, y1, type) {
  const tiles = [];
  for (let tx = x0; tx <= x1; tx++) {
    for (let ty = y0; ty <= y1; ty++) {
      tiles.push([tx, ty, type]);
    }
  }
  return tiles;
}

function preloadCharacter(scene, def) {
  Object.entries(def.textures).forEach(([key, path]) => {
    scene.load.image(`${def.id}_${key}`, path);
  });
}

// frameRate calculado a partir do MOVE_DURATION: 1 ciclo de animação = 1 tile andado,
// então os passos da animação acompanham a velocidade real do personagem (se mudar
// MOVE_DURATION, a animação se ajusta sozinha, sem precisar mexer aqui também).
function walkFrameRate(frameCount) {
  return frameCount / (MOVE_DURATION / 1000);
}

function createCharacterAnims(scene, def) {
  if (def.kind === "full") {
    ["front", "back", "left", "right"].forEach((dir) => {
      const frames = [];
      for (let i = 1; i <= def.walkCounts[dir]; i++) {
        frames.push({ key: `${def.id}_${dir}_walk${i}` });
      }
      scene.anims.create({ key: `${def.id}-walk-${dir}`, frames, frameRate: walkFrameRate(frames.length), repeat: -1 });
    });
  } else {
    const frames = [1, 2, 3].map((i) => ({ key: `${def.id}_side_walk${i}` }));
    scene.anims.create({ key: `${def.id}-walk-side`, frames, frameRate: walkFrameRate(frames.length), repeat: -1 });
  }
}

function idleTextureKey(def, facing) {
  if (def.kind === "full") return `${def.id}_${facing}_idle`;
  if (facing === "front" || facing === "back") return `${def.id}_${facing}_idle`;
  return `${def.id}_side_idle`;
}

function walkAnimKey(def, facing) {
  if (def.kind === "full") return `${def.id}-walk-${facing}`;
  if (facing === "left" || facing === "right") return `${def.id}-walk-side`;
  return null;
}

function isFlipped(def, facing) {
  // a arte "side" do Miguel/Valentim olha pra DIREITA por padrão, então espelha pra esquerda.
  return def.kind === "side" && facing === "left";
}

class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    CHARACTERS.forEach((def) => preloadCharacter(this, def));
    this.load.image("vale_bg", "mundos/Vale-do-eco-verde.png");
    this.load.image("praia_bg", "mundos/praia-eco-brisa.png");
  }

  create() {
    CHARACTERS.forEach((def) => createCharacterAnims(this, def));
    this.scene.start("ValeDoEcoVerde");
  }
}

class BiomeScene extends Phaser.Scene {
  constructor(key, opts) {
    super(key);
    this.worldWidth = opts.worldWidth;
    this.worldHeight = opts.worldHeight;
    this.ground = opts.ground; // "grass" | "sand" — ignorado se backgroundImage for definido
    this.backgroundImage = opts.backgroundImage || null; // chave de textura pra fundo estático (cena pintada inteira)
    this.exits = opts.exits; // { right: 'OutraCena', left: ..., top: ..., bottom: ... }
    this.obstacleTiles = opts.obstacleTiles || []; // [tx, ty, "rock"|"none"]
    this.spawnOverride = opts.spawnOverride || null; // { left/right/top/bottom: {x, y, facing} } — ponto de entrada fixo, ignora a posição de saída da cena anterior
  }

  create(data) {
    if (this.backgroundImage) {
      this.add.image(0, 0, this.backgroundImage).setOrigin(0, 0).setDepth(-1);
    } else {
      drawGround(this, this.worldWidth, this.worldHeight, this.ground);
    }
    this.blockedTiles = spawnObstacles(this, this.obstacleTiles);

    this.charIndex = data && data.charIndex !== undefined ? data.charIndex : 0;

    const spawn = this.computeSpawn(data);
    this.facing = spawn.facing;
    this.isMoving = false;
    this.moveElapsed = 0;
    this.moveFrom = { x: spawn.x, y: spawn.y };
    this.moveTo = { x: spawn.x, y: spawn.y };

    this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);

    this.isJumping = false;
    this.jumpElapsed = 0;
    this.shadow = this.add.ellipse(spawn.x, spawn.y + 14, 26, 10, 0x000000, 0.35);

    this.spawnPlayer(spawn.x, spawn.y);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.switchKey = this.input.keyboard.addKey("C");
    this.jumpKey = this.input.keyboard.addKey("SPACE");

    this.label = this.add
      .text(10, 10, "", { fontFamily: "monospace", fontSize: "16px", color: "#ffffff", backgroundColor: "#000000aa", padding: { x: 6, y: 4 } })
      .setScrollFactor(0)
      .setDepth(1000);
    this.updateLabel();
  }

  spawnPlayer(x, y) {
    const def = CHARACTERS[this.charIndex];
    const texKey = idleTextureKey(def, this.facing);
    this.player = this.add.sprite(x, y, texKey).setScale(PLAYER_SCALE);
    this.player.setFlipX(isFlipped(def, this.facing));
    this.cameras.main.startFollow(this.player, true, 0.15, 0.15);
  }

  switchCharacter() {
    this.charIndex = (this.charIndex + 1) % CHARACTERS.length;
    const x = this.player.x;
    const y = this.player.y + (this.isJumping ? Math.sin(Math.min(this.jumpElapsed / JUMP_DURATION, 1) * Math.PI) * JUMP_HEIGHT : 0);
    this.isJumping = false;
    this.jumpElapsed = 0;
    this.player.destroy();
    this.spawnPlayer(x, y);
    this.updateLabel();
  }

  updateLabel() {
    const def = CHARACTERS[this.charIndex];
    this.label.setText(`Personagem: ${def.label} (C para trocar)`);
  }

  computeSpawn(data) {
    if (!data || !data.enterFrom) {
      return { x: snapToGrid(this.worldWidth / 2), y: snapToGrid(this.worldHeight / 2), facing: "front" };
    }
    if (this.spawnOverride && this.spawnOverride[data.enterFrom]) {
      return this.spawnOverride[data.enterFrom];
    }
    switch (data.enterFrom) {
      case "left":
        return { x: SPAWN_OFFSET, y: snapToGrid(data.y), facing: "right" };
      case "right":
        return { x: this.worldWidth - SPAWN_OFFSET, y: snapToGrid(data.y), facing: "left" };
      case "top":
        return { x: snapToGrid(data.x), y: SPAWN_OFFSET, facing: "front" };
      case "bottom":
        return { x: snapToGrid(data.x), y: this.worldHeight - SPAWN_OFFSET, facing: "back" };
    }
  }

  readDirection() {
    const c = this.cursors;
    if (c.up.isDown) return { dx: 0, dy: -1, facing: "back" };
    if (c.down.isDown) return { dx: 0, dy: 1, facing: "front" };
    if (c.left.isDown) return { dx: -1, dy: 0, facing: "left" };
    if (c.right.isDown) return { dx: 1, dy: 0, facing: "right" };
    return null;
  }

  isTileBlocked(x, y) {
    return this.blockedTiles.has(`${x / TILE_SIZE},${y / TILE_SIZE}`);
  }

  update(time, delta) {
    const def = CHARACTERS[this.charIndex];

    if (!this.isMoving) {
      const dir = this.readDirection();
      if (dir) {
        this.facing = dir.facing;
        const targetX = Phaser.Math.Clamp(this.player.x + dir.dx * TILE_SIZE, 0, this.worldWidth);
        const targetY = Phaser.Math.Clamp(this.player.y + dir.dy * TILE_SIZE, 0, this.worldHeight);
        const moved = targetX !== this.player.x || targetY !== this.player.y;
        if (moved && !this.isTileBlocked(targetX, targetY)) {
          this.moveFrom = { x: this.player.x, y: this.player.y };
          this.moveTo = { x: targetX, y: targetY };
          this.moveElapsed = 0;
          this.isMoving = true;
        }
      }
    }

    this.player.setFlipX(isFlipped(def, this.facing));

    if (this.isMoving) {
      this.moveElapsed += delta;
      const t = Phaser.Math.Clamp(this.moveElapsed / MOVE_DURATION, 0, 1);
      this.player.x = Phaser.Math.Linear(this.moveFrom.x, this.moveTo.x, t);
      this.player.y = Phaser.Math.Linear(this.moveFrom.y, this.moveTo.y, t);

      const animKey = walkAnimKey(def, this.facing);
      if (animKey) this.player.anims.play(animKey, true);

      if (t >= 1) {
        this.player.setPosition(this.moveTo.x, this.moveTo.y);
        this.isMoving = false;
        this.player.anims.stop();
        this.player.setTexture(idleTextureKey(def, this.facing));
        this.checkExits();
      }
    } else {
      this.player.anims.stop();
      this.player.setTexture(idleTextureKey(def, this.facing));
    }

    if (Phaser.Input.Keyboard.JustDown(this.jumpKey) && !this.isJumping) {
      this.isJumping = true;
      this.jumpElapsed = 0;
    }

    if (this.isJumping) {
      this.jumpElapsed += delta;
      const progress = Phaser.Math.Clamp(this.jumpElapsed / JUMP_DURATION, 0, 1);
      const offset = Math.sin(progress * Math.PI) * JUMP_HEIGHT;

      if (def.textures.jump) {
        this.player.anims.stop();
        this.player.setTexture(`${def.id}_jump`);
        this.player.setFlipX(false);
      }

      const groundY = this.player.y;
      this.player.y = groundY - offset;
      this.shadow.setPosition(this.player.x, groundY + 14);
      this.shadow.setScale(1 - progress * 0.4);
      this.shadow.setAlpha(0.35 - progress * 0.2);

      if (progress >= 1) {
        this.isJumping = false;
        this.jumpElapsed = 0;
      }
    } else {
      this.shadow.setPosition(this.player.x, this.player.y + 14);
      this.shadow.setScale(1);
      this.shadow.setAlpha(0.35);
    }

    if (Phaser.Input.Keyboard.JustDown(this.switchKey)) {
      this.switchCharacter();
    }
  }

  checkExits() {
    const p = this.player;
    const charIndex = this.charIndex;
    if (this.exits.right && p.x >= this.worldWidth) {
      this.scene.start(this.exits.right, { enterFrom: "left", y: p.y, charIndex });
    } else if (this.exits.left && p.x <= 0) {
      this.scene.start(this.exits.left, { enterFrom: "right", y: p.y, charIndex });
    } else if (this.exits.bottom && p.y >= this.worldHeight) {
      this.scene.start(this.exits.bottom, { enterFrom: "top", x: p.x, charIndex });
    } else if (this.exits.top && p.y <= 0) {
      this.scene.start(this.exits.top, { enterFrom: "bottom", x: p.x, charIndex });
    }
  }
}

// Vale do Eco Verde: fundo é uma cena inteira pré-pintada (Vale-do-eco-verde.png, 2816x1536 =
// exatamente 44x24 tiles), não terreno procedural. Os obstáculos abaixo são só colisão
// ("none" = não desenha nada, a arte já mostra o rio/casa/ruína/árvore) mapeada tile a tile
// olhando a imagem com uma grade sobreposta. É uma primeira aproximação: ajustar depois
// conforme feedback de playtest.
const valeScene = new BiomeScene("ValeDoEcoVerde", {
  worldWidth: 2816, // 44 tiles
  worldHeight: 1536, // 24 tiles
  backgroundImage: "vale_bg",
  exits: { right: "PraiaEcoBrisa" },
  obstacleTiles: [
    // rio (bloqueado), com folgas exatamente nas pontes (nenhuma tile de ponte entra aqui)
    [26, 0, "none"], [27, 0, "none"],
    [26, 1, "none"], [27, 1, "none"],
    [25, 2, "none"], [26, 2, "none"],
    [25, 3, "none"], [26, 3, "none"],
    // ponte de pedra (linha 4-5, colunas 24-27) — sem colisão
    [25, 6, "none"], [26, 6, "none"],
    [24, 7, "none"], [25, 7, "none"],
    [23, 8, "none"], [24, 8, "none"],
    [22, 9, "none"], [23, 9, "none"],
    [21, 10, "none"], [22, 10, "none"],
    [20, 11, "none"], [21, 11, "none"],
    // ponte de pedra (linha 12, colunas 19-22) — sem colisão
    [19, 13, "none"], [20, 13, "none"],
    [18, 14, "none"], [19, 14, "none"],
    [17, 15, "none"], [18, 15, "none"],
    [16, 16, "none"], [17, 16, "none"], [18, 16, "none"], [19, 16, "none"], [20, 16, "none"],
    [21, 16, "none"], [22, 16, "none"], [23, 16, "none"], [24, 16, "none"],
    [16, 17, "none"], [17, 17, "none"], [24, 17, "none"], [25, 17, "none"],
    [14, 18, "none"], [15, 18, "none"], [24, 18, "none"], [25, 18, "none"],
    // ponte de madeira (linha 19-20, colunas 12-13) e ponte de pedra (linha 19-20, colunas 24-26) — sem colisão
    [11, 20, "none"],
    [10, 21, "none"],
    [9, 22, "none"],
    [8, 23, "none"],

    // casas
    [25, 9, "none"], [26, 9, "none"], [27, 9, "none"], [25, 10, "none"], [26, 10, "none"], [27, 10, "none"],
    [28, 10, "none"], [29, 10, "none"], [30, 10, "none"], [28, 11, "none"], [29, 11, "none"], [30, 11, "none"],
    [24, 13, "none"], [25, 13, "none"], [26, 13, "none"], [24, 14, "none"], [25, 14, "none"], [26, 14, "none"],
    [27, 16, "none"], [28, 16, "none"], [29, 16, "none"], [30, 16, "none"],
    [27, 17, "none"], [28, 17, "none"], [29, 17, "none"], [30, 17, "none"],

    // ruínas
    [9, 2, "none"], [10, 2, "none"], [11, 2, "none"], [9, 3, "none"], [10, 3, "none"], [11, 3, "none"],
    [19, 1, "none"], [20, 1, "none"], [19, 2, "none"], [20, 2, "none"],
    [3, 9, "none"], [4, 9, "none"], [5, 9, "none"], [3, 10, "none"], [4, 10, "none"], [5, 10, "none"],
    [6, 12, "none"], [7, 12, "none"], [8, 12, "none"], [9, 12, "none"], [10, 12, "none"], [6, 13, "none"], [7, 13, "none"], [8, 13, "none"],
    [40, 13, "none"], [41, 13, "none"],
    [27, 20, "none"], [28, 20, "none"], [29, 20, "none"], [27, 21, "none"], [28, 21, "none"], [29, 21, "none"],
    [31, 21, "none"], [32, 21, "none"],

    // árvores grandes (só o tronco bloqueia, a copa desenhada na arte pode se sobrepor a tiles livres)
    [1, 5, "none"], [1, 6, "none"],
    [4, 5, "none"], [4, 6, "none"],
    [7, 7, "none"], [8, 7, "none"],
    [13, 7, "none"], [14, 7, "none"], [13, 8, "none"], [14, 8, "none"],
    [15, 3, "none"], [16, 3, "none"],
    [0, 12, "none"], [1, 12, "none"],
    [1, 19, "none"], [2, 19, "none"], [1, 20, "none"], [2, 20, "none"],
    [36, 18, "none"], [37, 18, "none"], [36, 19, "none"], [37, 19, "none"],

    // ravina (borda oeste, intransponível)
    ...rectTiles(0, 4, 1, 11, "none"),
    // floresta densa (borda leste, intransponível) — para 2 tiles antes da borda do mapa
    // pra não travar o spawn de quem entra vindo da Praia (exits.right)
    ...rectTiles(29, 0, 41, 8, "none")
  ]
});

// Praia Eco Brisa: mesmo esquema do Vale — fundo pré-pintado (praia-eco-brisa.png, 2816x1536 =
// exatamente 44x24 tiles), obstáculos só de colisão ("none", a arte já desenha água/árvore/
// cabana/torre). Tiles mapeados com grade de 64px sobreposta na imagem pra achar as coordenadas
// exatas de água/objetos — ainda pode precisar de ajuste fino depois de um playtest.
const praiaScene = new BiomeScene("PraiaEcoBrisa", {
  worldWidth: 2816, // 44 tiles
  worldHeight: 1536, // 24 tiles
  backgroundImage: "praia_bg",
  exits: { left: "ValeDoEcoVerde" },
  // entrada fixa na calçada de pedra que atravessa o lago, em vez de herdar o y de onde
  // o jogador saiu do Vale (que caía perto das cabanas, mais ao sul)
  spawnOverride: { left: { x: 4 * TILE_SIZE, y: 9 * TILE_SIZE, facing: "right" } },
  obstacleTiles: [
    // lago com calçada de pedra atravessando (canto superior esquerdo) — só os tiles de
    // água bloqueiam, as pedras do caminho entre eles são atravessáveis
    [7, 5, "none"],
    [6, 6, "none"], [7, 6, "none"],
    [5, 7, "none"], [6, 7, "none"],
    [3, 8, "none"], [4, 8, "none"],
    [7, 9, "none"], [8, 9, "none"],
    [1, 10, "none"], [6, 10, "none"], [7, 10, "none"], [8, 10, "none"],
    [0, 11, "none"], [1, 11, "none"], [3, 11, "none"], [6, 11, "none"], [7, 11, "none"], [8, 11, "none"],

    // lagoa circular central
    ...rectTiles(9, 8, 14, 11, "none"),

    // cabana de madeira e árvores ao lado dela (canto esquerdo)
    ...rectTiles(2, 13, 3, 15, "none"),
    [0, 13, "none"], [1, 13, "none"], [0, 14, "none"], [1, 14, "none"],
    [0, 17, "none"], [0, 18, "none"],

    // torre de vigia (praia central)
    [30, 13, "none"], [30, 14, "none"],

    // pedras soltas na areia
    [24, 13, "none"], [25, 13, "none"], [32, 13, "none"], [33, 13, "none"],
    [35, 17, "none"], [20, 17, "none"], [17, 12, "none"], [18, 12, "none"],

    // oceano: baía esquerda, faixa principal, subida pelo canto direito e faixa final da base
    ...rectTiles(21, 17, 28, 17, "none"),
    ...rectTiles(21, 18, 33, 21, "none"),
    ...rectTiles(39, 10, 43, 21, "none"),
    ...rectTiles(0, 22, 43, 23, "none"),

    // coqueiros (só o tronco bloqueia)
    [19, 6, "none"], [23, 7, "none"], [28, 6, "none"], [30, 4, "none"],
    [33, 7, "none"], [35, 7, "none"], [34, 8, "none"], [36, 5, "none"],
    [39, 5, "none"], [39, 6, "none"], [40, 4, "none"], [43, 8, "none"],
    [9, 12, "none"], [10, 12, "none"], [11, 12, "none"], [12, 12, "none"], [13, 12, "none"], [14, 12, "none"]
  ]
});

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  scale: {
    mode: Phaser.Scale.FIT, // redimensiona o canvas mantendo a proporção 800x600, sem esticar
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [PreloadScene, valeScene, praiaScene]
};

window.game = new Phaser.Game(config);
