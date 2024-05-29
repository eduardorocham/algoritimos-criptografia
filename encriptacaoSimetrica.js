import { createCipheriv, randomBytes, createDecipheriv } from 'crypto'

const mensagem = 'Mensagem de demonstração';
const chave = randomBytes(32);

// string de vetor de inicialização
const vi = randomBytes(16);

// createCipheriv: Cria um objeto de cifra utilizando AES-256 com a chave e o vetor de inicialização fornecidos.
const cifra = createCipheriv('aes256', chave, vi);

// Cifra a mensagem em partes. Converte de 'utf-8' (formato da mensagem) para 'hex' (formato cifrado).
const mensagemCifrada = cifra.update(mensagem, 'utf-8', 'hex') + cifra.final('hex');

console.log(mensagemCifrada);

// Transmissão
const decifra = createDecipheriv('aes256', chave, vi);

// Descriptografa a mensagem cifrada em partes. Converte de 'hex' (formato cifrado) para 'utf-8' (formato original).
const mensagemDecifrada = decifra.update(mensagemCifrada, 'hex', 'utf-8') + decifra.final('utf-8');

console.log(`Decifrado: ${mensagemDecifrada.toString('utf-8')}`);

// Por Que final é Necessário

// Processamento de Dados Restantes: Quando você chama update, ele processa os dados em blocos completos. Se houver dados restantes que não completam um bloco, eles ficam aguardando até que mais dados sejam fornecidos ou até que final seja chamado.

// Padding: Se o último bloco de dados não for do tamanho completo (por exemplo, menos de 16 bytes para AES), o método final aplica o padding necessário para completar o bloco. Isso é essencial para garantir que o bloco tenha o tamanho correto para a cifra de bloco.

// Integridade dos Dados: Chamar final garante que todos os dados foram processados corretamente e que a cifragem é concluída com todos os dados incluídos.