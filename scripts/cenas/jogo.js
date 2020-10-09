class Jogo {
  constructor() {
    this.indice = 0;
    
    this.mapa = fita.mapa;
    
  }
  
  setup() {
    cenario = new Cenario(imagemCenario, 3);
    
    vida = new Vida(fita.config.vidaMaxima, fita.config.vidaInicial);
  
    pontuacao = new Pontuacao();
  
    personagem = new Personagem(matrizPersonagem,               imagemPersonagem, 0, 20, 110, 135, 220, 270);
  
    const inimigo = new Inimigo(matrizInimigo,                   imagemInimigo, width - 52, 16, 52, 52, 104, 104, 10);
  
    const inimigoVoador = new Inimigo(matrizInimigoVoador,       imagemInimigoVoador, width - 52, 200, 100, 75, 200,       150, 10);
  
    const inimigoGrande = new Inimigo(matrizInimigoGrande,       imagemInimigoGrande, width, 0, 200, 200, 400, 400,         10);
  
    inimigos.push(inimigo);
    inimigos.push(inimigoVoador);
    inimigos.push(inimigoGrande);
    
    }
  
  keyPressed(key) {
     if(key === 'ArrowUp') {
      personagem.pula();
      somDoPulo.play();
     }
  }
  
  draw() {
    cenario.exibe();
    cenario.move();
    
    vida.draw();

    pontuacao.exibe();
    pontuacao.adicionarPonto();

    personagem.exibe();    
    personagem.aplicaGravidade();
    
    const linhaAtual = this.mapa[this.indice];

    const inimigo = inimigos[linhaAtual.inimigo];
    const inimigoVisivel = inimigo.x < - inimigo.largura; 
    
    inimigo.velocidade = linhaAtual.velocidade;

    inimigo.exibe();
    inimigo.move();

    if(inimigoVisivel) {
      this.indice++;
      inimigo.reaparece();

      if(this.indice > this.mapa.length - 1) {
        this.indice = 0;
      }
    }

    if(personagem.estaColidindo(inimigo)) {
        vida.perdeVida();
        personagem.ficaInvencivel();
      
        if(vida.vidas === 0) {
          image(imagemFimDeJogo, width/2 - 200, height/2);
          noLoop();
        }
    }
  }
}