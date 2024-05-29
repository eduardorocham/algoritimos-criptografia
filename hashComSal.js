import { scryptSync, randomBytes, timingSafeEqual } from 'crypto'

function criaHashComSal(senha) {
    // O sal é uma string aleatória de 16 bytes convertida para hexadecimal.
    const sal = randomBytes(16).toString('hex');
    // Utilizando o sal, gera uma string hexadecimal de 64 bytes
    const senhaHasheada = scryptSync(senha, sal, 64).toString('hex');

    return `${sal}:${senhaHasheada}`
}

class Usuario {
    constructor(nome, senha) {
        this.nome = nome;
        [this.sal, this.hash] = criaHashComSal(senha).split(":");
    }

    autentica(nome, senha) {
        if (nome === this.nome) {
            const testeHash = scryptSync(senha, this.sal, 64);
            const hashReal = Buffer.from(this.hash, 'hex');

            //Função timingSafeEqual: Esta função é utilizada para comparar dois buffers de maneira que o tempo de execução não varie com base nos dados dos buffers.

            // Por que é importante: Comparações normais(===) podem ser vulneráveis a ataques de timing, onde um atacante mede o tempo necessário para a operação e infere informação sobre os dados comparados.timingSafeEqual previne este tipo de ataque.
            const hashesCorrespondem = timingSafeEqual(testeHash, hashReal);

            if (hashesCorrespondem) {
                console.log("Usuário autenticado com sucesso!")
                return true
            }

            console.log("Usuário ou senha incorretos")
            return false
        }
    }
}

const usuario = new Usuario('Joao Manoel', 'senhaSecreta')

console.log(usuario)

// Teste de sucesso
usuario.autentica('Joao Manoel', 'senhaSecreta')
// Teste de erro
usuario.autentica('Joao Manoel', 'senhasecreta')