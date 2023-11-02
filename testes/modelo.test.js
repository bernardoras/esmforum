const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
});

test('Testando cadastro de respostas', () => {

  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');

  modelo.cadastrar_resposta(1, "2");

  modelo.cadastrar_resposta(2, "4");
  modelo.cadastrar_resposta(2, "2! + 2!");
  
  modelo.cadastrar_resposta(3, "6");
  modelo.cadastrar_resposta(3, "0x6");
  modelo.cadastrar_resposta(3, "0b110");

  expect(modelo.get_num_respostas(1)).toBe(1);
  expect(modelo.get_num_respostas(2)).toBe(2);
  expect(modelo.get_num_respostas(3)).toBe(3);

  expect(modelo.get_respostas(1)[0].texto).toBe("2");
  
  expect(modelo.get_respostas(2)[0].texto).toBe("4");
  expect(modelo.get_respostas(2)[1].texto).toBe("2! + 2!");

  expect(modelo.get_respostas(3)[0].texto).toBe("6");
  expect(modelo.get_respostas(3)[1].texto).toBe("0x6");
  expect(modelo.get_respostas(3)[2].texto).toBe("0b110");  
});

test('Testando consulta de perguntas', () => {

  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');

  expect(modelo.get_pergunta(1)[0].texto).toBe("1 + 1 = ?");
  expect(modelo.get_pergunta(2)[0].texto).toBe("2 + 2 = ?");
  expect(modelo.get_pergunta(3)[0].texto).toBe("3 + 3 = ?");

});